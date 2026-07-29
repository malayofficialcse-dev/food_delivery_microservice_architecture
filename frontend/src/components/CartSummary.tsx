import { ArrowRight, BadgePercent } from 'lucide-react';
import { currency } from '../data/appData';
import { getCartSubtotal } from '../utils/cart';
import type { CartLine, Page, Product } from '../types';

type CartSummaryProps = {
  cart: CartLine[];
  buttonLabel: string;
  onNavigate: (page: Page) => void;
  target: Page;
  products: Product[];
};

export function CartSummary({ cart, buttonLabel, onNavigate, target, products }: CartSummaryProps) {
  const subtotal = getCartSubtotal(cart, products);
  const delivery = cart.length ? 2.99 : 0;
  const taxes = subtotal * 0.08;
  const discount = subtotal > 25 ? 4 : 0;
  const total = subtotal + delivery + taxes - discount;

  return (
    <aside className="summary-panel-premium">
      <div className="panel-heading">
        <span className="section-kicker">Summary</span>
        <h2>Order Bill</h2>
      </div>

      <div className="summary-lines">
        <div className="summary-line">
          <span>Subtotal</span>
          <strong>{currency.format(subtotal)}</strong>
        </div>
        <div className="summary-line">
          <span>Delivery fee</span>
          <strong>{currency.format(delivery)}</strong>
        </div>
        <div className="summary-line">
          <span>Taxes (8%)</span>
          <strong>{currency.format(taxes)}</strong>
        </div>
        {discount > 0 && (
          <div className="summary-line discount-line">
            <span className="saving">
              <BadgePercent size={15} /> Promo discount
            </span>
            <strong className="saving">-{currency.format(discount)}</strong>
          </div>
        )}
      </div>

      <div className="summary-total">
        <span>To Pay</span>
        <strong>{currency.format(total)}</strong>
      </div>

      <button
        className="summary-pay-btn"
        type="button"
        disabled={!cart.length}
        onClick={() => onNavigate(target)}
      >
        {buttonLabel}
        <ArrowRight size={17} />
      </button>
    </aside>
  );
}
