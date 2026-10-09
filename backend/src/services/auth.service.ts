import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { users } from "../db/schema/index.ts";

const jwtSecret = process.env.JWT_SECRET;

if(!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
}

const createToken = (userId: number) => {
    return jwt.sign({ sub: String(userId) }, jwtSecret, {
        expiresIn: "1h",
    });
};

export const registerUser = async (data: {
    name: string,
    email: string,
    password: string
}) => {
    const email = data.email.toLowerCase();
    const passwordHash = await bcrypt.hash(data.password, 12);

    const [user] = await db.insert(users).values({
        name: data.name,
        email,
        passwordHash
    }).returning({
        id: users.id,
        name: users.name,
        email: users.email
    });

    if (!user) {
        throw new Error("User creation failed");
    }

    return {
        user, 
        token: createToken(user.id)
    };
};

export const loginUser = async (data: {
    email: string,
    password: string
}) => {
    const email = data.email.toLowerCase();
    
    const [user] = await db.select().from(users).where(eq(users.email, data.email));

    if(!user || !user.passwordHash) {
        return null;
    }

    const validPassword = await bcrypt.compare(data.password, user.passwordHash);

    if(!validPassword) {
        return null;
    }

    return {
        user: {
            id: user.id,
            name: user.name,
            emial: user.email
        },
        token: createToken(user.id)
    };
};