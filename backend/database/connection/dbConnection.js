import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const mongoUrl = process.env.mongoUrl || process.env.MONGO_URL || process.env.MONGODB_URI;
  if (!mongoUrl) {
    console.error("MongoDB connection error: mongoUrl / MONGO_URL / MONGODB_URI environment variable is not defined.");
    return;
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
  }
};

export default connectDb;
