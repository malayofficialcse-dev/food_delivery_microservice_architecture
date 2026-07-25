import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  const err = error instanceof ApiError ? error : new ApiError(500, (error as Error)?.message || "Internal server error");
  res.status(err.statusCode).json({ success:false, message:err.message });
};
