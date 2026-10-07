import type { Request, Response } from "express";
import { createUserSchema } from "../validators/user.validator.ts";
import * as userService from "../services/user.service.ts";

export const createUser = async (req: Request, res: Response) => {
    const result = createUserSchema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: result.error.flatten()
        });
    }

    try {
        const user = await userService.createUser(result.data);

        return res.status(201).json(user);
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};
