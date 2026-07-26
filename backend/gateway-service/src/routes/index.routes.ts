import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { gatewayController } from "../controllers/index.controller";

const router = Router();

const serviceMap: Record<string, string> = {
  auth: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
  users: process.env.USER_SERVICE_URL || process.env.AUTH_SERVICE_URL || "http://localhost:5001",
  restaurants: process.env.RESTAURANT_SERVICE_URL || "http://localhost:5004",
  products: process.env.PRODUCT_SERVICE_URL || "http://localhost:5003",
  orders: process.env.ORDER_SERVICE_URL || "http://localhost:5005",
  notifications: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5007",
};

const createProxy = (route: string, target: string) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^/api/${route}`]: "/api",
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
  router.use(`/${route}`, createProxy(route, url));
});

router.post("/events", gatewayController.publishEvent);

export default router;
