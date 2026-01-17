import express from "express";
import {
  createDress,
  addRental,
  getAllDresses,
  removeRental
} from "../controller/dress.controller.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router();

router.post("/upload-dress", upload.array("images",6), createDress);
router.get("/", getAllDresses);
router.post("/rentals", addRental);
router.delete("/:dressId/rental", removeRental);

export default router;
