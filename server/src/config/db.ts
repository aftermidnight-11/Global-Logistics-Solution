import mongoose from 'mongoose';

let isConnecting = false;

export async function connectDb(): Promise<boolean> {
  if (mongoose.connection.readyState === 1) return true;
  if (isConnecting) return false;

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/harborline';
  mongoose.set('strictQuery', true);

  isConnecting = true;
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('MongoDB connected');
    isConnecting = false;
    return true;
  } catch (err) {
    console.warn('MongoDB connection pending (retrying in 5s):', (err as Error).message);
    isConnecting = false;
    setTimeout(() => {
      void connectDb();
    }, 5000);
    return false;
  }
}
