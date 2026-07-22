import { z } from "zod";
import { NotificationType, NotificationStatus } from "../interfaces/notification.interface";

export const createNotificationSchema = z.object({
	userId: z.string().min(1),
	type: z.nativeEnum(NotificationType),
	title: z.string().min(1),
	subject: z.string().optional(),
	message: z.string().min(1),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	deviceToken: z.string().optional(),
	metadata: z.record(z.any()).optional(),
});

export const updateNotificationSchema = z.object({
	title: z.string().optional(),
	subject: z.string().optional(),
	message: z.string().optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	deviceToken: z.string().optional(),
	status: z.nativeEnum(NotificationStatus).optional(),
	metadata: z.record(z.any()).optional(),
});

export default { createNotificationSchema, updateNotificationSchema };
