import mongoose from "mongoose";
import env from './env.js'

export const connectDb = async () => {
try {
  const conn = await mongoose.connect(env.MONGODB_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`)
} catch (error) {
  console.error("Database connection error:", error)
  throw error;
}
}

export default connectDb;