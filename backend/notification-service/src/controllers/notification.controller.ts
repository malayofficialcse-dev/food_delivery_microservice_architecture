import type { Request, Response } from "express";
import notificationService from "../services/notification.service";
import { createNotificationSchema, updateNotificationSchema } from "../validators/notification.validator";
import { z } from "zod";

export const createNotification = async (req: Request, res: Response) => {
	try {
		const payload = createNotificationSchema.parse(req.body);
		const notification = await notificationService.createNotification(payload);

		res.status(201).json({ success: true, data: notification });
	} catch (error) {
		res.status(400).json({ success: false, message: (error as Error).message });
	}
};

export const getNotifications = async (req: Request, res: Response) => {
	try {
		const limit = req.query.limit ? Number(req.query.limit) : undefined;
		const offset = req.query.offset ? Number(req.query.offset) : undefined;

		const notifications = await notificationService.getNotifications({ limit, offset });
		res.json({ success: true, count: notifications.length, data: notifications });
	} catch (error) {
		res.status(500).json({ success: false, message: (error as Error).message });
	}
};

export const getNotificationById = async (req: Request, res: Response) => {
	try {
		const notification = await notificationService.getNotificationById(req.params.id);
		res.json({ success: true, data: notification });
	} catch (error) {
		res.status(404).json({ success: false, message: (error as Error).message });
	}
};

export const getNotificationsByUser = async (req: Request, res: Response) => {
	try {
		const limit = req.query.limit ? Number(req.query.limit) : undefined;
		const offset = req.query.offset ? Number(req.query.offset) : undefined;
		const notifications = await notificationService.getNotificationsByUser(req.params.userId, { limit, offset });
		res.json({ success: true, count: notifications.length, data: notifications });
	} catch (error) {
		res.status(500).json({ success: false, message: (error as Error).message });
	}
};

export const updateNotification = async (req: Request, res: Response) => {
	try {
		const payload = updateNotificationSchema.parse(req.body);
		const notification = await notificationService.updateNotification(req.params.id, payload);
		res.json({ success: true, data: notification });
	} catch (error) {
		res.status(400).json({ success: false, message: (error as Error).message });
	}
};

export const setStatus = async (req: Request, res: Response) => {
	try {
		const body = z.object({ status: z.string() }).parse(req.body);
		const notification = await notificationService.setStatus(req.params.id, body.status as any);
		res.json({ success: true, data: notification });
	} catch (error) {
		res.status(400).json({ success: false, message: (error as Error).message });
	}
};

export const deleteNotification = async (req: Request, res: Response) => {
	try {
		await notificationService.deleteNotification(req.params.id);
		res.json({ success: true, message: "Notification deleted successfully." });
	} catch (error) {
		res.status(400).json({ success: false, message: (error as Error).message });
	}
};

export const searchNotifications = async (req: Request, res: Response) => {
	try {
		const q = (req.query.q as string) || "";
		const userId = req.query.userId as string | undefined;
		const status = req.query.status as string | undefined;
		const limit = req.query.limit ? Number(req.query.limit) : undefined;
		const offset = req.query.offset ? Number(req.query.offset) : undefined;

		const results = await notificationService.searchNotifications(q, userId, status as any, limit, offset);
		res.json({ success: true, count: results.length, data: results });
	} catch (error) {
		res.status(500).json({ success: false, message: (error as Error).message });
	}
};

