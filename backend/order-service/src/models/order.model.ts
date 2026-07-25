import type { Order } from "../interfaces/index.interface";

export interface OrderRow {
  id: string; order_number: string; user_id: string; restaurant_id: string;
  total_amount: number | string; shipping_address: Order["shippingAddress"];
  payment_method: string; payment_status: Order["paymentStatus"];
  order_status: Order["orderStatus"]; created_at: Date; updated_at: Date;
}

export interface OrderItemRow {
  order_id: string; product_id: string; product_name: string; product_image: string;
  quantity: number; price: number | string;
}

export const mapOrderRow = (row: OrderRow, items: OrderItemRow[]): Order => ({
  id: row.id, orderNumber: row.order_number, userId: row.user_id, restaurantId: row.restaurant_id,
  totalAmount: Number(row.total_amount), shippingAddress: row.shipping_address,
  paymentMethod: row.payment_method, paymentStatus: row.payment_status, orderStatus: row.order_status,
  items: items.map(item => ({ productId: item.product_id, productName: item.product_name,
    productImage: item.product_image, quantity: item.quantity, price: Number(item.price) })),
  createdAt: row.created_at, updatedAt: row.updated_at,
});
