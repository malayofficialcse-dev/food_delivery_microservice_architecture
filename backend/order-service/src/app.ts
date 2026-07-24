import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import orderRoutes from "./routes/index.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(_,res) => {
    res.json({
        success:true,
        service:"Order service",
        version:"1.0.0"
    });
});

app.use("/api/orders",orderRoutes);

export default app;
