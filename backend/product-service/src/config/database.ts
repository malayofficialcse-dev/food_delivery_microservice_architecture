import mongoose from "mongoose";
import {ENV} from "./env.ts";

export const connectDB = async ():Promise<void> => {
    try {
        const connection = await mongoose.connect(
            ENV.MONGO_URI
        );
        console.log(`
            ====================================
            MongoDB Connected Successfully
            ====================================
            Database : ${connection.connection.name}
            Host     : ${connection.connection.host}
            Port     : ${connection.connection.port}
            ====================================
        `);
    } catch (error) {
        console.log("mongodb connection error");
        console.log(error);
        process.exit(1);
    }
}

