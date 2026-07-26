import { Router } from "express";
import * as controller from "../controllers/index.controller";
const router = Router();
router.post("/", controller.createUser); router.get("/", controller.getUsers); router.get("/:id", controller.getUser); router.patch("/:id", controller.updateUser); router.delete("/:id", controller.deleteUser);
export default router;
