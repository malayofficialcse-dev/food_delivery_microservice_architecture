import { z } from "zod";

export const restaurantCreateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().max(1024).optional(),
  address: z.string().min(5, "Address must be at least 5 characters."),
  city: z.string().min(2).optional(),
  phone: z.string().min(7).max(20).optional(),
  email: z.string().email().optional(),
});

export const restaurantUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().max(1024).optional(),
  address: z.string().min(5).optional(),
  city: z.string().min(2).optional(),
  phone: z.string().min(7).max(20).optional(),
  email: z.string().email().optional(),
  is_active: z.boolean().optional(),
});
