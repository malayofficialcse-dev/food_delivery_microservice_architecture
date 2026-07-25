import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { categories, products, restaurants } from '../data/appData';
import type { Page } from '../types';

type ProductsPageProps = {
  searchTerm: string;
  onAddToCart: (productId: string) => void;
  onNavigate: (page: Page) => void;
};

export function ProductsPage({ searchTerm, onAddToCart, onNavigate }: ProductsPageProps) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const restaurant = restaurants.find((item) => item.id === product.restaurantId);
    return [product.name, product.category, product.description, restaurant?.name].join(' ').toLowerCase().includes(normalizedSearch);
  });

  return (
    <section className="page-stack">
      <div className="page-title">
        <span className="section-kicker">All products</span>
        <h1>Menu items</h1>
        <p>Explore every dish available across partner restaurants and add favorites directly to your cart.</p>
      </div>
      <div className="filter-bar">
        <button className="secondary-button" type="button"><SlidersHorizontal size={16} /> Sort & filters</button>
        {categories.map((category) => <button className="chip" type="button" key={category}>{category}</button>)}
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => {
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
  );
}
