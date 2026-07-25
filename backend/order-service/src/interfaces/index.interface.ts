export interface OrderItem {
    productId:string;
    productName:string;
    productImage:string;
    quantity:number;
    price:number;
}

export interface ShippingAddress{
    fullName:string;
    phone:string;
    address:string;
    city:string;
    state:string;
    pinCode:string;
}

export type OrderStatus = 
    | "Pending"
    | "Confirmed"
    | "Processing"
    | "Packed"
    | "Shipped"
    | "Out For Delivery"
    | "Delivered"
    | "Cancelled";

export type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded";

export interface Order {
    id?:string;
    orderNumber:string;
    userId:string;
    restaurantId:string;
    items:OrderItem[];
    totalAmount:number;
    shippingAddress:ShippingAddress;
    paymentMethod:string;
    paymentStatus:PaymentStatus;
    orderStatus:OrderStatus;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface CreateOrderInput {
    userId: string;
    restaurantId: string;
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
}

export interface UpdateOrderInput {
    shippingAddress?: ShippingAddress;
    paymentMethod?: string;
    orderStatus?: OrderStatus;
    paymentStatus?: PaymentStatus;
}

