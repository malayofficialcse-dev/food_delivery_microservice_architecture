import Notification from "../models/notification.model";
import type { INotification, NotificationStatus } from "../interfaces/notification.interface";

export const createNotification = async (
	input: Partial<INotification>
): Promise<INotification> => {
	const doc = new Notification(input);
	return doc.save();
};

export const getNotifications = async (
	limit = 50,
	offset = 0
): Promise<INotification[]> => {
	return Notification.find()
		.sort({ createdAt: -1 })
		.skip(offset)
		.limit(limit)
		.exec();
};

export const getNotificationById = async (
	id: string
): Promise<INotification | null> => {
	return Notification.findById(id).exec();
};

export const getNotificationsByUser = async (
	userId: string,
	limit = 50,
	offset = 0
): Promise<INotification[]> => {
	return Notification.find({ userId })
		.sort({ createdAt: -1 })
		.skip(offset)
		.limit(limit)
		.exec();
};

export const updateNotification = async (
	id: string,
	updates: Partial<INotification>
): Promise<INotification | null> => {
	return Notification.findByIdAndUpdate(id, updates, { new: true }).exec();
};

export const setNotificationStatus = async (
	id: string,
	status: NotificationStatus
): Promise<INotification | null> => {
	return Notification.findByIdAndUpdate(id, { status }, { new: true }).exec();
};

export const searchNotifications = async (
	search: string,
	userId?: string,
	status?: NotificationStatus,
	limit = 50,
	offset = 0
): Promise<INotification[]> => {
	const filter: any = {};

	if (userId) filter.userId = userId;
	if (status) filter.status = status;

	if (search && search.trim()) {
		const regex = new RegExp(search.trim(), "i");
		filter.$or = [{ title: regex }, { message: regex }, { subject: regex }];
	}

	return Notification.find(filter)
		.sort({ createdAt: -1 })
		.skip(offset)
		.limit(limit)
		.exec();
};

export const deleteNotification = async (id: string): Promise<void> => {
	await Notification.findByIdAndDelete(id).exec();
};

