import { Clock, MapPin, Star, Tag } from 'lucide-react';
import { currency } from '../data/appData';
import type { Restaurant } from '../types';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onOpen: (restaurantId: string) => void;
};

export function RestaurantCard({ restaurant, onOpen }: RestaurantCardProps) {
  return (
    <article className="rcard" onClick={() => onOpen(restaurant.id)} role="button" tabIndex={0}>
      <div className="rcard-img-wrap">
        <img src={restaurant.image} alt={restaurant.name} className="rcard-img" />
        <div className="rcard-img-overlay" />
        <div className="rcard-top-badges">
          <span className="rcard-offer-badge">
            <Tag size={12} /> {restaurant.offer}
          </span>
        </div>
        <div className="rcard-rating-badge">
          <Star size={13} fill="currentColor" /> {restaurant.rating}
        </div>
      </div>

      <div className="rcard-body">
        <h3 className="rcard-name">{restaurant.name}</h3>
        <p className="rcard-cuisine">{restaurant.cuisine}</p>

        <div className="rcard-tags">
          {restaurant.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rcard-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="rcard-meta">
          <span>
            <Clock size={13} /> {restaurant.eta}
          </span>
          <span>
            <MapPin size={13} /> {restaurant.distance}
          </span>
          <span className="rcard-fee">{currency.format(restaurant.deliveryFee)} delivery</span>
        </div>
      </div>
    </article>
  );
}
