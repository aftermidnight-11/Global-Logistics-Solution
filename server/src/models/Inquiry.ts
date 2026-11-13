import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { INQUIRY_TYPES } from '../config/inquiryTypes.js';

const attachmentSchema = new Schema(
  {
    filename: String,
    url: String,
    size: Number,
    mime: String,
    data: String,
  },
  { _id: false }
);

const inquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    companyName: { type: String, trim: true, maxlength: 160 },
    inquiryType: { type: String, required: true, enum: INQUIRY_TYPES },
    message: { type: String, trim: true, maxlength: 2000 },
    sourcePage: { type: String, trim: true, maxlength: 500 },
    userAgent: { type: String, maxlength: 500 },
    ipHash: { type: String, maxlength: 64 },
    status: {
      type: String,
      enum: ['new', 'emailed', 'failed_email'],
      default: 'new',
    },
    emailSentAt: Date,
    attachments: [attachmentSchema],
  },
  { timestamps: true }
);

export type InquiryDocument = InferSchemaType<typeof inquirySchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
