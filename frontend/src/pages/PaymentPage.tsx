import { CreditCard, LockKeyhole, ShieldCheck, WalletCards } from 'lucide-react';
import { CartSummary } from '../components/CartSummary';
import type { CartLine, Page } from '../types';

export function PaymentPage({ cart, onNavigate }: { cart: CartLine[]; onNavigate: (page: Page) => void }) {
  return (
    <section className="checkout-layout">
      <div className="page-stack">
        <div className="page-title">
          <span className="section-kicker">Payment</span>
          <h1>Secure payment</h1>
          <p>Use a saved card, wallet, or add a new card for tokenized checkout.</p>
        </div>
        <div className="payment-card-preview">
          <div>
            <WalletCards size={28} />
            <span>AzureEats Pay</span>
          </div>
          <strong>4242 4242 4242 2042</strong>
          <small>Malay Maity  •  09/29</small>
        </div>
        <div className="form-grid">
          <label>
            <span>Card number</span>
            <div className="input-shell"><CreditCard size={17} /><input defaultValue="4242 4242 4242 2042" /></div>
          </label>
          <label>
            <span>Name on card</span>
            <div className="input-shell"><input defaultValue="Malay Maity" /></div>
          </label>
          <label>
            <span>Expiry</span>
            <div className="input-shell"><input defaultValue="09 / 29" /></div>
          </label>
          <label>
            <span>CVV</span>
            <div className="input-shell"><LockKeyhole size={17} /><input defaultValue="123" /></div>
          </label>
        </div>
        <div className="secure-note"><ShieldCheck size={17} /> Payments are encrypted and handled through the payment microservice.</div>
      </div>
      <CartSummary cart={cart} buttonLabel="Place order" onNavigate={onNavigate} target={{ name: 'order', orderId: 'FD-2418' }} />
    </section>
  );
}
