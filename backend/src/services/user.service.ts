import { db } from "../db/index.ts";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/index.ts";

export const getUsers = async () => {
    return await db.select().from(users);
};

export const getUserById = async (id: number) => {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    return user;
};

export const deleteUserById = async (id: number) => {
    const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning();

    return deletedUser;
};

export const updateUserById = async (
    id: number, 
    data: {
        name?: string | undefined;
        email?: string | undefined;
    }
) => {
    const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();

    return updatedUser;
};
