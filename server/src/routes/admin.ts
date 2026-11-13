import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Inquiry } from '../models/Inquiry.js';
import { CareerApplication } from '../models/CareerApplication.js';
import { BlogPost } from '../models/BlogPost.js';
import { User } from '../models/User.js';
import { adminAuth, type AuthRequest } from '../middleware/adminAuth.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };
  const inputUser = (username || '').trim();
  const inputPass = (password || '').trim();
  const expectedUser = (process.env.ADMIN_USERNAME || 'admin').trim();
  const expectedPass = (process.env.ADMIN_PASSWORD || 'change-me').trim();
  const secret = (process.env.ADMIN_JWT_SECRET || 'dev-secret').trim();

  if (
    (inputUser.toLowerCase() === expectedUser.toLowerCase() || inputUser.toLowerCase() === 'admin') &&
    inputPass === expectedPass
  ) {
    const adminEmail = expectedUser.includes('@')
      ? expectedUser.toLowerCase()
      : `${expectedUser.toLowerCase()}@global-logisticssolution.com`;

    const token = jwt.sign({ role: 'admin', email: adminEmail, name: 'Administrator' }, secret, {
      expiresIn: '8h',
    });
    res.json({ success: true, token });
    return;
  }

  if (inputUser && inputPass) {
    const dbUser = await User.findOne(
      inputUser.toLowerCase() === 'admin'
        ? { role: 'admin' }
        : { email: inputUser.toLowerCase() }
    );
    if (dbUser && dbUser.role === 'admin') {
      const match = await bcrypt.compare(inputPass, dbUser.password);
      if (match) {
        const token = jwt.sign(
          { id: dbUser._id, role: 'admin', email: dbUser.email, name: dbUser.name },
          secret,
          { expiresIn: '8h' }
        );
        res.json({ success: true, token });
        return;
      }
    }
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Inquiries
router.get('/inquiries', adminAuth, async (_req: AuthRequest, res, next) => {
  try {
    const items = await Inquiry.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.patch('/inquiries/:id', adminAuth, async (req: AuthRequest, res, next) => {
  try {
    const { status } = req.body as { status?: string };
    const item = await Inquiry.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
    if (!item) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }
    res.json({ success: true, item });
  } catch (err) {
    next(err);
  }
});

router.delete('/inquiries/:id', adminAuth, async (req: AuthRequest, res, next) => {
  try {
    const item = await Inquiry.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    next(err);
  }
});

// Careers
router.get('/careers', adminAuth, async (_req: AuthRequest, res, next) => {
  try {
    const items = await CareerApplication.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.patch('/careers/:id', adminAuth, async (req: AuthRequest, res, next) => {
  try {
    const { status } = req.body as { status?: string };
    const item = await CareerApplication.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
    if (!item) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return;
    }
    res.json({ success: true, item });
  } catch (err) {
    next(err);
  }
});

router.delete('/careers/:id', adminAuth, async (req: AuthRequest, res, next) => {
  try {
    const item = await CareerApplication.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return;
    }
    res.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    next(err);
  }
});

// Blog CRUD
router.get('/blog', adminAuth, async (_req: AuthRequest, res, next) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/blog', adminAuth, async (req: AuthRequest, res, next) => {
  try {
    let { title, slug, excerpt, content, publishedAt, author } = req.body as {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      publishedAt?: string;
      author?: string;
    };

    if (!title || !content) {
      res.status(400).json({ success: false, message: 'Title and content are required' });
      return;
    }

    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      res.status(400).json({ success: false, message: 'A post with this slug already exists' });
      return;
    }

    if (!publishedAt) {
      publishedAt = new Date().toISOString().split('T')[0];
    }
    if (!author) {
      author = 'Editorial Team';
    }
    if (!excerpt) {
      excerpt = content.slice(0, 160).trim() + '...';
    }

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      author,
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
});

router.put('/blog/:id', adminAuth, async (req: AuthRequest, res, next) => {
  try {
    const { title, slug, excerpt, content, publishedAt, author } = req.body as {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      publishedAt?: string;
      author?: string;
    };

    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }

    if (slug && slug !== post.slug) {
      const conflict = await BlogPost.findOne({ slug, _id: { $ne: req.params.id } });
      if (conflict) {
        res.status(400).json({ success: false, message: 'Another post already has this slug' });
        return;
      }
      post.slug = slug;
    }

    if (title !== undefined) post.title = title;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (publishedAt !== undefined) post.publishedAt = publishedAt;
    if (author !== undefined) post.author = author;

    await post.save();
    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
});

router.delete('/blog/:id', adminAuth, async (req: AuthRequest, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }
    res.json({ success: true, message: 'Blog post deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
