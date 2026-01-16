import express from "express";
import {
  createDress,
  addRental,
  getAllDresses,
} from "../controllers/dress.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/upload-dress", upload.array("images",6), createDress);
router.get("/", getAllDresses);
router.post("/rentals", addRental);
export default router;
