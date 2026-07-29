import type { Product } from '../types';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80';
const API_BASE = (import.meta.env.VITE_PRODUCT_SERVICE_URL ?? '/api').replace(/\/$/, '');

function createSlug(value: string, fallback: string) {
  const base = (value || fallback).toLowerCase().trim();
  return base.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || fallback;
}

function normalizeProduct(item: any, index: number): Product {
  const productName = item.productName || item.name || item.title || `Featured dish ${index + 1}`;
  const productId = String(item._id || item.id || item.slug || productName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `product-${index + 1}`;

  const sellerName = item.sellerName || item.restaurantName || item.brand || 'Partner kitchen';
  const restaurantId = createSlug(sellerName, 'partner-kitchen');
  const images = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
  const image = images[0] || FALLBACK_IMAGE;

  const price = Number(item.discountPrice ?? item.price ?? 0);
  const description = String(item.description || 'Freshly prepared and delivered hot.');
  const category = String(item.category || 'Featured').trim();
  const calories = Number(item.calories ?? 600 + index * 40);
  const rating = Number(item.rating ?? (4.5 + (index % 4) * 0.1));
  const vegetarian = /veg|veggie|paneer|tofu|mushroom|salad/i.test(`${productName} ${category}`);
  const bestseller = index < 2 || /bestseller|signature|special/i.test(`${productName} ${category}`);

  return {
    id: productId,
    restaurantId,
    restaurantName: sellerName,
    name: productName,
    category,
    description,
    price,
    rating,
    calories,
    image,
    bestseller,
    vegetarian,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Unable to load products from the product service');
  }

  const payload = await response.json();
  const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

  return items.map(normalizeProduct);
}
