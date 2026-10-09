import type { Request, Response } from "express";
import { ZodError } from "zod";
import { eq } from "drizzle-orm";

import { registerSchema, loginSchema } from "../validators/auth.validator.ts";
import { loginUser, registerUser } from "../services/auth.service.ts";
import { db } from "../db/index.ts";
import { users } from "../db/schema/index.ts";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.ts";

export const register = async(req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({
            error: "Invalid registeration data",
            details: result.error.flatten()
        });
    }

    try {
        const resultData = await registerUser(result.data);

        return res.status(201).json({
            data: resultData
        });
    } catch(error: unknown) {
        // unique violation of the email -> existing email if found
        if(typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
            return res.status(409).json({
                error: "An account with this email already exists"
            }); 
        }

        throw error;
    }
};

export const login = async(req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({
            error: "Invalid login data",
            details: result.error.flatten()
        });
    }

    const resultData = await loginUser(result.data);

    if(!resultData) {
        return res.status(401).json({
            error: "Invalid email or password"
        });
    }

    return res.status(200).json({ data: resultData });
}

export const getMe = async(req: Request, res: Response) => {
    const userId = (req as Request & { userId?: number }).userId;

    if (!userId) {
        return res.status(401).json({
        error: "Authentication required",
        });
    }

    const [user] = await db.select({
        id: users.id,
        name: users.name,
        email: users.email
    }).from(users).where(eq(users.id, userId));
    
    if (!user) {
        return res.status(401).json({
        error: "User account no longer exists",
        });
    }

    return res.status(200).json({ data: user });
}