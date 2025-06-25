import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import dotenv from "dotenv";
import { userRouter } from "./routes/user.js";
import { courseRouter } from "./routes/course.js";
import adminRouter from "./routes/admin.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);


const MONGODB_URL = process.env.MONGODB_URL; 
async function main(){
 try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

main()

