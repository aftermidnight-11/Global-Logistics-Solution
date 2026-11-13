import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDb } from './config/db.js';
import { BlogPost } from './models/BlogPost.js';
import posts from './data/blogPosts.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function seed() {
  try {
    await connectDb();
    console.log('Connected to DB');

    // Clear existing posts
    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    const mappedPosts = posts.map((p) => ({
      ...p,
      content: (p as any).body,
    }));
    const result = await BlogPost.insertMany(mappedPosts);
    console.log(`Successfully seeded ${result.length} blog posts`);

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed blog posts:', error);
    process.exit(1);
  }
}

seed();
