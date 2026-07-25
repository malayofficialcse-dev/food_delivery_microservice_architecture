import { Clock, Home, MapPin, MessageSquareText } from 'lucide-react';
import { CartSummary } from '../components/CartSummary';
import type { CartLine, Page } from '../types';

export function CheckoutPage({ cart, onNavigate }: { cart: CartLine[]; onNavigate: (page: Page) => void }) {
  return (
    <div className="cart-root">
      {/* Page Header */}
      <div className="cart-page-header">
        <div>
          <span className="cart-page-tag">
            <MapPin size={14} /> Checkout
          </span>
          <h1 className="cart-page-title">Delivery details</h1>
          <p className="cart-page-sub">
            Confirm your address, schedule, contact number, and delivery instructions before payment.
          </p>
        </div>
      </div>

      <div className="cart-layout">
        {/* Form Column */}
        <div className="cart-items-col">
          <div className="checkout-form-card">
            <div className="form-grid">
              <label className="checkout-label">
                <span>Delivery address</span>
                <div className="input-shell">
                  <MapPin size={17} />
                  <input defaultValue="221B Azure Avenue, Sector 7" aria-label="Delivery address" />
                </div>
              </label>
              <label className="checkout-label">
                <span>Apartment or floor</span>
                <div className="input-shell">
                  <Home size={17} />
                  <input defaultValue="Tower B, Floor 12" aria-label="Apartment or floor" />
                </div>
              </label>
              <label className="checkout-label">
                <span>Delivery time</span>
                <div className="input-shell">
                  <Clock size={17} />
                  <input defaultValue="As soon as possible (20-30 mins)" aria-label="Delivery time" />
                </div>
              </label>
              <label className="checkout-label">
                <span>Instructions for Rider</span>
                <div className="input-shell">
                  <MessageSquareText size={17} />
                  <input defaultValue="Call on arrival, leave at reception" aria-label="Instructions" />
                </div>
              </label>
            </div>
          </div>

          <div className="checkout-stepper">
            <span className="active">1. Cart</span>
            <span className="active">2. Address</span>
            <span>3. Payment</span>
            <span>4. Tracking</span>
          </div>
        </div>

        {/* Summary Column */}
        <CartSummary cart={cart} buttonLabel="Continue to payment" onNavigate={onNavigate} target={{ name: 'payment' }} />
      </div>
    </div>
  );
}
