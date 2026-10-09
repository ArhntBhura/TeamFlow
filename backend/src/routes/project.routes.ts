import { Router } from "express";

import * as projectController from "../controllers/project.controller.ts";
import { asyncHandler } from "../middleware/asyncHandler.ts";

const router = Router();

router.post("/", asyncHandler(projectController.createProject));
router.get("/", asyncHandler(projectController.getProjects));
router.get("/:id", asyncHandler(projectController.getProjectById));
router.patch("/:id", asyncHandler(projectController.updatedProject));
router.delete("/:id", asyncHandler(projectController.deletedProjectById));

export default router;