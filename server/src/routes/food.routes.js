import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";
import FoodItem from "../models/FoodItem.js";

dotenv.config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("Incoming form data:", req.body);
    console.log("File received:", req.file ? req.file.originalname : "none");

    // Debug Cloudinary config
    // console.log("Cloudinary config check:", {
    //   cloud_name: cloudinary.config().cloud_name,
    //   api_key: cloudinary.config().api_key ? '✓' : '✗',
    //   api_secret: cloudinary.config().api_secret ? '✓' : '✗'
    // });

    let imageURL = "";
    if (req.file) {

      // Manually configure Cloudinary right before upload
  // const cloudinaryUrl = process.env.CLOUDINARY_URL;
  // const matches = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  // if (matches) {
  //   const [, api_key, api_secret, cloud_name] = matches;
  //   cloudinary.config({
  //     cloud_name,
  //     api_key,
  //     api_secret,
  //     secure: true
  //   });
  // }

      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      console.log("Uploading to Cloudinary...");

      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: "food_donations",
      });
      imageURL = uploadResponse.secure_url;
      console.log("✅ Cloudinary upload success:", imageURL);
    }

    const food = new FoodItem({
      donorId: req.body.donorId,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      quantity: req.body.quantity,
      expiryDate: req.body.expiryDate,
      pickupAddress: req.body.pickupAddress,
      imageURL,
    });

    await food.save();
    res.status(201).json({ message: "Food added successfully", food });
  } catch (err) {
    console.error("❌ Upload/AddFood error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
