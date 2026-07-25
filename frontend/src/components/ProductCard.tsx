import { Flame, Plus, Star } from 'lucide-react';
import { currency } from '../data/appData';
import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
  restaurantName: string;
  onAdd: (productId: string) => void;
  onOpen: (productId: string) => void;
};

export function ProductCard({ product, restaurantName, onAdd, onOpen }: ProductCardProps) {
  return (
    <article className="pcard">
      <button className="pcard-img-btn" type="button" onClick={() => onOpen(product.id)}>
        <img src={product.image} alt={product.name} className="pcard-img" />
        {product.bestseller && (
          <span className="pcard-bestseller-badge">
            <Flame size={12} /> Bestseller
          </span>
        )}
        {product.vegetarian && <span className="pcard-veg-dot" title="Vegetarian" />}
      </button>

      <div className="pcard-body">
        <div className="pcard-top-row">
          <div className="pcard-rating">
            <Star size={12} fill="currentColor" /> {product.rating}
          </div>
          <span className="pcard-calories">{product.calories} cal</span>
        </div>

        <button className="pcard-name" type="button" onClick={() => onOpen(product.id)}>
          {product.name}
        </button>
        <p className="pcard-desc">{product.description}</p>

        <div className="pcard-restaurant">{restaurantName}</div>

        <div className="pcard-footer">
          <span className="pcard-price">{currency.format(product.price)}</span>
          <button className="pcard-add-btn" type="button" onClick={() => onAdd(product.id)}>
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
