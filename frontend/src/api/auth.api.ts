import { api } from "./axios";
import type { AuthResponse } from "../types/auth";

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
};

export interface LoginInput {
    email: string;
    password: string;
};

export const registerUser = async (input: RegisterInput) => {
    const response = await api.post<AuthResponse>(
        "/auth/register",
        input
    );

    return response.data.data;
};

export const loginUser = async (input: LoginInput) => {
    const response = await api.post<AuthResponse>(
        "/auth/login",
        input
    );

    return response.data.data;
};

