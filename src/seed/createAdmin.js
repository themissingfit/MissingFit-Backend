import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_DB_URI);

await User.create({
  username: "shatakshi",
  password: "shatakshi@1709", // auto-hashed
  fullName: "Shatakshi Tiwari",
});

console.log("Admin created");
process.exit();
