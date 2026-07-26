import { z } from "zod";
export const createUserSchema = z.object({ name: z.string().min(1), email: z.string().email(), phone: z.string().optional().default(""), userName: z.string().min(2), password: z.string().min(8), role: z.string().optional().default("USER") });
export const updateUserSchema = createUserSchema.omit({ password: true }).partial();
