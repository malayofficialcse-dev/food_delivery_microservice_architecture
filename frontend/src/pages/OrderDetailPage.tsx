import { Bike, CheckCircle2, ChefHat, Home, PackageCheck } from 'lucide-react';
import { currency, orders } from '../data/appData';

export function OrderDetailPage({ orderId }: { orderId: string }) {
  const order = orders.find((item) => item.id === orderId) ?? orders[0];
  const steps = [
    { label: 'Confirmed', icon: CheckCircle2 },
    { label: 'Preparing', icon: ChefHat },
    { label: 'On the way', icon: Bike },
    { label: 'Delivered', icon: Home },
  ];

  return (
    <section className="page-stack">
      <div className="tracking-hero">
        <div>
          <span className="section-kicker">Tracking #{order.id}</span>
          <h1>{order.status === 'Delivered' ? 'Order delivered' : `Arriving in ${order.eta}`}</h1>
          <p>{order.restaurant} is handling your order. You will receive live status updates here.</p>
        </div>
        <strong>{currency.format(order.total)}</strong>
      </div>
      <div className="tracking-card">
        <div className="progress-track large"><span style={{ width: `${order.progress}%` }} /></div>
        <div className="tracking-steps">
          {steps.map(({ label, icon: Icon }, index) => (
            <article className={index <= Math.floor(order.progress / 34) ? 'active' : ''} key={label}>
              <Icon size={20} />
              <span>{label}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="panel">
        <div className="panel-heading compact">
          <div>
            <span className="section-kicker">Items</span>
            <h2>Order contents</h2>
          </div>
        </div>
        <div className="timeline">
          {order.items.map((item) => (
            <div className="timeline-item" key={item}>
              <PackageCheck size={16} />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
