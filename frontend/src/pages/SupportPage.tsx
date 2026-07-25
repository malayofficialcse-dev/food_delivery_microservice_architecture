import { Headphones, Mail, MessageCircle, Phone } from 'lucide-react';

export function SupportPage() {
  return (
    <section className="page-stack">
      <div className="page-title">
        <span className="section-kicker">Help center</span>
        <h1>Support</h1>
        <p>Get help with orders, refunds, restaurant issues, delivery status, and account security.</p>
      </div>
      <div className="support-grid">
        <article className="support-card"><MessageCircle size={24} /><strong>Live chat</strong><span>Average wait: 2 minutes</span></article>
        <article className="support-card"><Phone size={24} /><strong>Call support</strong><span>Available 24/7</span></article>
        <article className="support-card"><Mail size={24} /><strong>Email ticket</strong><span>Reply inside 4 hours</span></article>
        <article className="support-card"><Headphones size={24} /><strong>Order assistance</strong><span>Refunds, missing items, delivery updates</span></article>
      </div>
    </section>
  );
}
