import { Router } from 'express';
import validator from 'validator';
import { CareerApplication } from '../models/CareerApplication.js';
import { careerRateLimit } from '../middleware/rateLimit.js';
import { uploadCv } from '../middleware/upload.js';
import { sendCareerEmail } from '../services/emailRouter.js';
import { hashIp } from '../utils/ipHash.js';

const router = Router();

router.post('/apply', careerRateLimit, (req, res, next) => {
  uploadCv(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }
    void handleApply(req, res).catch(next);
  });
});

async function handleApply(
  req: import('express').Request,
  res: import('express').Response
) {
  const body = req.body as Record<string, string>;
  if (body.website && body.website.trim()) {
    res.json({ success: true, message: 'Application received.' });
    return;
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const roleId = (body.roleId || '').trim();
  const roleTitle = (body.roleTitle || roleId).trim();
  const coverLetter = (body.coverLetter || '').trim();

  if (!name || !email || !phone || !roleId) {
    res.status(400).json({ success: false, message: 'Name, email, phone and role are required.' });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ success: false, message: 'Invalid email address.' });
    return;
  }

  const file = req.file as Express.Multer.File | undefined;
  const cvFile = file
    ? {
        filename: file.originalname,
        url: `/uploads/${file.filename}`,
        size: file.size,
        mime: file.mimetype,
      }
    : undefined;

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress;

  const app = await CareerApplication.create({
    name: validator.escape(name),
    email: validator.escape(email),
    phone: validator.escape(phone),
    roleId,
    roleTitle: validator.escape(roleTitle),
    coverLetter: coverLetter ? validator.escape(coverLetter) : undefined,
    cvFile,
    userAgent: req.headers['user-agent']?.slice(0, 500),
    ipHash: hashIp(ip),
  });

  const careersInbox = process.env.INQUIRY_EMAIL_DEFAULT || 'careers@harborline.example';
  let emailed = false;
  try {
    emailed = await sendCareerEmail({
      to: careersInbox,
      name,
      email,
      phone,
      roleTitle,
      coverLetter,
      cvUrl: cvFile?.url,
    });
  } catch (e) {
    console.error('Career email failed:', e);
  }

  app.status = emailed ? 'emailed' : 'failed_email';
  if (emailed) app.emailSentAt = new Date();
  await app.save();

  res.status(201).json({
    success: true,
    message: 'Thank you for applying. Our HR team will review your application.',
  });
}

export default router;
