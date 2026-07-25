import { pool } from "../config/db";
import type { Order, UpdateOrderInput } from "../interfaces/index.interface";
import { mapOrderRow } from "../models/order.model";

const withItems = async (rows: any[]): Promise<Order[]> => {
  if (!rows.length) return [];
  const result = await pool.query("SELECT * FROM order_items WHERE order_id = ANY($1::uuid[]) ORDER BY created_at", [rows.map(row => row.id)]);
  return rows.map(row => mapOrderRow(row, result.rows.filter((item: any) => item.order_id === row.id)));
};

export const createOrder = async (order: any): Promise<Order> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(`INSERT INTO orders (order_number,user_id,restaurant_id,total_amount,shipping_address,payment_method,payment_status,order_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [order.orderNumber, order.userId, order.restaurantId, order.totalAmount, JSON.stringify(order.shippingAddress), order.paymentMethod, order.paymentStatus, order.orderStatus]);
    for (const item of order.items) await client.query(`INSERT INTO order_items (order_id,product_id,product_name,product_image,quantity,price) VALUES ($1,$2,$3,$4,$5,$6)`, [result.rows[0].id, item.productId, item.productName, item.productImage, item.quantity, item.price]);
    await client.query("COMMIT");
    return (await withItems(result.rows))[0];
  } catch (error) { await client.query("ROLLBACK"); throw error; } finally { client.release(); }
};
export const getOrders = async (userId?: string) => withItems((await pool.query(`SELECT * FROM orders ${userId ? "WHERE user_id = $1" : ""} ORDER BY created_at DESC`, userId ? [userId] : [])).rows);
export const getOrderById = async (id: string) => { const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]); return result.rowCount ? (await withItems(result.rows))[0] : null; };
export const updateOrder = async (id: string, input: UpdateOrderInput) => {
  const entries = Object.entries(input).filter(([, value]) => value !== undefined).map(([key, value]) => [key === "shippingAddress" ? "shipping_address" : key === "orderStatus" ? "order_status" : key === "paymentStatus" ? "payment_status" : key, value] as const);
  if (!entries.length) return getOrderById(id);
  const set = entries.map(([key], index) => `${key} = $${index + 1}`).join(", ");
  const values = entries.map(([, value]) => typeof value === "object" ? JSON.stringify(value) : value);
  const result = await pool.query(`UPDATE orders SET ${set}, updated_at = now() WHERE id = $${values.length + 1} RETURNING *`, [...values, id]);
  return result.rowCount ? (await withItems(result.rows))[0] : null;
};
