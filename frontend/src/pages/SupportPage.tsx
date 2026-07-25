import { Headphones, Mail, MessageCircle, Phone, Sparkles } from 'lucide-react';

export function SupportPage() {
  return (
    <div className="support-root">
      {/* Header */}
      <div className="cart-page-header">
        <div>
          <span className="cart-page-tag">
            <Sparkles size={14} /> 24/7 Assistance
          </span>
          <h1 className="cart-page-title">Help Center</h1>
          <p className="cart-page-sub">
            Get help with active orders, refunds, payment options, and account security.
          </p>
        </div>
      </div>

      {/* Grid of options */}
      <div className="support-cards-grid">
        <div className="support-card-fancy">
          <div className="icon-box">
            <MessageCircle size={28} />
          </div>
          <h3>Live Chat</h3>
          <p>Instant messaging with our support engineers.</p>
          <span className="status-label">Average wait: 2 mins</span>
        </div>

        <div className="support-card-fancy">
          <div className="icon-box">
            <Phone size={28} />
          </div>
          <h3>Call Support</h3>
          <p>Talk directly with our regional dispatchers.</p>
          <span className="status-label">Available 24/7</span>
        </div>

        <div className="support-card-fancy">
          <div className="icon-box">
            <Mail size={28} />
          </div>
          <h3>Email Ticket</h3>
          <p>Open a support ticket with attachments.</p>
          <span className="status-label">Reply inside 4 hours</span>
        </div>

        <div className="support-card-fancy">
          <div className="icon-box">
            <Headphones size={28} />
          </div>
          <h3>Order Assistance</h3>
          <p>Refund requests or reports for missing items.</p>
          <span className="status-label">Self-service support</span>
        </div>
      </div>
    </div>
  );
}
