import { Router } from "express";
import { getActivePatientStories } from "../controllers/patientStoryController.js";

const router = Router();

router.get("/", getActivePatientStories);

export default router;
