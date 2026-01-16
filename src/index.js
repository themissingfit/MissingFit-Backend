import app from "../src/app.js";
import { connectDb } from "../src/db/connectDb.js";

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDb();
    isConnected = true;
  }
  return app(req, res);
}
