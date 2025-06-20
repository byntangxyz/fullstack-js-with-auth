import express from "express";
import {
  registerUser,
  loginUser,
  getDashboard,
  changePassword,
  getProfile,
  deleteAccount,
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/dashboard", verifyToken, getDashboard);

// Settings routes
router.get("/setting", verifyToken, getProfile);
router.post("/setting/change-password", verifyToken, changePassword);
router.delete("/setting/delete", verifyToken, deleteAccount);

export default router;
