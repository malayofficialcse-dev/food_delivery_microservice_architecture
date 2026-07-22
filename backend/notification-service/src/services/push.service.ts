import type { INotification } from "../interfaces/notification.interface";

class PushService {
	async sendPush(notification: INotification) {
		// Minimal stub: integrate with FCM/APNs here.
		console.log("[pushService] sendPush", notification.deviceToken, notification.title);
		return true;
	}
}

export default new PushService();
