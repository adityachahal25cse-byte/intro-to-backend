import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using Mongoose
 */
export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI || mongoURI.includes('<username>') || mongoURI.includes('admin:admin123@cluster0')) {
      console.warn('\n⚠️  WARNING: MongoDB URI is using a placeholder or default string in .env.');
      console.warn('👉 Please update MONGO_URI in .env with your actual MongoDB Atlas connection string.\n');
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Verify your MongoDB Atlas connection string, database user credentials, and network IP whitelist (0.0.0.0/0).');
    // Exit process with failure
    // process.exit(1);
  }
};
