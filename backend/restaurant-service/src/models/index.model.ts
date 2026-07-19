import type { IRestaurant } from "../interfaces/index.interface";

export const mapRestaurantRow = (row: any): IRestaurant => ({
  id: row.id,
  name: row.name,
  description: row.description ?? undefined,
  address: row.address,
  city: row.city ?? undefined,
  phone: row.phone ?? undefined,
  email: row.email ?? undefined,
  is_active: row.is_active,
  created_at: row.created_at,
  updated_at: row.updated_at,
});
