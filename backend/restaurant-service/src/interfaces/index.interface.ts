export interface IRestaurant {
  id: string;
  name: string;
  description?: string;
  address: string;
  city?: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IRestaurantCreateInput {
  name: string;
  description?: string;
  address: string;
  city?: string;
  phone?: string;
  email?: string;
}

export interface IRestaurantUpdateInput {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  is_active?: boolean;
}
