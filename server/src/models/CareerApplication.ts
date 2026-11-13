import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const careerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    roleId: { type: String, required: true, trim: true },
    roleTitle: { type: String, trim: true },
    coverLetter: { type: String, trim: true, maxlength: 5000 },
    cvFile: {
      filename: String,
      url: String,
      size: Number,
      mime: String,
    },
    userAgent: { type: String, maxlength: 500 },
    ipHash: { type: String, maxlength: 64 },
    status: {
      type: String,
      enum: ['new', 'emailed', 'failed_email'],
      default: 'new',
    },
    emailSentAt: Date,
  },
  { timestamps: true }
);

export type CareerApplicationDocument = InferSchemaType<typeof careerSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const CareerApplication = mongoose.model('CareerApplication', careerSchema);
