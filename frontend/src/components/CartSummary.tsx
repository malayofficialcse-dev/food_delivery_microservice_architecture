import { ArrowRight, BadgePercent } from 'lucide-react';
import { currency, products } from '../data/appData';
import { getCartSubtotal } from '../utils/cart';
import type { CartLine, Page } from '../types';

type CartSummaryProps = {
  cart: CartLine[];
  buttonLabel: string;
  onNavigate: (page: Page) => void;
  target: Page;
};

export function CartSummary({ cart, buttonLabel, onNavigate, target }: CartSummaryProps) {
  const subtotal = getCartSubtotal(cart, products);
  const delivery = cart.length ? 2.99 : 0;
  const taxes = subtotal * 0.08;
  const discount = subtotal > 25 ? 4 : 0;
  const total = subtotal + delivery + taxes - discount;

  return (
    <aside className="summary-panel">
      <div className="panel-heading compact">
        <div>
          <span className="section-kicker">Order summary</span>
          <h2>Payment total</h2>
        </div>
      </div>
      <div className="summary-lines">
        <span>Subtotal <strong>{currency.format(subtotal)}</strong></span>
        <span>Delivery <strong>{currency.format(delivery)}</strong></span>
        <span>Taxes <strong>{currency.format(taxes)}</strong></span>
        <span className="saving"><BadgePercent size={15} /> Promo saving <strong>-{currency.format(discount)}</strong></span>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <strong>{currency.format(total)}</strong>
      </div>
      <button className="primary-button full-button" type="button" disabled={!cart.length} onClick={() => onNavigate(target)}>
        {buttonLabel} <ArrowRight size={17} />
      </button>
    </aside>
  );
}
