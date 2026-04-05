import { Router } from "express";
import {
  getAllCoverage,
  getCoverageBySlug,
} from "../controllers/coverageController.js";

const router = Router();

router.get("/", getAllCoverage);
router.get("/:slug", getCoverageBySlug);

export default router;
