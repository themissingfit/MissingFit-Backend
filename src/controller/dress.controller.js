import { Dress } from "../models/dress.model.js";
import { Rental } from "../models/rental.model.js";
import cloudinary from "../config/cloudinary.js";
export const createDress = async (req, res) => {
  try {

    const {
      dressTitle,
      category,
      withJewelryPrice,
      withoutJewelryPrice,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

    const uploadedImages = await uploadDressImages(req.files);

    const images = uploadedImages.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));


    const dress = await Dress.create({
      dressTitle,
      category,
      withJewelryPrice,
      withoutJewelryPrice,
      images,
    });

    return res.status(201).json({
      success: true,
      data: dress,
    });
  } catch (error) {
    console.error("CREATE DRESS ERROR:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};


export const uploadDressImages = async (files) => {
  const uploads = files.map((file) =>
    cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "dresses",
      }
    )
  );

  return Promise.all(uploads);
};


export const addRental = async (req, res) => {
  try {
    const { dressId, startDate, endDate, customerName } = req.body;

    if (!dressId || !startDate || !endDate) {
      return res.status(400).json({
        message: "Dress, start date and end date are required",
      });
    }

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        message: "Start date cannot be after end date",
      });
    }

    // 🔒 Check overlapping rentals
    const conflict = await Rental.findOne({
      dress: dressId,
      status: "Active",
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    if (conflict) {
      return res.status(409).json({
        message: "Dress already rented for selected dates",
      });
    }

    // Create rental
    const rental = await Rental.create({
      dress: dressId,
      startDate,
      endDate,
      customerName,
    });

    // Update dress status
    await Dress.findByIdAndUpdate(dressId, {
      status: "Rented",
    });

    return res.status(201).json({
      success: true,
      data: rental,
    });
  } catch (error) {
    console.error("ADD RENTAL ERROR:", error);
    return res.status(500).json({
      message: "Failed to add rental",
    });
  }
};

export const getAllDresses = async (req, res) => {
  try {
    const dresses = await Dress.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dresses.length,
      data: dresses,
    });
  } catch (error) {
    console.error("Error fetching dresses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dresses",
    });
  }
};