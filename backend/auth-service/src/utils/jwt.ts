import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { IUser } from "../interfaces/User";

export interface JwtPayload {

    id: string;

    email: string;

    role: string;

}

export const generateAccessToken = (
    user: IUser
): string => {

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        env.JWT_SECRET,
        {
            expiresIn: env.JWT_EXPIRES
        }
    );

};

export const verifyToken = (
    token: string
): JwtPayload => {

    return jwt.verify(
        token,
        env.JWT_SECRET
    ) as JwtPayload;

};