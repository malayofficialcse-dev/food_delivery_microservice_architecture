import { Clock, MapPin, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { currency, products, restaurants } from '../data/appData';
import type { Page } from '../types';

type RestaurantDetailPageProps = {
  restaurantId: string;
  onAddToCart: (productId: string) => void;
  onNavigate: (page: Page) => void;
};

export function RestaurantDetailPage({ restaurantId, onAddToCart, onNavigate }: RestaurantDetailPageProps) {
  const restaurant = restaurants.find((item) => item.id === restaurantId) ?? restaurants[0];
  const menu = products.filter((product) => product.restaurantId === restaurant.id);

  return (
    <section className="page-stack">
      <div className="restaurant-hero">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-hero-copy">
          <span className="section-kicker">{restaurant.cuisine}</span>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.tags.join(' | ')}</p>
          <div className="meta-row hero-meta">
            <span><Star size={15} /> {restaurant.rating}</span>
            <span><Clock size={15} /> {restaurant.eta}</span>
            <span><MapPin size={15} /> {restaurant.distance}</span>
            <span>{currency.format(restaurant.deliveryFee)} delivery</span>
          </div>
          <span className="offer-strip">{restaurant.offer}</span>
        </div>
      </div>
      <div className="section-header">
        <div>
          <span className="section-kicker">Menu</span>
          <h2>Recommended from this restaurant</h2>
        </div>
      </div>
      <div className="product-grid">
        {menu.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            restaurantName={restaurant.name}
            onAdd={onAddToCart}
            onOpen={(productId) => onNavigate({ name: 'product', productId })}
          />
        ))}
      </div>
    </section>
  );
}
