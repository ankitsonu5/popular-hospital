import { Router } from "express";
import {
  getUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "../controllers/updateController.js";

const router = Router();

// Public route to fetch active updates (no auth required)
router.get("/", getUpdates);

export default router;
