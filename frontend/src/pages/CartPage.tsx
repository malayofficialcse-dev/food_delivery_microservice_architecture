import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartSummary } from '../components/CartSummary';
import { currency, products } from '../data/appData';
import type { CartLine, Page } from '../types';

type CartPageProps = {
  cart: CartLine[];
  onAdd: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onNavigate: (page: Page) => void;
};

export function CartPage({ cart, onAdd, onDecrease, onNavigate }: CartPageProps) {
  return (
    <section className="checkout-layout">
      <div className="page-stack">
        <div className="page-title">
          <span className="section-kicker">Basket</span>
          <h1>Your cart</h1>
          <p>Review quantities, remove items, and continue to address and payment.</p>
        </div>
        <div className="cart-list">
          {cart.length ? cart.map((line) => {
            const product = products.find((item) => item.id === line.productId);
            if (!product) return null;
            return (
              <article className="cart-line" key={line.productId}>
                <img src={product.image} alt={product.name} />
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.category}</span>
                  <small>{currency.format(product.price)} each</small>
                </div>
                <div className="quantity-panel compact">
                  <button className="icon-button" type="button" onClick={() => onDecrease(product.id)}><Minus size={16} /></button>
                  <strong>{line.quantity}</strong>
                  <button className="icon-button" type="button" onClick={() => onAdd(product.id)}><Plus size={16} /></button>
                </div>
                <strong>{currency.format(product.price * line.quantity)}</strong>
              </article>
            );
          }) : (
            <div className="empty-state">
              <Trash2 size={28} />
              <h2>Your cart is empty</h2>
              <p>Add dishes from the product page to begin checkout.</p>
              <button className="primary-button" type="button" onClick={() => onNavigate({ name: 'products' })}>Browse products</button>
            </div>
          )}
        </div>
      </div>
      <CartSummary cart={cart} buttonLabel="Checkout" onNavigate={onNavigate} target={{ name: 'checkout' }} />
    </section>
  );
}
