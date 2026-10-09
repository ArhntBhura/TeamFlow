import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(255),
})

export const updateUserSchema = z.object({
    name: z.string().trim().min(2).max(100).optional(),
    email: z.string().trim().email().max(255).optional(),
}).refine(
    (data) => data.name !== undefined || data.email !== undefined,
    {
        message: "Atleast one field must be provided"
    }
);