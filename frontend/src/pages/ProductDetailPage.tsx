import { ArrowRight, Flame, Minus, Plus, ShieldCheck, Star, Tag } from 'lucide-react';
import { currency, products, restaurants } from '../data/appData';
import type { Page } from '../types';

type ProductDetailPageProps = {
  productId: string;
  quantity: number;
  onAddToCart: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onNavigate: (page: Page) => void;
};

export function ProductDetailPage({ productId, quantity, onAddToCart, onDecrease, onNavigate }: ProductDetailPageProps) {
  const product = products.find((p) => p.id === productId) ?? products[0];
  const restaurant = restaurants.find((r) => r.id === product.restaurantId) ?? restaurants[0];
  const suggestions = products.filter((p) => p.restaurantId === restaurant.id && p.id !== product.id);

  return (
    <div className="pdp-root">
      {/* Main detail card */}
      <section className="pdp-hero">
        <div className="pdp-img-wrap">
          <img src={product.image} alt={product.name} className="pdp-img" />
          {product.bestseller && (
            <span className="pdp-bestseller"><Flame size={13} /> Bestseller</span>
          )}
          {product.vegetarian && <span className="pdp-veg-badge">🌿 Veg</span>}
        </div>

        <div className="pdp-info">
          <button
            className="pdp-restaurant-link"
            type="button"
            onClick={() => onNavigate({ name: 'restaurant', restaurantId: restaurant.id })}
          >
            {restaurant.name} →
          </button>
          <h1 className="pdp-title">{product.name}</h1>
          <p className="pdp-desc">{product.description}</p>

          <div className="pdp-badges">
            <span className="pdp-badge pdp-badge-rating"><Star size={13} fill="currentColor" /> {product.rating}</span>
            <span className="pdp-badge">{product.category}</span>
            <span className="pdp-badge">{product.calories} cal</span>
            {product.vegetarian && <span className="pdp-badge pdp-badge-veg">Vegetarian</span>}
          </div>

          <div className="pdp-price-row">
            <strong className="pdp-price">{currency.format(product.price)}</strong>
            {product.bestseller && (
              <span className="pdp-hot-tag"><Tag size={12} /> High demand</span>
            )}
          </div>

          {/* Quantity & add */}
          <div className="pdp-qty-row">
            <div className="pdp-qty-ctrl">
              <button className="pdp-qty-btn" type="button" onClick={() => onDecrease(product.id)}>
                <Minus size={16} />
              </button>
              <strong className="pdp-qty-val">{quantity}</strong>
              <button className="pdp-qty-btn" type="button" onClick={() => onAddToCart(product.id)}>
                <Plus size={16} />
              </button>
            </div>
            <button className="pdp-add-btn" type="button" onClick={() => onAddToCart(product.id)}>
              <Plus size={16} /> Add to cart — {currency.format(product.price * Math.max(quantity, 1))}
            </button>
          </div>

          <div className="pdp-secure-note">
            <ShieldCheck size={16} /> Prepared by verified kitchens · Live order tracking
          </div>
        </div>
      </section>

      {/* You might also like */}
      {suggestions.length > 0 && (
        <section className="pdp-suggestions">
          <div className="pdp-sug-head">
            <span className="pdp-sug-tag">🍽️ From {restaurant.name}</span>
            <h2 className="pdp-sug-title">Pair it with</h2>
          </div>
          <div className="pdp-sug-grid">
            {suggestions.map((item) => (
              <article className="pdp-sug-card" key={item.id}>
                <button
                  className="pdp-sug-img-btn"
                  type="button"
                  onClick={() => onNavigate({ name: 'product', productId: item.id })}
                >
                  <img src={item.image} alt={item.name} />
                </button>
                <div className="pdp-sug-body">
                  <strong className="pdp-sug-name">{item.name}</strong>
                  <span className="pdp-sug-price">{currency.format(item.price)}</span>
                  <button
                    className="pdp-sug-view"
                    type="button"
                    onClick={() => onNavigate({ name: 'product', productId: item.id })}
                  >
                    View <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
