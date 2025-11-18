import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";
import FoodItem from "../models/FoodItem.js";
import Notification from "../models/Notification.js";

dotenv.config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("Incoming form data:", req.body);
    console.log("File received:", req.file ? req.file.originalname : "none");

    let imageURL = "";
    if (req.file) {
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

    await Notification.create({
      message: `🍎 New donation posted: ${req.body.name} `,
      forRole: "recipient",
    });

    res.status(201).json({ message: "Food added successfully", food });
  } catch (err) {
    console.error("❌ Upload/AddFood error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all food items by donor
router.get("/donor/:donorId", async (req, res) => {
  try {
    const { donorId } = req.params;
    console.log("Fetching foods for donor:", donorId);

    const foods = await FoodItem.find({ donorId }).sort({ createdAt: -1 });
    //console.log("✅ Found items:", foods.length);

    res.status(200).json(foods);
  } catch (err) {
    console.error("❌ Fetch donor foods error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a food item by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await FoodItem.findByIdAndDelete(id);
//     res.status(200).json({ message: "Food deleted successfully" });
//   } catch (err) {
//     console.error("❌ Delete food error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// Update a food item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // console.log("Update request body:", req.body);
    // console.log("Updating ID:", req.params.id);

    const updatedFood = await FoodItem.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedFood)
      return res.status(404).json({ message: "Food item not found" });

    res
      .status(200)
      .json({ message: "Food item updated successfully", food: updatedFood });
  } catch (err) {
    console.error("❌ Update food error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all available food items (for recipients)
// 👀 Get all available food items (for recipients)
router.get("/available", async (req, res) => {
  try {
    const now = new Date();

    // Auto-delete expired items before returning results
    const deleted = await FoodItem.deleteMany({ expiryDate: { $lt: now } });
    if (deleted.deletedCount > 0) {
      console.log(`🧹 Auto-deleted ${deleted.deletedCount} expired items.`);
    }

    const foods = await FoodItem.find({ status: "available" }).sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (err) {
    console.error("❌ Fetch available foods error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
