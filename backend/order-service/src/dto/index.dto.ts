import { z } from "zod";

const orderStatuses = ["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Out For Delivery", "Delivered", "Cancelled"] as const;
const paymentStatuses = ["Pending", "Paid", "Failed", "Refunded"] as const;

export const createOrderSchema = z.object({
  userId: z.string().uuid(), restaurantId: z.string().uuid(),
  items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().positive() })).min(1),
  shippingAddress: z.object({ fullName:z.string().min(1), phone:z.string().min(5), address:z.string().min(1), city:z.string().min(1), state:z.string().min(1), pinCode:z.string().min(3) }),
  paymentMethod: z.string().min(1),
});
export const updateOrderSchema = z.object({
  shippingAddress: createOrderSchema.shape.shippingAddress.optional(), paymentMethod:z.string().min(1).optional(),
  orderStatus:z.enum(orderStatuses).optional(), paymentStatus:z.enum(paymentStatuses).optional(),
}).strict();
