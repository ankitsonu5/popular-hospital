import { Router } from "express";
import { getAllNews, getNewsBySlug } from "../controllers/newsController.js";

const router = Router();

router.get("/", getAllNews);
router.get("/:slug", getNewsBySlug);

export default router;
