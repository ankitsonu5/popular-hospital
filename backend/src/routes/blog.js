import { Router } from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  searchBlogs,
  addComment,
  getBlogCategoriesMetrics,
  getBlogCategories,
} from "../controllers/blogController.js";

const router = Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/metrics", getBlogCategoriesMetrics);
router.get("/categories", getBlogCategories);
router.get("/search", searchBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/:id/comment", addComment);

export default router;
