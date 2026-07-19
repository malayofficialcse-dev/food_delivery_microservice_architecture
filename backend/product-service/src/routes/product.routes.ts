import { Router } from "express";
import * as controller from "../Controllers/product.controller.ts";

const router = Router();

router.post("/", controller.createProduct);
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductsById);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

export default router;
