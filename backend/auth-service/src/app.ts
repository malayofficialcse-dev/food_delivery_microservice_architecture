import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";


import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);

app.get("/health", (_, res) => res.json({ success: true, service: "auth-service" }));

app.get("/", (_, res) => {

    res.json({

        success: true,

        message: "Auth Service Running"

    });

});

export default app;
