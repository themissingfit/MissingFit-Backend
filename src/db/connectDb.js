import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});


export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI, {
        });
        console.log("Connected to db");
    } catch (error) {
        console.log("Error connecting to db", error);
    }
}