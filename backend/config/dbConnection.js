import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
