import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";


import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/api/users",userRoutes);

app.get("/", (_, res) => {

    res.json({

        success: true,

        message: "Auth Service Running"

    });

});

export default app;