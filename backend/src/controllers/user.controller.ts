import type { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "../validators/user.validator.ts";
import * as userService from "../services/user.service.ts";

export const getUsers = async (req: Request, res: Response) => {
    const users = await userService.getUsers();

    return res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid user id"
        });
    }
    const user = userService.getUserById(id);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    return res.status(200).json(user);
};

export const deleteUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid id"
        });
    }
    const deletedUser = userService.deleteUserById(id);

    if(!deletedUser) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    return res.status(204).send();
};

export const updateUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid Userid"
        });
    }
    const result = updateUserSchema.safeParse(req.body);
    
    if(!result.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: result.error.flatten()
        });
    }

    const updatedUser = userService.updateUserById(id, result.data);

    if(!updatedUser) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    return res.status(200).json(updatedUser);
};
