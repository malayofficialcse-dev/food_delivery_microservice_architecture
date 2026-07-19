import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  ssl: env.DB_SSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected for restaurant service");
});

pool.on("error", (err: Error) => {
  console.error("❌ PostgreSQL pool error:", err.message);
});

export const connectDB = async () => {
  try {
    await pool.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        description text,
        address text NOT NULL,
        city text,
        phone text,
        email text,
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );
    `);

    await pool.query("SELECT 1");
    console.log("Database connection verified");
  } catch (error) {
    console.error("Failed to connect to database:", (error as Error).message);
    process.exit(1);
  }
};
