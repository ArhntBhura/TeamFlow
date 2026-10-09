import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().trim().min(2).max(150),
    description: z.string().trim().max(2000).optional(),
    teamid: z.number().int().positive()
});

export const updateProjectSchema = z.object({
    name: z.string().trim().min(2).max(150).optional(),
    description: z.string().trim().max(2000).optional(),
    teamid: z.number().int().positive().optional(),
}).refine(
    (data) => data.name !== undefined || data.description !== undefined || data.teamid !== undefined,
    {
        message: "At least one field must be provided"
    }
);