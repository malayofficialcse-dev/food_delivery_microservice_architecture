import type { Request, Response, NextFunction } from "express";
import type ApiError from "./apiError.ts";

export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error",
    });
};
