import { ArrowRight, PackageCheck } from 'lucide-react';
import { currency, orders } from '../data/appData';
import type { Page } from '../types';

export function OrdersPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="page-stack">
      <div className="page-title">
        <span className="section-kicker">Order history</span>
        <h1>Your orders</h1>
        <p>Track active orders and review your previous deliveries.</p>
      </div>
      <div className="order-list">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <PackageCheck size={22} />
            <div>
              <strong>#{order.id}</strong>
              <span>{order.restaurant}</span>
              <small>{order.items.join(', ')}</small>
            </div>
            <div>
              <strong>{currency.format(order.total)}</strong>
              <span>{order.status}</span>
            </div>
            <button className="small-button" type="button" onClick={() => onNavigate({ name: 'order', orderId: order.id })}>
              Track <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
