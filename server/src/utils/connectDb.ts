import mongoose from "mongoose";
require("dotenv").config();

export async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    try {
      const uri = process.env.DB_URI as string;
      await mongoose.connect(uri);
      console.log("connected to db");
    } catch (err) {
      throw err;
    }
  }
}
