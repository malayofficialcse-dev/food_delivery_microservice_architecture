import { Bike, CheckCircle2, ChefHat, Home, MapPin, PackageCheck, Receipt, Sparkles } from 'lucide-react';
import { currency, orders } from '../data/appData';

export function OrderDetailPage({ orderId }: { orderId: string }) {
  const order = orders.find((item) => item.id === orderId) ?? orders[0];
  const steps = [
    { label: 'Order Confirmed', desc: 'Kitchen accepted', icon: CheckCircle2 },
    { label: 'Preparing', desc: 'Chefs are cooking', icon: ChefHat },
    { label: 'On The Way', desc: 'Rider picked up', icon: Bike },
    { label: 'Delivered', desc: 'Enjoy your meal!', icon: Home },
  ];

  const currentStepIndex = Math.floor(order.progress / 34);

  return (
    <div className="order-detail-root">
      {/* Tracking Hero Banner */}
      <section className="tracking-hero-premium">
        <div className="hero-left">
          <span className="tracking-badge">
            <Sparkles size={14} /> LIVE TRACKING
          </span>
          <h1>{order.status === 'Delivered' ? 'Order Completed' : `Arriving in ${order.eta}`}</h1>
          <p className="sub">#{order.id} from <strong>{order.restaurant}</strong> is being prepared with priority care.</p>
        </div>
        <div className="hero-right">
          <span className="price-tag">{currency.format(order.total)}</span>
        </div>
      </section>

      {/* Map or Delivery Progress Section */}
      <div className="tracking-content-grid">
        {/* Progress card */}
        <div className="progress-card-premium">
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${order.progress}%` }} />
          </div>

          <div className="timeline-steps">
            {steps.map(({ label, desc, icon: Icon }, index) => {
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              return (
                <div key={label} className={`timeline-step-col ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="step-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <strong className="step-label">{label}</strong>
                  <span className="step-desc">{desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Address and contents card */}
        <div className="order-summary-panel-premium">
          <div className="summary-section">
            <h3><MapPin size={17} /> Delivery Address</h3>
            <p>221B Azure Avenue, Sector 7, Tower B, Floor 12</p>
          </div>

          <div className="summary-section">
            <h3><PackageCheck size={17} /> Order Contents</h3>
            <div className="order-items-detail-list">
              {order.items.map((item) => (
                <div className="detail-item-line" key={item}>
                  <Receipt size={14} />
                  <span>{item}</span>
                  <strong className="qty-tag">x1</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
