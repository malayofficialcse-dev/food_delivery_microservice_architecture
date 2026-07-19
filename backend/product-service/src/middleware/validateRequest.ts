import type { AnyZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: AnyZodObject) => async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    } catch (error: any) {
        next(error);
    }
};
