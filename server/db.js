import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbUrl = process.env.MONGO_URI;

const connectRoDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.log(`Error Connecting to MongoDB: ${error}`);
  }
};

export default connectRoDatabase;
