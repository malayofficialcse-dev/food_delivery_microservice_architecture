import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT: Number(process.env.PORT) || 5003,

    MONGO_URI:
        process.env.MONGO_URI ||
        "mongodb://localhost:27017/product-service",

    USER_SERVICE_URL:
        process.env.USER_SERVICE_URL ||
        "http://localhost:5001/api/v1",

    NODE_ENV:
        process.env.NODE_ENV || "development",
};