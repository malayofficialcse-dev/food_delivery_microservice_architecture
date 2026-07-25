import type { LucideIcon } from 'lucide-react';

export type Theme = 'light' | 'dark';

export type Page =
  | { name: 'home' }
  | { name: 'restaurants' }
  | { name: 'restaurant'; restaurantId: string }
  | { name: 'products' }
  | { name: 'product'; productId: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'payment' }
  | { name: 'orders' }
  | { name: 'order'; orderId: string }
  | { name: 'profile' }
  | { name: 'login' }
  | { name: 'support' };

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  eta: string;
  deliveryFee: number;
  distance: string;
  image: string;
  tags: string[];
  offer: string;
};

export type Product = {
  id: string;
  restaurantId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  calories: number;
  image: string;
  bestseller?: boolean;
  vegetarian?: boolean;
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  restaurant: string;
  placedAt: string;
  status: string;
  total: number;
  eta: string;
  items: string[];
  progress: number;
};

export type NavItem = {
  label: string;
  page: Page;
  icon: LucideIcon;
};
