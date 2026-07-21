import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/database";
import {connectProducer,connectConsumer} from "./config/kafka";
import connectRedis from "./config/redis";


const PORT = process.env.PORT || 5007;

const startServer = async () : Promise<void> => {
    try {
        //connect to db
        await connectDB;

        //connect to redis
        await connectRedis();
        
        //CONNECT KAFKA
        await connectProducer();
        await connectConsumer();

        app.listen(PORT, () => {
            console.log(`Notification service is running on ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start notification service");
        console.error(error);
        process.exit(1);
    }
};

startServer();