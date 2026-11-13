import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { User } from '../models/User.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, companyName, phone, role } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      companyName?: string;
      phone?: string;
      role?: string;
    };

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Name, email, and password are required' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!validator.isEmail(cleanEmail)) {
      res.status(400).json({ success: false, message: 'Invalid email address' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
      return;
    }

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'An account with this email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedRole = role === 'admin' ? 'admin' : 'client';

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      companyName: companyName?.trim(),
      phone: phone?.trim(),
      role: assignedRole,
    });

    const secret = process.env.ADMIN_JWT_SECRET || 'dev-secret';
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      secret,
      { expiresIn: '8h' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, username, password } = req.body as {
      email?: string;
      username?: string;
      password?: string;
    };

    const identifier = (email || username || '').trim();
    if (!identifier || !password) {
      res.status(400).json({ success: false, message: 'Email/username and password are required' });
      return;
    }

    const secret = (process.env.ADMIN_JWT_SECRET || 'dev-secret').trim();
    const expectedAdminUser = (process.env.ADMIN_USERNAME || 'admin').trim();
    const expectedAdminPass = (process.env.ADMIN_PASSWORD || 'change-me').trim();

    // 1. Check if admin environment credentials match
    if (
      (identifier.toLowerCase() === expectedAdminUser.toLowerCase() ||
        identifier.toLowerCase() === 'admin' ||
        identifier.toLowerCase() === 'admin@global-logisticssolution.com') &&
      password.trim() === expectedAdminPass
    ) {
      const adminEmail = expectedAdminUser.includes('@')
        ? expectedAdminUser.toLowerCase()
        : `${expectedAdminUser.toLowerCase()}@global-logisticssolution.com`;

      const token = jwt.sign(
        {
          role: 'admin',
          email: adminEmail,
          name: 'Administrator',
        },
        secret,
        { expiresIn: '8h' }
      );
      res.json({
        success: true,
        token,
        user: {
          id: 'admin',
          name: 'Administrator',
          email: adminEmail,
          role: 'admin',
        },
      });
      return;
    }

    // 2. Check registered users in MongoDB
    const user = await User.findOne(
      identifier.toLowerCase() === 'admin'
        ? { role: 'admin' }
        : { email: identifier.toLowerCase() }
    );
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      secret,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/me', async (req, res) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }
  const token = header.slice(7);
  const secret = process.env.ADMIN_JWT_SECRET || 'dev-secret';
  try {
    const decoded = jwt.verify(token, secret) as {
      id?: string;
      role?: string;
      email?: string;
      name?: string;
    };

    if (decoded.id && decoded.id !== 'admin') {
      const dbUser = await User.findById(decoded.id).select('-password').lean();
      if (dbUser) {
        res.json({
          success: true,
          user: {
            id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            companyName: dbUser.companyName,
            phone: dbUser.phone,
          },
        });
        return;
      }
    }

    res.json({ success: true, user: decoded });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

router.post('/change-password', async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }
  const token = header.slice(7);
  const secret = process.env.ADMIN_JWT_SECRET || 'dev-secret';
  try {
    const decoded = jwt.verify(token, secret) as { id?: string; role?: string };
    if (!decoded.id) {
      res.status(403).json({ success: false, message: 'Admin accounts cannot change password via this endpoint.' });
      return;
    }
    const { currentPassword, newPassword } = req.body as {
      currentPassword?: string;
      newPassword?: string;
    };
    if (!currentPassword || !newPassword) {
      res.status(400).json({ success: false, message: 'Current and new passwords are required.' });
      return;
    }
    if (newPassword.length < 6) {
      res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
      return;
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Current password is incorrect.' });
      return;
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;

