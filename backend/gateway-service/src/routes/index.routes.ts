import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { gatewayController } from "../controllers/index.controller";

const router = Router();

const serviceMap: Record<string, string> = {
  auth: process.env.AUTH_SERVICE_URL || "http://localhost:4000",
  users: process.env.USER_SERVICE_URL || "http://localhost:4001",
  restaurants: process.env.RESTAURANT_SERVICE_URL || "http://localhost:4002",
  products: process.env.PRODUCT_SERVICE_URL || "http://localhost:4003",
  orders: process.env.ORDER_SERVICE_URL || "http://localhost:4004",
  notifications: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4005",
};

const createProxy = (target: string) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^/api/${target}`]: "",
    },
    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader("x-forwarded-host", req.headers.host || "");
      proxyReq.setHeader("x-forwarded-proto", req.protocol);
      proxyReq.setHeader("x-forwarded-for", req.ip);
    },
    onError: (err, _, res) => {
      res.status(502).json({ success: false, message: "Bad gateway", details: err.message });
    },
  });

Object.entries(serviceMap).forEach(([route, url]) => {
  router.use(`/${route}`, createProxy(url));
});

router.post("/events", gatewayController.publishEvent);

export default router;
