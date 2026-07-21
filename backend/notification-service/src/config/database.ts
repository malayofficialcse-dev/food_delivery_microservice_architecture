import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async ():Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URL;

        if(!mongoURI) {
            throw new Error("MONGO URI is not defined");
        }

        await mongoose.connect(mongoURI);
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.error("Mongo db connection failed");
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;