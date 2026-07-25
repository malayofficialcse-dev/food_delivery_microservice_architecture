import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2 } from 'lucide-react';
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
    <div className="cart-root">
      {/* Page header */}
      <div className="cart-page-header">
        <div>
          <span className="cart-page-tag">
            <ShoppingBag size={14} /> Your basket
          </span>
          <h1 className="cart-page-title">Your Cart</h1>
          <p className="cart-page-sub">
            {cart.length > 0
              ? `${cart.length} item${cart.length > 1 ? 's' : ''} ready for checkout`
              : 'Nothing here yet — start exploring!'}
          </p>
        </div>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-col">
          {cart.length > 0 ? (
            <div className="cart-items-list">
              {cart.map((line) => {
                const product = products.find((p) => p.id === line.productId);
                if (!product) return null;
                return (
                  <article className="cart-item-card" key={line.productId}>
                    <img src={product.image} alt={product.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <strong className="cart-item-name">{product.name}</strong>
                      <span className="cart-item-cat">{product.category}</span>
                      <span className="cart-item-unit">{currency.format(product.price)} each</span>
                    </div>
                    <div className="cart-item-right">
                      <strong className="cart-item-total">
                        {currency.format(product.price * line.quantity)}
                      </strong>
                      <div className="cart-qty-ctrl">
                        <button
                          className="cart-qty-btn"
                          type="button"
                          onClick={() => onDecrease(product.id)}
                        >
                          {line.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                        </button>
                        <strong>{line.quantity}</strong>
                        <button
                          className="cart-qty-btn"
                          type="button"
                          onClick={() => onAdd(product.id)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add delicious dishes from our restaurant partners to get started.</p>
              <button
                className="cart-empty-btn"
                type="button"
                onClick={() => onNavigate({ name: 'products' })}
              >
                Browse menu <ArrowRight size={16} />
              </button>
            </div>
          )}

          {cart.length > 0 && (
            <div className="cart-promo-strip">
              <Tag size={16} />
              <input className="cart-promo-input" placeholder="Enter promo code…" type="text" />
              <button className="cart-promo-apply" type="button">Apply</button>
            </div>
          )}
        </div>

        {/* Summary */}
        <CartSummary
          cart={cart}
          buttonLabel="Proceed to checkout"
          onNavigate={onNavigate}
          target={{ name: 'checkout' }}
        />
      </div>
    </div>
  );
}
