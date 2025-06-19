import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.post("/", protectRoute, createNotification);
router.put("/:id/read", protectRoute, markAsRead);

export default router;
