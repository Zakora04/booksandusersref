import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async (): Promise<void> => {
  const MONGODB_URL = process.env.MONGODB_URL;

  if (!MONGODB_URL) {
    console.error("Missing url in env.");
    throw new Error();
  }
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected");
  } catch (err: unknown) {
    console.error("error message", err);
    throw err;
  }
};
