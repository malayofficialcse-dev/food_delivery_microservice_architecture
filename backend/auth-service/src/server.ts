import app from "./app";

import { env } from "./config/env";

import { pool } from "./config/db";

const startServer = async () => {

    try {

        await pool.query("SELECT NOW()");
        const { readFile } = await import("fs/promises");
        const { resolve } = await import("path");
        await pool.query(await readFile(resolve(process.cwd(), "src/database/migrations/001_create_users.sql"), "utf8"));

        console.log("Database Connected");

        app.listen(env.PORT, () => {

            console.log(`Server Running On Port ${env.PORT}`);

        });

    } catch (err) {

        console.log(err);

    }

};

startServer();
