import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import productRoutes from "./routes/product.routes.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

app.use("/api/products", productRoutes);

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Product service running",
    });
});

export default app;
