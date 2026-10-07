import { db } from "../db/index.ts";
import { users } from "../db/schema/index.ts";

export const createUser = async (data: {
    name: string;
    email: string;
}) => {
    const [user] = await db.insert(users).values(data).returning();

    return user;
};