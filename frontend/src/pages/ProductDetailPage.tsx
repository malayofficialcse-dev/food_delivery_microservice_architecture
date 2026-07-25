import { Minus, Plus, ShieldCheck, Star } from 'lucide-react';
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
  const product = products.find((item) => item.id === productId) ?? products[0];
  const restaurant = restaurants.find((item) => item.id === product.restaurantId) ?? restaurants[0];
  const suggestions = products.filter((item) => item.restaurantId === restaurant.id && item.id !== product.id);

  return (
    <section className="page-stack">
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="product-detail-copy">
          <span className="section-kicker">{restaurant.name}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="meta-row hero-meta">
            <span><Star size={15} /> {product.rating}</span>
            <span>{product.category}</span>
            <span>{product.calories} cal</span>
            {product.vegetarian ? <span>Vegetarian</span> : null}
          </div>
          <strong className="detail-price">{currency.format(product.price)}</strong>
          <div className="quantity-panel">
            <button className="icon-button" type="button" onClick={() => onDecrease(product.id)}><Minus size={16} /></button>
            <strong>{quantity}</strong>
            <button className="icon-button" type="button" onClick={() => onAddToCart(product.id)}><Plus size={16} /></button>
            <button className="primary-button" type="button" onClick={() => onAddToCart(product.id)}>Add to cart</button>
          </div>
          <div className="secure-note"><ShieldCheck size={17} /> Prepared by verified kitchens with live order tracking.</div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="section-kicker">More from {restaurant.name}</span>
            <h2>Pair it with</h2>
          </div>
        </div>
        <div className="product-grid">
          {suggestions.map((item) => (
            <article className="compact-product" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>{currency.format(item.price)}</span>
              </div>
              <button className="small-button" type="button" onClick={() => onNavigate({ name: 'product', productId: item.id })}>View</button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
