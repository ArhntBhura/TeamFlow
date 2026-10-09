import { api } from "./axios";
import type { Project } from "../types/project";

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get<{ data: Project[] }>("/projects");
    return response.data.data;
}

export type CreateProjectInput = {
    name: string,
    description?: string | undefined,
    teamId: number
};

export const createProject = async (input: CreateProjectInput): Promise<Project> => {
    const response = await api.post<{ data: Project }>(
        "/projects",
        input
    );

    return response.data.data;
};