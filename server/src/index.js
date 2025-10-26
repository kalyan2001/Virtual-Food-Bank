import express from "express";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< Updated upstream
=======
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
>>>>>>> Stashed changes

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server running 🚀" });
});

<<<<<<< Updated upstream
// Server listen
=======
app.use("/api/food", foodRoutes);

>>>>>>> Stashed changes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
