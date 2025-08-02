import { Router } from "express";
import authRoutes from "./authRoutes";
import { ApiResponseUtil } from "../utils/apiResponse";

const router = Router();

// Health check
router.get("/health", (req, res) => {
  ApiResponseUtil.success(res, "Server is running", {
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
router.use("/auth", authRoutes);
router.use("/category", authRoutes);

export default router;
