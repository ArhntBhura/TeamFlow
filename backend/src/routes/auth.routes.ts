import { Router } from "express";

import * as authController from "../controllers/auth.controller.ts";
import { asyncHandler } from "../middleware/asyncHandler.ts";
import { requireAuth } from "../middleware/auth.middleware.ts";

const router = Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.get("/me", requireAuth, asyncHandler(authController.getMe));

export default router;