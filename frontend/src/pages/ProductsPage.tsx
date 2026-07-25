import { useState } from 'react';
import { Flame, LayoutGrid, LayoutList, Search, SlidersHorizontal, Star, Zap } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { categories, products, restaurants } from '../data/appData';
import type { Page } from '../types';

type ProductsPageProps = {
  searchTerm: string;
  onAddToCart: (productId: string) => void;
  onNavigate: (page: Page) => void;
};

const SORT_OPTIONS = ['Popular', 'Rating', 'Price: Low to High', 'Price: High to Low'];

export function ProductsPage({ searchTerm, onAddToCart, onNavigate }: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('Popular');
  const [gridView, setGridView] = useState(true);
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = localSearch || searchTerm;
  const normalizedSearch = effectiveSearch.trim().toLowerCase();

  let filteredProducts = products.filter((product) => {
    const restaurant = restaurants.find((r) => r.id === product.restaurantId);
    const matchesSearch = [product.name, product.category, product.description, restaurant?.name]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch);
    const matchesCategory =
      activeCategory === 'All' || product.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  if (activeSort === 'Rating') filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  if (activeSort === 'Price: Low to High') filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  if (activeSort === 'Price: High to Low') filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);

  return (
    <div className="pp-root">
      {/* ─── HERO BANNER ─────────────────────────────────────────────────────── */}
      <section className="pp-hero">
        <div className="pp-hero-blob" />
        <div className="pp-hero-content">
          <span className="pp-hero-tag">
            <Flame size={14} /> Explore our menu
          </span>
          <h1 className="pp-hero-title">All Menu Items</h1>
          <p className="pp-hero-sub">
            {filteredProducts.length} dishes from{' '}
            <strong>{restaurants.length} partner restaurants</strong> — fresh, fast, flavourful.
          </p>
        </div>
        <div className="pp-hero-search">
          <Search size={18} />
          <input
            placeholder="Search biryani, pizza, pasta…"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            aria-label="Search products"
          />
          {localSearch && (
            <button className="pp-search-clear" type="button" onClick={() => setLocalSearch('')}>
              ✕
            </button>
          )}
        </div>
      </section>

      {/* ─── FILTERS + SORT ──────────────────────────────────────────────────── */}
      <div className="pp-controls">
        <div className="pp-cats">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pp-cat-chip ${activeCategory === cat ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="pp-sort-row">
          <SlidersHorizontal size={16} />
          <select
            className="pp-sort-select"
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <div className="pp-grid-toggle">
            <button
              className={`pp-toggle-btn ${gridView ? 'active' : ''}`}
              type="button"
              onClick={() => setGridView(true)}
              aria-label="Grid view"
            >
              <LayoutGrid size={17} />
            </button>
            <button
              className={`pp-toggle-btn ${!gridView ? 'active' : ''}`}
              type="button"
              onClick={() => setGridView(false)}
              aria-label="List view"
            >
              <LayoutList size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── RESULTS COUNT ───────────────────────────────────────────────────── */}
      <div className="pp-results-meta">
        <span>
          <Star size={14} /> Showing <strong>{filteredProducts.length}</strong> items
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          {normalizedSearch ? ` for "${effectiveSearch}"` : ''}
        </span>
        {activeSort !== 'Popular' && (
          <span className="pp-sort-active">
            <Zap size={13} /> Sorted by: {activeSort}
          </span>
        )}
      </div>

      {/* ─── PRODUCT GRID ────────────────────────────────────────────────────── */}
      {filteredProducts.length > 0 ? (
        <div className={gridView ? 'pp-grid' : 'pp-list'}>
          {filteredProducts.map((product) => {
            const restaurant = restaurants.find((r) => r.id === product.restaurantId);
            return (
              <ProductCard
                key={product.id}
                product={product}
                restaurantName={restaurant?.name ?? 'Restaurant'}
                onAdd={onAddToCart}
                onOpen={(id) => onNavigate({ name: 'product', productId: id })}
              />
            );
          })}
        </div>
      ) : (
        <div className="pp-empty">
          <div className="pp-empty-icon">🍽️</div>
          <h3>No dishes found</h3>
          <p>Try a different search or category filter.</p>
          <button
            className="pp-empty-reset"
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setLocalSearch('');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
