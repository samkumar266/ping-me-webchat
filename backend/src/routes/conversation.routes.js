import express from "express";
import { createConversation, getConversations } from "../controllers/conversation.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", protectRoute, createConversation);
router.get("/", protectRoute, getConversations);



export default router;
