import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

app.use("/api", routes);

app.get("/health", (_, res) => {
  res.status(200).json({ success: true, message: "Gateway service is healthy" });
});

app.use((_, res) => {
  res.status(404).json({ success: false, message: "Resource not found" });
});

app.use((err: any, _, res, __) => {
  const status = err.status || 500;
  res.status(status).json({ success: false, message: err.message || "Internal Server Error" });
});

export default app;
