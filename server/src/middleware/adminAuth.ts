import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  admin?: boolean;
}

export function adminAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }
  const token = header.slice(7);
  const secret = process.env.ADMIN_JWT_SECRET || 'dev-secret';
  try {
    jwt.verify(token, secret);
    req.admin = true;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}
