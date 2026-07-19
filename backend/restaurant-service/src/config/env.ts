import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5004,
  NODE_ENV: process.env.NODE_ENV || "development",

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || "food_delivery_restaurant",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
  DB_SSL: process.env.DB_SSL === "true",

  KAFKA_BROKER: process.env.KAFKA_BROKER || "",
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || "restaurant-service",
  KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || "restaurant-service-group",
  KAFKA_TOPIC_RESTAURANTS: process.env.KAFKA_TOPIC_RESTAURANTS || "restaurant.events",
  KAFKA_CONSUMER_TOPIC: process.env.KAFKA_CONSUMER_TOPIC || "restaurant.commands",
};
