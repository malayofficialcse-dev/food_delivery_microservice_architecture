import { CreditCard, LockKeyhole, ShieldCheck, WalletCards } from 'lucide-react';
import { CartSummary } from '../components/CartSummary';
import type { CartLine, Page } from '../types';

export function PaymentPage({ cart, onNavigate }: { cart: CartLine[]; onNavigate: (page: Page) => void }) {
  return (
    <div className="cart-root">
      {/* Page Header */}
      <div className="cart-page-header">
        <div>
          <span className="cart-page-tag">
            <LockKeyhole size={14} /> Security
          </span>
          <h1 className="cart-page-title">Secure Payment</h1>
          <p className="cart-page-sub">
            Use a saved card, wallet, or add a new card for tokenized checkout.
          </p>
        </div>
      </div>

      <div className="cart-layout">
        {/* Form and Preview Column */}
        <div className="cart-items-col">
          <div className="payment-card-preview-fancy">
            <div className="card-top">
              <WalletCards size={32} />
              <span className="brand-badge">AzureEats Pay Platinum</span>
            </div>
            <div className="card-mid">
              <strong className="card-number">••••  ••••  ••••  2042</strong>
            </div>
            <div className="card-bottom">
              <div className="card-holder">
                <span className="label">CARD HOLDER</span>
                <span className="val">Malay Maity</span>
              </div>
              <div className="card-expiry">
                <span className="label">EXPIRES</span>
                <span className="val">09 / 29</span>
              </div>
            </div>
          </div>

          <div className="checkout-form-card">
            <div className="form-grid">
              <label className="checkout-label">
                <span>Card number</span>
                <div className="input-shell">
                  <CreditCard size={17} />
                  <input defaultValue="4242 4242 4242 2042" aria-label="Card number" />
                </div>
              </label>
              <label className="checkout-label">
                <span>Name on card</span>
                <div className="input-shell">
                  <input defaultValue="Malay Maity" aria-label="Name on card" />
                </div>
              </label>
              <label className="checkout-label">
                <span>Expiry</span>
                <div className="input-shell">
                  <input defaultValue="09 / 29" aria-label="Expiry" />
                </div>
              </label>
              <label className="checkout-label">
                <span>CVV</span>
                <div className="input-shell">
                  <LockKeyhole size={17} />
                  <input type="password" defaultValue="123" aria-label="CVV" />
                </div>
              </label>
            </div>
          </div>

          <div className="secure-note-banner">
            <ShieldCheck size={18} />
            <span>Payments are encrypted end-to-end and handled through the payment microservice.</span>
          </div>
        </div>

        {/* Summary Column */}
        <CartSummary cart={cart} buttonLabel="Place order" onNavigate={onNavigate} target={{ name: 'order', orderId: 'FD-2418' }} />
      </div>
    </div>
  );
}
