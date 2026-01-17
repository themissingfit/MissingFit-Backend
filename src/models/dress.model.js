// src/models/dress.model.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const dressSchema = new mongoose.Schema(
  {
    images: {
      type: [imageSchema],
      validate: [arr => arr.length > 0, "At least one image is required"],
    },

    dressTitle: { type: String, required: true },

    category: {
      type: String,
      enum: ["Gown", "Lehenga", "Saree", "Suit","Sharara","Indo Western"],
      required: true,
    },

    withJewelryPrice: { type: Number, required: true },
    withoutJewelryPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Available", "Rented"],
      default: "Available",
    },
    currentRental: {
    startDate: Date,
    endDate: Date,
    customerName: String,
  },
  },
  { timestamps: true }
);

export const Dress = mongoose.model("Dress", dressSchema);
