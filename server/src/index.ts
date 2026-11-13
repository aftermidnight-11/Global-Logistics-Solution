import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDb } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import healthRouter from './routes/health.js';
import inquiriesRouter from './routes/inquiries.js';
import careersRouter from './routes/careers.js';
import officesRouter from './routes/offices.js';
import adminRouter from './routes/admin.js';
import blogRouter from './routes/blog.js';
import authRouter from './routes/auth.js';
import { getSitemapXml } from './services/sitemap.js';
import { syncAdminUser } from './services/adminSync.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const allowedOrigins = clientOrigin.split(',').map((o) => o.trim());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use('/api/health', healthRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/careers', careersRouter);
app.use('/api/offices', officesRouter);
app.use('/admin/api', adminRouter);
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/auth', authRouter);

app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Sitemap: ${clientOrigin.replace(/\/$/, '')}/sitemap.xml
`);
});

app.get('/sitemap.xml', (_req, res) => {
  const base = clientOrigin.replace(/\/$/, '');
  res.type('application/xml').send(getSitemapXml(base));
});

app.use(errorHandler);

async function start() {
  const isConnected = await connectDb();
  if (isConnected) {
    await syncAdminUser();
  }

  // Auto-sync admin user whenever database connects or reconnects
  import('mongoose').then(({ default: mongoose }) => {
    mongoose.connection.on('connected', () => {
      syncAdminUser().catch((err) => {
        console.error('Error syncing admin user:', err);
      });
    });
  });

  app.listen(PORT, () => {
    console.log(`Harborline API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
});
