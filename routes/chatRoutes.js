import express from "express";
import { sendMessage, getChatList, getConversation } from "../controllers/chatController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/list", authMiddleware, getChatList);
router.get("/conversation", authMiddleware, getConversation);

export default router;