import type { Request, Response } from "express";

import * as projectService from "../services/project.service.ts";
import { createProjectSchema, updateProjectSchema } from "../validators/project.validator.ts";

const parseId = (value: unknown): number | null => {
    if (typeof value !== "string") {
        return null;
    }

    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};

export const createProject = async(req: Request, res: Response) => {
    const result = createProjectSchema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({
            error: "Invalid project details",
            details: result.error.flatten(),
        });
    }

    const project = await projectService.createProject(result.data);

    return res.status(201).json({ data: project});
};

export const getProjects = async(req: Request, res: Response) => {
    const projects = await projectService.getProjects();

    return res.status(200).json({ data: projects });
};

export const getProjectById = async(req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if(id === null) {
        return res.status(400).json({
            error: "Invalid project id"
        });
    }

    const project = await projectService.getProjectById(id);

    if(!project) {
        return res.status(404).json({
            error: "Project not found"
        });
    }

    return res.status(200).json({ data: project });
};

export const updatedProject = async(req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if(id === null) {
        return res.status(400).json({
            error: "Invalid project id"
        });
    }
    
    const result = updateProjectSchema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({
            error: "Invalid project data",
            details: result.error.flatten()
        });
    }

    const project = await projectService.updateProject(id, result.data);

    return res.status(200).json( {data: project });
};

export const deletedProjectById = async(req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if(id === null) {
        return res.status(400).json({
            error: "Invalid project id"
        });
    }

    const project = await projectService.deleteProjectById(id);

    if(!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    return res.status(204).send();
};

