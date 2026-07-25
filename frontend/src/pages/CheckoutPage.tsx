import { Clock, Home, MapPin, MessageSquareText } from 'lucide-react';
import { CartSummary } from '../components/CartSummary';
import type { CartLine, Page } from '../types';

export function CheckoutPage({ cart, onNavigate }: { cart: CartLine[]; onNavigate: (page: Page) => void }) {
  return (
    <section className="checkout-layout">
      <div className="page-stack">
        <div className="page-title">
          <span className="section-kicker">Checkout</span>
          <h1>Delivery details</h1>
          <p>Confirm your address, schedule, contact number, and delivery instructions before payment.</p>
        </div>
        <div className="form-grid">
          <label>
            <span>Delivery address</span>
            <div className="input-shell"><MapPin size={17} /><input defaultValue="221B Azure Avenue, Sector 7" /></div>
          </label>
          <label>
            <span>Apartment or floor</span>
            <div className="input-shell"><Home size={17} /><input defaultValue="Tower B, Floor 12" /></div>
          </label>
          <label>
            <span>Delivery time</span>
            <div className="input-shell"><Clock size={17} /><input defaultValue="As soon as possible" /></div>
          </label>
          <label>
            <span>Instructions</span>
            <div className="input-shell"><MessageSquareText size={17} /><input defaultValue="Call on arrival" /></div>
          </label>
        </div>
        <div className="checkout-stepper">
          <span className="active">Cart</span>
          <span className="active">Address</span>
          <span>Payment</span>
          <span>Tracking</span>
        </div>
      </div>
      <CartSummary cart={cart} buttonLabel="Continue to payment" onNavigate={onNavigate} target={{ name: 'payment' }} />
    </section>
  );
}
