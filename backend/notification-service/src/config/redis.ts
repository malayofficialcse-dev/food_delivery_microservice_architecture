import { createClient,RedisClientType } from "redis";
import dotenv from "dotenv";

dotenv.config();

let redisClient:RedisClientType;

export const connectRedis = async ():Promise<void> => {
    try {
        redisClient = createClient({
            url:process.env.REDIS_URL,
        });

        redisClient.on("connect",() => {
            console.log("Connecting to reddis");
        });

        redisClient.on("ready" ,() => {
            console.log("Redis connected");
        });

        redisClient.on("error",(error) => {
            console.error("Redis error",error);
        })

        redisClient.on("end",() => {
            console.log("Redis connection closed");
        });

        await redisClient.connect();
    } catch (error) {
        console.error("Failed to connect to redis");
        console.error(error);
        process.exit(1);
    }
};


export const getRedisClient = ():RedisClientType => {
    if(!redisClient) {
        throw new Error("redis client is not initialized ...");
    }
    return redisClient;
}

export default connectRedis;