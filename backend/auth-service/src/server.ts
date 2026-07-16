import app from "./app";

import { env } from "./config/env";

import { pool } from "./config/db";

const startServer = async () => {

    try {

        await pool.query("SELECT NOW()");

        console.log("Database Connected");

        app.listen(env.PORT, () => {

            console.log(`Server Running On Port ${env.PORT}`);

        });

    } catch (err) {

        console.log(err);

    }

};

startServer();