import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { projects } from "../db/schema/index.ts";

type CreateProjectInput = {
    name: string,
    description?: string | undefined,
    teamid: number
};

type updateProjectInput = {
    name?: string | undefined,
    description?: string | undefined,
    teamid?: number | undefined
};

export const createProject = async(data: CreateProjectInput) => {
    const [project] = await db.insert(projects).values(data).returning();

    return project;
}

export const getProjects = async() => {
    return await db.select().from(projects);
}

export const getProjectById = async(id: number) => {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));

    return project;
}

export const updateProject = async(id: number, data: updateProjectInput) => {
    const [updatedProject] = await db.update(projects).set(data).where(eq(projects.id, id)).returning();

    return updatedProject;
}

export const deleteProjectById = async(id: number) => {
    const [deletedProject] = await db.delete(projects).where(eq(projects.id, id)).returning();

    return deletedProject;
}