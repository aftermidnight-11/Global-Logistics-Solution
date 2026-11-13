import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import type { InquiryType } from '../config/inquiryTypes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routingPath = path.resolve(__dirname, '../config/routing.json');
const routing = JSON.parse(fs.readFileSync(routingPath, 'utf-8')) as Record<
  InquiryType,
  string
>;

function getTransporter() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });
}

export function resolveInquiryInbox(type: InquiryType): string {
  return routing[type] || process.env.INQUIRY_EMAIL_DEFAULT || 'info@global-logisticssolution.com';
}

export async function sendInquiryEmail(payload: {
  to: string;
  name: string;
  phone: string;
  companyName?: string;
  inquiryType: string;
  message?: string;
  sourcePage?: string;
}): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('[email] SMTP not configured; inquiry stored only');
    return false;
  }
  const from = process.env.SMTP_FROM || 'noreply@global-logisticssolution.com';
  const text = [
    `New inquiry: ${payload.inquiryType}`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.companyName ? `Company: ${payload.companyName}` : '',
    payload.message ? `Message: ${payload.message}` : '',
    payload.sourcePage ? `Source: ${payload.sourcePage}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  await transporter.sendMail({
    from,
    to: payload.to,
    subject: `[Global Logistics] ${payload.inquiryType} — ${payload.name}`,
    text,
  });
  return true;
}

export async function sendCareerEmail(payload: {
  to: string;
  name: string;
  email: string;
  phone: string;
  roleTitle: string;
  coverLetter?: string;
  cvUrl?: string;
}): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;
  const from = process.env.SMTP_FROM || 'noreply@global-logisticssolution.com';
  const text = [
    `Career application: ${payload.roleTitle}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    payload.coverLetter ? `Cover letter:\n${payload.coverLetter}` : '',
    payload.cvUrl ? `CV: ${payload.cvUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  await transporter.sendMail({
    from,
    to: payload.to,
    subject: `[Global Logistics] Career — ${payload.roleTitle} — ${payload.name}`,
    text,
  });
  return true;
}
