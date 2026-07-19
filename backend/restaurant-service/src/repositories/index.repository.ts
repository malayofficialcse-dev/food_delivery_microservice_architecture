import { pool } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import type {
  IRestaurant,
  IRestaurantCreateInput,
  IRestaurantUpdateInput,
} from "../interfaces/index.interface";
import { mapRestaurantRow } from "../models/index.model";

export const createRestaurant = async (
  input: IRestaurantCreateInput
): Promise<IRestaurant> => {
  const id = uuidv4();

  const result = await pool.query(
    `INSERT INTO restaurants (id, name, description, address, city, phone, email)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *;`,
    [id, input.name, input.description || null, input.address, input.city || null, input.phone || null, input.email || null]
  );

  return mapRestaurantRow(result.rows[0]);
};

export const getRestaurants = async (
  limit = 50,
  offset = 0
): Promise<IRestaurant[]> => {
  const result = await pool.query(
    `SELECT * FROM restaurants
     WHERE is_active = true
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2;`,
    [limit, offset]
  );

  return result.rows.map(mapRestaurantRow);
};

export const getRestaurantById = async (
  id: string
): Promise<IRestaurant | null> => {
  const result = await pool.query(`SELECT * FROM restaurants WHERE id = $1;`, [id]);
  return result.rowCount ? mapRestaurantRow(result.rows[0]) : null;
};

export const getRestaurantByName = async (
  name: string
): Promise<IRestaurant | null> => {
  const result = await pool.query(`SELECT * FROM restaurants WHERE LOWER(name) = LOWER($1) LIMIT 1;`, [name]);
  return result.rowCount ? mapRestaurantRow(result.rows[0]) : null;
};

export const searchRestaurants = async (
  search: string,
  city?: string,
  limit = 50,
  offset = 0
): Promise<IRestaurant[]> => {
  const baseQuery = [
    `SELECT * FROM restaurants WHERE is_active = true AND (`,
    `LOWER(name) LIKE $1 OR LOWER(description) LIKE $1 OR LOWER(address) LIKE $1`,
    `)`,
  ];

  const values = [`%${search.toLowerCase()}%`, limit, offset];
  let query = `${baseQuery.join(" ")} ORDER BY created_at DESC LIMIT $2 OFFSET $3;`;

  if (city) {
    query = query.replace(") ORDER BY", `) AND LOWER(city) = LOWER($4) ORDER BY`);
    values.splice(3, 0, city);
  }

  const result = await pool.query(query, values);
  return result.rows.map(mapRestaurantRow);
};

export const updateRestaurant = async (
  id: string,
  updates: IRestaurantUpdateInput
): Promise<IRestaurant | null> => {
  const columns = Object.entries(updates).filter(([, value]) => value !== undefined);

  if (!columns.length) {
    return getRestaurantById(id);
  }

  const setClause = columns.map(([key], idx) => `${key} = $${idx + 1}`).join(", ");
  const values = columns.map(([, value]) => value);

  const result = await pool.query(
    `UPDATE restaurants SET ${setClause}, updated_at = now() WHERE id = $${values.length + 1} RETURNING *;`,
    [...values, id]
  );

  return result.rowCount ? mapRestaurantRow(result.rows[0]) : null;
};

export const deleteRestaurant = async (id: string): Promise<void> => {
  await pool.query(`UPDATE restaurants SET is_active = false, updated_at = now() WHERE id = $1;`, [id]);
};
