export interface AuthUser {
    id: number,
    name: string,
    email: string
};

export interface AuthResponse {
    data: {
        user: AuthUser;
        token: string;
    };
};