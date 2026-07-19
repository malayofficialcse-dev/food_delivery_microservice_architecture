// import { Pool } from "pg";
// import { env } from "./env";

// export const pool = new Pool({
//     host: env.DB_HOST,
//     port: env.DB_PORT,
//     database: env.DB_NAME,
//     user: env.DB_USER,
//     password: env.DB_PASSWORD,
// });

// pool.on("connect", () => {
//     console.log("✅ PostgreSQL Connected");
// });

// pool.on("error", (err: Error) => {
//     console.error("❌ PostgreSQL Error:", err.message);
// });


import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on("connect", () => {
    console.log("✅ PostgreSQL Connected for auth service");
});

pool.on("error", (err: Error) => {
    console.error("Database Error:", err.message);
});

export const connectDB = async () => {
    try {
        await pool.query("SELECT NOW()");
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};