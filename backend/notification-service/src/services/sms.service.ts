import type { INotification } from "../interfaces/notification.interface";

class SmsService {
	async sendSms(notification: INotification) {
		// Minimal stub: integrate with Twilio or other SMS provider.
		console.log("[smsService] sendSms", notification.phone, notification.message);
		return true;
	}
}

export default new SmsService();
