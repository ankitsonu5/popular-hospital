import { Router } from "express";
import {
  getAllEvents,
  getEventBySlug,
} from "../controllers/eventController.js";

const router = Router();

router.get("/", getAllEvents);
router.get("/:slug", getEventBySlug);

export default router;
