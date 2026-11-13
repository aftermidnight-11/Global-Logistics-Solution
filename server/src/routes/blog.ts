import { Router } from 'express';
import { BlogPost } from '../models/BlogPost.js';
import fallbackPosts from '../data/blogPosts.json' with { type: 'json' };

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const posts = await BlogPost.find()
      .select('slug title excerpt publishedAt author')
      .sort({ createdAt: -1 })
      .lean();
    if (posts && posts.length > 0) {
      res.json(posts);
      return;
    }
  } catch (err) {
    console.warn('Could not fetch blog posts from DB, using fallback data:', (err as Error).message);
  }
  // Return fallback posts if DB is empty or connecting
  res.json(
    fallbackPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      publishedAt: p.publishedAt,
      author: p.author,
    }))
  );
});

router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).lean();
    if (post) {
      res.json({
        ...post,
        body: post.content || (post as any).body,
      });
      return;
    }
  } catch (err) {
    console.warn('Could not fetch blog post from DB:', (err as Error).message);
  }

  // Check fallback posts
  const fallback = fallbackPosts.find((p) => p.slug === req.params.slug);
  if (fallback) {
    res.json({
      ...fallback,
      content: fallback.body,
    });
    return;
  }

  res.status(404).json({ success: false, message: 'Post not found' });
});

export default router;
