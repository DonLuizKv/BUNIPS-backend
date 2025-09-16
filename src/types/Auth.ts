import jwt from "jsonwebtoken";
import { Request } from "express";

export type jwtUserToken = {
    id: string;
    username: string;
    email: string;
    role: string;
}

export type TokenPayload = {
    id: string;
    username: string;
    email: string;
}

export interface AuthenticatedRequest extends Request {
    user?: jwtUserToken | jwt.JwtPayload;
}

