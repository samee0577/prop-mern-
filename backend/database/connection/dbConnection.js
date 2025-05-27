// filepath: c:\Users\Shahid\Desktop\prop(mern)\backend\database\connection\dbConnection.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" }); // Correct relative path to the .env file

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to DB:", error.message);
  }
};

export default connectDb;