import { z } from "zod";

export const createProductSchema = z.object({
    productName: z.string().min(1, "Product name is required."),
    description: z.string().min(1, "Description is required."),
    category: z.string().min(1, "Category is required."),
    brand: z.string().optional(),
    price: z.number().positive("Price must be a positive number."),
    discountPrice: z.number().nonnegative("Discount price must be zero or greater.").optional(),
    quantity: z.number().int("Quantity must be an integer.").nonnegative("Quantity must be zero or greater."),
    images: z.array(z.string().min(1)).optional().default([]),
    sellerId: z.string().min(1, "Seller id is required."),
    sellerName: z.string().optional(),
    isActive: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();
