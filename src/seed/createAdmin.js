import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_DB_URI);

await User.create({
  username: "sahil",
  password: "Admin@123", // auto-hashed
  fullName: "Sahil Kukreja",
  userType: "staff"
});

console.log("Admin created");
process.exit();
