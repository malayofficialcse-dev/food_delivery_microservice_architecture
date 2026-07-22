import { Router } from "express";
import * as controller from "../controllers/notification.controller";

const router = Router();

router.post("/", controller.createNotification);
router.get("/", controller.getNotifications);
router.get("/search", controller.searchNotifications);
router.get("/user/:userId", controller.getNotificationsByUser);
router.get("/:id", controller.getNotificationById);
router.put("/:id", controller.updateNotification);
router.patch("/:id/status", controller.setStatus);
router.delete("/:id", controller.deleteNotification);

export default router;
