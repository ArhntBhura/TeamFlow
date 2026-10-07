import { Router } from "express";
import { createUser } from "../controllers/user.controller.ts";

const router = Router();

router.post("/", createUser);

export default router;