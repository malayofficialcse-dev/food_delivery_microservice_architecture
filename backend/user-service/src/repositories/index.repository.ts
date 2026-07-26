import { Pool } from "pg";
import type { CreateUser, UpdateUser, User } from "../interfaces/index.interface";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({ host: process.env.DB_HOST || "localhost", port: Number(process.env.DB_PORT || 5432), database: process.env.DB_NAME || "food_delivery_auth", user: process.env.DB_USER || "postgres", password: process.env.DB_PASSWORD || "postgres" });
const columns = "id, name, email, phone, user_name AS \"userName\", role, created_at AS \"createdAt\", updated_at AS \"updatedAt\"";
export const init = async () => { await pool.query("CREATE EXTENSION IF NOT EXISTS pgcrypto"); await pool.query(`CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text NOT NULL UNIQUE, phone text NOT NULL DEFAULT '', user_name text NOT NULL UNIQUE, password text NOT NULL, role text NOT NULL DEFAULT 'USER', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`); };
export const list = async (): Promise<User[]> => (await pool.query(`SELECT ${columns} FROM users ORDER BY created_at DESC`)).rows;
export const find = async (id: string): Promise<User | null> => (await pool.query(`SELECT ${columns} FROM users WHERE id=$1`, [id])).rows[0] ?? null;
export const create = async (input: CreateUser, password: string): Promise<User> => (await pool.query(`INSERT INTO users (name,email,phone,user_name,password,role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING ${columns}`, [input.name,input.email,input.phone || "",input.userName,password,input.role || "USER"])).rows[0];
export const update = async (id: string, input: UpdateUser): Promise<User | null> => { const entries = Object.entries(input).filter(([, value]) => value !== undefined); if (!entries.length) return find(id); const map: Record<string,string> = { userName: "user_name" }; const set = entries.map(([key], i) => `${map[key] || key}=$${i + 1}`).join(", "); const values = entries.map(([, value]) => value); return (await pool.query(`UPDATE users SET ${set}, updated_at=now() WHERE id=$${values.length + 1} RETURNING ${columns}`, [...values,id])).rows[0] ?? null; };
export const remove = async (id: string) => (await pool.query("DELETE FROM users WHERE id=$1", [id])).rowCount === 1;
