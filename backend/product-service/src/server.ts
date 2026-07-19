import dotenv from "dotenv";

dotenv.config();

import app from "./app.ts";
import { connectDB } from "./config/database.ts";
import { ENV } from "./config/env.ts";

const PORT = ENV.PORT || 5003;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Product service is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start product service:", error);
        process.exit(1);
    }
};

startServer();