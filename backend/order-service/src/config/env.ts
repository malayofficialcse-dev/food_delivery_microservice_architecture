
import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 5001,

    NODE_ENV: process.env.NODE_ENV || "development",

    DB_HOST: process.env.DB_HOST || "localhost",

    DB_PORT: Number(process.env.DB_PORT) || 5432,

    DB_NAME: process.env.DB_NAME || "food_delivery_order",

    DB_USER: process.env.DB_USER || "postgres",

    DB_PASSWORD: process.env.DB_PASSWORD || "postgres",

    JWT_SECRET: process.env.JWT_SECRET || "food-delivery-secret",

    JWT_EXPIRES: process.env.JWT_EXPIRES || "1d",

    BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS) || 10,
    KAFKA_BROKER: process.env.KAFKA_BROKER || "",
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || "order-service",
};
