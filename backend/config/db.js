import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27018/coffee-haven');
    console.log(`Successfully connected to MongoDB (${conn.connection.name})`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
