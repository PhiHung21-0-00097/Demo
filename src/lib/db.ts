// Kết nối MongoDB
import mongoose from "mongoose";

const url = process.env.MONGODB_URI;
console.log("url ", url);
if (!url) {
  throw new Error("❌ Missing MONGODB_URI in environment variables");
}

/**
 * Global caching to prevent creating multiple connections in dev mode
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(url, {
        dbName: "demo_snippet",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
