import app from "./app";
import {connectDB} from "./config/db";

const PORT = process.env.PORT || 5003;

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