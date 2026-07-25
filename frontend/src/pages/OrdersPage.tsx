import { ArrowRight, Calendar, Package, Receipt } from 'lucide-react';
import { currency, orders } from '../data/appData';
import type { Page } from '../types';

export function OrdersPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="orders-root">
      {/* Header */}
      <div className="cart-page-header">
        <div>
          <span className="cart-page-tag">
            <Package size={14} /> Tracking portal
          </span>
          <h1 className="cart-page-title">Your Orders</h1>
          <p className="cart-page-sub">
            Track active deliveries, request assistance, or view past receipts.
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-container">
        {orders.map((order) => {
          const isPreparing = order.status === 'Preparing';
          return (
            <article className={`order-card-premium ${isPreparing ? 'active-delivery' : ''}`} key={order.id}>
              {/* Top Row: Restaurant Name & Status */}
              <div className="order-header-row">
                <div className="restaurant-info">
                  <h2>{order.restaurant}</h2>
                  <div className="order-meta-info">
                    <span><Calendar size={13} /> {order.placedAt}</span>
                    <span><Receipt size={13} /> ID: #{order.id}</span>
                  </div>
                </div>
                <div className={`status-pill ${isPreparing ? 'preparing' : 'delivered'}`}>
                  <span className="dot" />
                  {order.status}
                </div>
              </div>

              {/* Middle Row: Items List */}
              <div className="order-items-row">
                <span className="label">ITEMS DETAILED</span>
                <p>{order.items.join(', ')}</p>
              </div>

              {/* Bottom Row: Price & Actions */}
              <div className="order-footer-row">
                <div className="total-column">
                  <span className="label">TOTAL PAID</span>
                  <strong>{currency.format(order.total)}</strong>
                </div>
                <button
                  className={`order-action-btn ${isPreparing ? 'btn-highlight' : ''}`}
                  type="button"
                  onClick={() => onNavigate({ name: 'order', orderId: order.id })}
                >
                  {isPreparing ? 'Track Live Order' : 'View Details'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
