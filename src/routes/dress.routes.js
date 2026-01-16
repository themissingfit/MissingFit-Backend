import express from "express";
import upload from "../middlewares/upload.js"
import { createDress, getAllDresses, addRental } from "../controller/dress.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/upload-dress", upload.array("images",6), createDress);
router.get("/", getAllDresses);
router.post("/rentals", addRental);
export default router;
