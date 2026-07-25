import { Filter } from 'lucide-react';
import { RestaurantCard } from '../components/RestaurantCard';
import { categories, restaurants } from '../data/appData';
import type { Page } from '../types';

export function RestaurantsPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="page-stack">
      <div className="page-title">
        <span className="section-kicker">Marketplace</span>
        <h1>Restaurants</h1>
        <p>Choose from high-rated restaurants with fast preparation times and clear delivery fees.</p>
      </div>
      <div className="filter-bar">
        <button className="secondary-button" type="button"><Filter size={16} /> Filters</button>
        {categories.map((category) => <button className="chip" type="button" key={category}>{category}</button>)}
      </div>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onOpen={(restaurantId) => onNavigate({ name: 'restaurant', restaurantId })} />
        ))}
      </div>
    </section>
  );
}
