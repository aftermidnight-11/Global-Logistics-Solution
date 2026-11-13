import { Router } from 'express';
import fs from 'node:fs';
import validator from 'validator';
import { INQUIRY_TYPES, type InquiryType } from '../config/inquiryTypes.js';
import { Inquiry } from '../models/Inquiry.js';
import { inquiryRateLimit } from '../middleware/rateLimit.js';
import { uploadInquiryFiles } from '../middleware/upload.js';
import { resolveInquiryInbox, sendInquiryEmail } from '../services/emailRouter.js';
import { hashIp } from '../utils/ipHash.js';

const router = Router();

router.post('/', inquiryRateLimit, (req, res, next) => {
  uploadInquiryFiles(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }
    void handleInquiry(req, res).catch(next);
  });
});

async function handleInquiry(
  req: import('express').Request,
  res: import('express').Response
) {
  const body = req.body as Record<string, string>;
  if (body.website && body.website.trim()) {
    res.json({ success: true, message: 'Thank you. We will contact you within one business day.' });
    return;
  }

  const name = (body.name || '').trim();
  const phone = (body.phone || '').trim();
  const companyName = (body.companyName || '').trim();
  const inquiryType = (body.inquiryType || '').trim() as InquiryType;
  const message = (body.message || '').trim();
  const sourcePage = (body.sourcePage || '').trim();

  if (!name) {
    res.status(400).json({ success: false, message: 'Name is required.' });
    return;
  }
  if (!phone) {
    res.status(400).json({ success: false, message: 'Phone (WhatsApp) is required.' });
    return;
  }
  if (!INQUIRY_TYPES.includes(inquiryType)) {
    res.status(400).json({ success: false, message: 'Please select a valid inquiry type.' });
    return;
  }

  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const attachments = files.map((f) => {
    let base64Data: string | undefined;
    try {
      if (f.path && fs.existsSync(f.path)) {
        base64Data = fs.readFileSync(f.path).toString('base64');
      } else if (f.buffer) {
        base64Data = f.buffer.toString('base64');
      }
    } catch {
      // ignore
    }
    return {
      filename: f.originalname,
      url: `/uploads/${f.filename}`,
      size: f.size,
      mime: f.mimetype,
      data: base64Data,
    };
  });

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress;

  const inquiry = await Inquiry.create({
    name: validator.escape(name),
    phone: validator.escape(phone),
    companyName: companyName ? validator.escape(companyName) : undefined,
    inquiryType,
    message: message ? validator.escape(message) : undefined,
    sourcePage: sourcePage ? validator.escape(sourcePage) : undefined,
    userAgent: req.headers['user-agent']?.slice(0, 500),
    ipHash: hashIp(ip),
    attachments,
    status: 'new',
  });

  const inbox = resolveInquiryInbox(inquiryType);
  let emailed = false;
  try {
    emailed = await sendInquiryEmail({
      to: inbox,
      name,
      phone,
      companyName,
      inquiryType,
      message,
      sourcePage,
    });
  } catch (e) {
    console.error('Inquiry email failed:', e);
  }

  inquiry.status = emailed ? 'emailed' : 'failed_email';
  if (emailed) inquiry.emailSentAt = new Date();
  await inquiry.save();

  res.status(201).json({
    success: true,
    message: 'Thank you. We will contact you within one business day.',
    id: inquiry._id,
  });
}

export default router;
