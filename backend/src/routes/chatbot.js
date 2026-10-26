import express from "express";
import { handleChatbotAi } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/ai", handleChatbotAi);

export default router;
