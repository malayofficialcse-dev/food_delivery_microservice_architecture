import type { Request, Response } from "express";
import { login } from "../services/auth.service";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });
    res.json({ success: true, data: await login(email, password) });
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    res.status(err.statusCode ?? 401).json({ success: false, message: err.message });
  }
};
