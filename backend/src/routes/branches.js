import { Router } from "express";
import {
  getAllBranches,
  getBranchByIdOrSlug,
} from "../controllers/branchController.js";

const router = Router();

router.get("/", getAllBranches);
router.get("/:idOrSlug", getBranchByIdOrSlug);

export default router;
