import {Pool} from "pg";
import {env} from "./env";


export const pool = new Pool(
    {
        host :env.DB_HOST,
        port:env.DB_PORT,
        database:env.DB_NAME,
        user:env.DB_USER,
        password:env.DB_PASSWORD,

        max:20,
        idleTimeoutMillis:30000,
        connectionTimeoutMillis:5000,

    }
);

pool.on("connect",() => {
    console.log("Postgresql connected for order service");
});

pool.on("error",(err:Error) => {
    console.error("Database error : ",err.message);
});

export const connectDB = async () => {
    try {
        await pool.query("SELECT NOW()");
        console.log("Order service connected successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
