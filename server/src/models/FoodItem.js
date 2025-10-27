import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema(
  {
    donorId: { type: String, required: true }, // Firebase UID
    name: { type: String, required: true },
    description: String,
    category: String,
    quantity: Number,
    expiryDate: Date,
    pickupAddress: String,
    imageURL: String,
    status: { type: String, default: "available" },
  },
  { timestamps: true }
);

export default mongoose.model("FoodItem", FoodItemSchema);
