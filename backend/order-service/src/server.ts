import app from "./app";
import {connectDB} from "./config/db";
import { env } from "./config/env";

const PORT = env.PORT;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT,() => {
            console.log(`Order service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start order service",error);
        process.exit(1);
    }
}

startServer();
