// src/models/rental.model.js
import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    dress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dress",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Rental = mongoose.model("Rental", rentalSchema);
