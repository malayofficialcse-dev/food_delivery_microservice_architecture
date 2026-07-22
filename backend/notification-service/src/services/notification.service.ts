import * as notificationRepository from "../repositories/index.repository";
import type { INotification, NotificationStatus } from "../interfaces/notification.interface";
import emailService from "./email.service";
import smsService from "./sms.service";
import pushService from "./push.service";

class NotificationService {
	async createNotification(input: Partial<INotification>) {
		const notification = await notificationRepository.createNotification(input as any);

		// dispatch based on type (best-effort, don't block creation)
		try {
			switch (notification.type) {
				case "EMAIL":
					if (notification.email) await emailService.sendEmail(notification);
					break;
				case "SMS":
					if (notification.phone) await smsService.sendSms(notification);
					break;
				case "PUSH":
					if (notification.deviceToken) await pushService.sendPush(notification);
					break;
				default:
					break;
			}

			// mark as sent
			await notificationRepository.setNotificationStatus(notification.id, NotificationStatus.SENT);
		} catch (err) {
			await notificationRepository.setNotificationStatus(notification.id, NotificationStatus.FAILED);
		}

		return notification;
	}

	async getNotifications(query: { limit?: number; offset?: number }) {
		const limit = query.limit ?? 50;
		const offset = query.offset ?? 0;
		return notificationRepository.getNotifications(limit, offset);
	}

	async getNotificationById(id: string) {
		const n = await notificationRepository.getNotificationById(id);
		if (!n) throw new Error("Notification not found.");
		return n;
	}

	async getNotificationsByUser(userId: string, query: { limit?: number; offset?: number }) {
		const limit = query.limit ?? 50;
		const offset = query.offset ?? 0;
		return notificationRepository.getNotificationsByUser(userId, limit, offset);
	}

	async updateNotification(id: string, updates: Partial<INotification>) {
		const updated = await notificationRepository.updateNotification(id, updates as any);
		if (!updated) throw new Error("Notification not found.");
		return updated;
	}

	async setStatus(id: string, status: NotificationStatus) {
		const updated = await notificationRepository.setNotificationStatus(id, status);
		if (!updated) throw new Error("Notification not found.");
		return updated;
	}

	async searchNotifications(q: string, userId?: string, status?: NotificationStatus, limit = 50, offset = 0) {
		return notificationRepository.searchNotifications(q, userId, status, limit, offset);
	}

	async deleteNotification(id: string) {
		await notificationRepository.deleteNotification(id);
	}
}

export default new NotificationService();

