const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

const getDatabase = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not initialized");
  }
  return mongoose.connection.db;
};

module.exports = { connectDB, getDatabase };