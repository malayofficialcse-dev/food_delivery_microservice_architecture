import type { CartLine, Product } from '../types';

export function getCartSubtotal(cart: CartLine[], products: Product[]) {
  return cart.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId);
    const basePrice = product?.price ?? 0;
    const additionalPrice = line.priceAddition ?? 0;
    return total + (basePrice + additionalPrice) * line.quantity;
  }, 0);
}

export function getCartCount(cart: CartLine[]) {
  return cart.reduce((total, line) => total + line.quantity, 0);
}
