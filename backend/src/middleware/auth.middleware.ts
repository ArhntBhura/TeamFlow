import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtToken = process.env.JWT_SECRET;

if(!jwtToken) {
    throw new Error("JWT_SECRET is not configured");
}

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if(!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Authentication required"
        });
    }

    const token = authorization.slice("Bearer ".length);

    try {
        const payload = jwt.verify(token, jwtToken);

        if(typeof payload === "string" || typeof payload.sub !== "string" || !/^[1-9]\d*$/.test(payload.sub)) {
            return res.status(401).json({
                error: "Invalid authentication token"
            });
        }

        const userid = Number(payload.sub);

        if(!Number.isSafeInteger(userid)) {
            return res.status(401).json({
                error: "Invalid authentication token"
            });
        }

        (req as AuthenticatedRequest).userId = userid;
        return next();
    } catch {
        return res.status(401).json({
            error: "Invalid or expired authentication token"
        })
    }
}