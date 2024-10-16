import mongoose from "mongoose";

// Global object to store the connection (to avoid multiple connections)
let isConnected: number | null = null;
const MONGODB_URI =
  "mongodb+srv://Alpha:qZzynjSB3oJUhkL6@blogwebpage.whtpk.mongodb.net/ecommerce";

const dbConnect = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  if (!MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to the environment variables");
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState; // 1 means connected
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnect;
