import { Router } from "express";
import { createUser, getUsers, getUserById, deleteUserById, updateUserById } from "../controllers/user.controller.ts";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.patch("/:id", updateUserById);

export default router;