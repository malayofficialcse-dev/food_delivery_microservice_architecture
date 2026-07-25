import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { AuthenticatedUser } from "../interfaces/index.interface";

declare global { namespace Express { interface Request { user?: AuthenticatedUser } } }

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) { res.status(401).json({ success:false, message:"Authentication required" }); return; }
  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET) as { id?: string; sub?: string; role?: string };
    const id = payload.id || payload.sub;
    if (!id) throw new Error("Invalid token");
    req.user = { id, role: payload.role };
    next();
  } catch { res.status(401).json({ success:false, message:"Invalid or expired token" }); }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role?.toUpperCase() !== "ADMIN") { res.status(403).json({ success:false, message:"Admin access required" }); return; }
  next();
};
