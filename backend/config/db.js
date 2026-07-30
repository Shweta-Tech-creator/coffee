import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://sweta:sweta123@cluster.brhnlrp.mongodb.net/coffee-haven?retryWrites=true&w=majority';
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Successfully connected to MongoDB (${conn.connection.name})`);
  } catch (error) {
    console.warn('MongoDB connection notice (Server running in offline/local mode):', error.message || error);
  }
};
