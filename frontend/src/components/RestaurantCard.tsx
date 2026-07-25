import { Clock, MapPin, Star } from 'lucide-react';
import { currency } from '../data/appData';
import type { Restaurant } from '../types';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onOpen: (restaurantId: string) => void;
};

export function RestaurantCard({ restaurant, onOpen }: RestaurantCardProps) {
  return (
    <article className="restaurant-tile">
      <button className="restaurant-image-button" type="button" onClick={() => onOpen(restaurant.id)}>
        <img src={restaurant.image} alt={restaurant.name} />
      </button>
      <div className="restaurant-tile-body">
        <div className="card-title-row">
          <button className="text-link" type="button" onClick={() => onOpen(restaurant.id)}>{restaurant.name}</button>
          <span className="rating-pill"><Star size={14} /> {restaurant.rating}</span>
        </div>
        <p>{restaurant.cuisine}</p>
        <div className="meta-row">
          <span><Clock size={14} /> {restaurant.eta}</span>
          <span><MapPin size={14} /> {restaurant.distance}</span>
          <span>{currency.format(restaurant.deliveryFee)} delivery</span>
        </div>
        <span className="offer-strip">{restaurant.offer}</span>
      </div>
    </article>
  );
}
