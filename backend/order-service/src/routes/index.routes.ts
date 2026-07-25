import { Router } from "express";
import * as controller from "../controllers/index.controller";
const router=Router();
router.post("/",controller.createOrder); router.get("/",controller.getOrders); router.get("/:id",controller.getOrder);
router.put("/:id",controller.updateOrder); router.patch("/:id/cancel",controller.cancelOrder); router.patch("/:id/payment-status",controller.updatePaymentStatus);
export default router;
