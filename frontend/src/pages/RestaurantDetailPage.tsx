import { Clock, Flame, MapPin, Plus, ShieldCheck, Star, Tag, Utensils } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { currency, restaurants } from '../data/appData';
import type { Page, Product } from '../types';

type RestaurantDetailPageProps = {
  restaurantId: string;
  onAddToCart: (productId: string) => void;
  onNavigate: (page: Page) => void;
  products: Product[];
};

export function RestaurantDetailPage({ restaurantId, onAddToCart, onNavigate, products }: RestaurantDetailPageProps) {
  const restaurant = restaurants.find((r) => r.id === restaurantId) ?? restaurants[0];
  const menu = products.filter((p) => p.restaurantId === restaurant.id);

  return (
    <div className="rdp-root">
      {/* Hero */}
      <section className="rdp-hero">
        <img src={restaurant.image} alt={restaurant.name} className="rdp-hero-img" />
        <div className="rdp-hero-overlay" />
        <div className="rdp-hero-content">
          <span className="rdp-cuisine-tag">{restaurant.cuisine}</span>
          <h1 className="rdp-name">{restaurant.name}</h1>
          <div className="rdp-tags-row">
            {restaurant.tags.map((t) => (
              <span key={t} className="rdp-tag">{t}</span>
            ))}
          </div>
          <div className="rdp-meta-row">
            <span><Star size={15} fill="currentColor" /> {restaurant.rating}</span>
            <span><Clock size={15} /> {restaurant.eta}</span>
            <span><MapPin size={15} /> {restaurant.distance}</span>
            <span>{currency.format(restaurant.deliveryFee)} delivery</span>
          </div>
          <div className="rdp-offer-strip">
            <Tag size={13} /> {restaurant.offer}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="rdp-trust-strip">
        <span><ShieldCheck size={14} /> Verified kitchen</span>
        <span><Flame size={14} /> Live order tracking</span>
        <span><Utensils size={14} /> Fresh ingredients</span>
        <span><Plus size={14} /> {menu.length} items on menu</span>
      </div>

      {/* Menu */}
      <section className="rdp-menu-section">
        <div className="rdp-menu-head">
          <span className="rdp-menu-tag">📋 Menu</span>
          <h2 className="rdp-menu-title">Recommended from {restaurant.name}</h2>
        </div>
        <div className="rdp-product-grid">
          {menu.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              restaurantName={restaurant.name}
              onAdd={onAddToCart}
              onOpen={(id) => onNavigate({ name: 'product', productId: id })}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
