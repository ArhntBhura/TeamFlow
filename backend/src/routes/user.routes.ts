import { Router } from "express";
import { getUsers, getUserById, deleteUserById, updateUserById } from "../controllers/user.controller.ts";
import { asyncHandler } from "../middleware/asyncHandler.ts";

const router = Router();

router.get("/", asyncHandler(getUsers));
router.get("/:id", asyncHandler(getUserById));
router.delete("/:id", asyncHandler(deleteUserById));
router.patch("/:id", asyncHandler(updateUserById));

export default router;