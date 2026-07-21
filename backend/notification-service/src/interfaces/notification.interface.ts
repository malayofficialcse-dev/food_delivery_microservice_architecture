import { Document } from "mongoose";

export enum NotificationType {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  IN_APP = "IN_APP",
}

export enum NotificationStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export interface INotification extends Document {
    userId:string;
    type:NotificationType;
    title:string;
    subject?:string;
    message:string;
    email?:string;
    phone?:string;
    deviceToken?:string;
    status:NotificationStatus;
    metadata?:Record<string,any>;
    createdAt:Date;
    updatedAt:Date;
}