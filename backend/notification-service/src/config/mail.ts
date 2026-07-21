import nodemailler from "nodemailer";

const transport = nodemailler.createTransport({
    host:process.env.EMAIL_HOST,
    port:Number(process.env.EMAIL_PORT),
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

export const verifyMailConnection = async () :Promise<void> => {
    try {

    } catch (error) {
        console.error("Mail server connection error ");
        console.error(error);
    }
};

export default transport;