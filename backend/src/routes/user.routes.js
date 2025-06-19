// backend/routes/user.routes.js
import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/users?search=keyword
router.get("/", protectRoute, getAllUsers);

export default router;

