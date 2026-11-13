import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    cb(null, `${Date.now()}-${safe}`);
  },
});

const maxBytes = 10 * 1024 * 1024;

export const uploadInquiryFiles = multer({
  storage,
  limits: { fileSize: maxBytes, files: 3 },
  fileFilter: (_req, file, cb) => {
    const allowed =
      /\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg|dwg)$/i.test(file.originalname) ||
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/pdf';
    cb(null, allowed);
  },
}).array('attachments', 3);

export const uploadCv = multer({
  storage,
  limits: { fileSize: maxBytes, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype === 'application/pdf' ||
      file.originalname.toLowerCase().endsWith('.pdf') ||
      file.originalname.toLowerCase().endsWith('.doc') ||
      file.originalname.toLowerCase().endsWith('.docx');
    cb(null, ok);
  },
}).single('cv');
