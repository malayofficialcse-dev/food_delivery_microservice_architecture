import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.ts";

const app = express();

app.use(cors);

connectDB();

app.listen(5003,() => {
    console.log("App is listening 5003");
});