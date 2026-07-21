import mongoose from "mongoose";
import dotenv from " dotenv";


const connectDB = async ():Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URL;

        if(!mongoURI) {
            throw new Error("")
        }
    } catch (error) {

    }
}