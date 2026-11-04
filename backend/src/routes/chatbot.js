import express from "express";
import { handleChatbotAi } from "../controllers/chatbotController.js";
import { handleChatbotBrain } from "../controllers/chatbotBrainController.js";

const router = express.Router();

router.post("/ai", handleChatbotAi);
router.post("/brain", handleChatbotBrain);

export default router;
