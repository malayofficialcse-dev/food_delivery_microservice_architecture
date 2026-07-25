import { ArrowRight, Bike, CreditCard, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { RestaurantCard } from '../components/RestaurantCard';
import { foodOptions, products, restaurants, servicePromos } from '../data/appData';
import type { Page } from '../types';

type HomePageProps = {
  onAddToCart: (productId: string) => void;
  onNavigate: (page: Page) => void;
};

export function HomePage({ onAddToCart, onNavigate }: HomePageProps) {
  const featured = products.filter((product) => product.bestseller).slice(0, 3);

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="eyebrow">
            <Sparkles size={16} /> Best restaurants, groceries, and quick delivery
          </span>
          <h1>Order food & groceries. Discover best restaurants. Swiggy it!</h1>
          <p>Find fresh meals, instant grocery delivery, and dine-out offers all in one place with fast, trusted delivery.</p>

          <div className="hero-search-grid">
            <div className="hero-search-input">
              <MapPin size={18} />
              <input type="text" placeholder="Enter your delivery location" aria-label="Delivery location" />
            </div>
            <div className="hero-search-input hero-search-action">
              <input type="text" placeholder="Search for restaurant, item or more" aria-label="Search food" />
              <button className="primary-button" type="button">Search</button>
            </div>
          </div>
        </div>

        <div className="hero-preview">
          <img src={servicePromos[0].image} alt="Food delivery preview" />
          <div className="hero-preview-copy">
            <strong>Enjoy home delivery from top kitchens near you.</strong>
            <span>Fresh menu items, restaurant offers, and instant checkout.</span>
          </div>
        </div>
      </section>

      <section className="service-card-grid">
        {servicePromos.map((promo) => (
          <article className="service-card" key={promo.title}>
            <img src={promo.image} alt={promo.title} />
            <div>
              <span className="section-kicker">{promo.subtitle}</span>
              <strong>{promo.title}</strong>
              <p>{promo.offer}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="category-grid">
        {foodOptions.map((option) => (
          <article className="category-card" key={option.name}>
            <img src={option.image} alt={option.name} />
            <span>{option.name}</span>
          </article>
        ))}
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="section-kicker">Discover</span>
            <h2>Best restaurants on Dineout</h2>
          </div>
          <button className="small-button" type="button" onClick={() => onNavigate({ name: 'restaurants' })}>View all</button>
        </div>
        <div className="restaurant-grid">
          {restaurants.slice(0, 4).map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} onOpen={(restaurantId) => onNavigate({ name: 'restaurant', restaurantId })} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="section-kicker">Popular now</span>
            <h2>Bestseller dishes</h2>
          </div>
          <div className="trust-row">
            <span><Bike size={15} /> Live ETA</span>
            <span><ShieldCheck size={15} /> Verified kitchens</span>
            <span><CreditCard size={15} /> Secure pay</span>
          </div>
        </div>
        <div className="product-grid">
          {featured.map((product) => {
            const restaurant = restaurants.find((item) => item.id === product.restaurantId);
            return (
              <ProductCard
                key={product.id}
                product={product}
                restaurantName={restaurant?.name ?? 'Restaurant'}
                onAdd={onAddToCart}
                onOpen={(productId) => onNavigate({ name: 'product', productId })}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
