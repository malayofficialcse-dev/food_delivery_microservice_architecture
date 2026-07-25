import dotenv from "dotenv";

dotenv.config();

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASS || "",
    },
});

export const verifyMailConnection = async (): Promise<void> => {
    try {
        await transport.verify();
        console.log("Mail server connection verified");
    } catch (error) {
        console.error("Mail server connection error");
        console.error(error);
    }
};

export default transport;