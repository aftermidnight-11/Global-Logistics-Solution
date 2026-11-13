import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const blogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    publishedAt: { type: String, required: true },
    author: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export type BlogPostDocument = InferSchemaType<typeof blogPostSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
