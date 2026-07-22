import type { INotification } from "../interfaces/notification.interface";

class EmailService {
	async sendEmail(notification: INotification) {
		// Minimal stub: integrate with real provider (SendGrid, SES) here.
		console.log("[emailService] sendEmail", notification.email, notification.title);
		return true;
	}
}

export default new EmailService();

