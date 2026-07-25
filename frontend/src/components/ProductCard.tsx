import { Plus, Star } from 'lucide-react';
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
    <article className="product-card">
      <button className="product-image-button" type="button" onClick={() => onOpen(product.id)}>
        <img src={product.image} alt={product.name} />
      </button>
      <div className="product-card-body">
        <div className="card-title-row">
          <button className="text-link" type="button" onClick={() => onOpen(product.id)}>{product.name}</button>
          <strong>{currency.format(product.price)}</strong>
        </div>
        <p>{product.description}</p>
        <div className="meta-row">
          <span><Star size={14} /> {product.rating}</span>
          <span>{restaurantName}</span>
          {product.vegetarian ? <span>Veg</span> : null}
        </div>
        <button className="add-button" type="button" onClick={() => onAdd(product.id)}>
          <Plus size={16} /> Add
        </button>
      </div>
    </article>
  );
}
