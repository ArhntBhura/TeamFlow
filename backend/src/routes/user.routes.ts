import { Router } from "express";
import { createUser, getUsers, getUserById, deleteUserById, updateUserById } from "../controllers/user.controller.ts";
import { asyncHandler } from "../middleware/asyncHandler.ts";

const router = Router();

router.post("/", asyncHandler(createUser));
router.get("/", asyncHandler(getUsers));
router.get("/:id", asyncHandler(getUserById));
router.delete("/:id", asyncHandler(deleteUserById));
router.patch("/:id", asyncHandler(updateUserById));

export default router;