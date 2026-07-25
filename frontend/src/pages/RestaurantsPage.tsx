import { useState } from 'react';
import { MapPin, Search, SlidersHorizontal, Star, Zap } from 'lucide-react';
import { RestaurantCard } from '../components/RestaurantCard';
import { categories, restaurants } from '../data/appData';
import type { Page } from '../types';

const SORT_OPTIONS = ['Popular', 'Rating: High to Low', 'Delivery Time', 'Delivery Fee'];

export function RestaurantsPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('Popular');
  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLowerCase();
  let filtered = restaurants.filter((r) => {
    const matchSearch = [r.name, r.cuisine, ...r.tags].join(' ').toLowerCase().includes(normalizedSearch);
    const matchCat = activeCategory === 'All' || r.cuisine.toLowerCase().includes(activeCategory.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()));
    return matchSearch && matchCat;
  });

  if (activeSort === 'Rating: High to Low') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (activeSort === 'Delivery Time') filtered = [...filtered].sort((a, b) => parseInt(a.eta) - parseInt(b.eta));
  if (activeSort === 'Delivery Fee') filtered = [...filtered].sort((a, b) => a.deliveryFee - b.deliveryFee);

  return (
    <div className="rp-root">
      {/* Hero */}
      <section className="rp-hero">
        <div className="rp-hero-blob" />
        <div className="rp-hero-content">
          <span className="rp-hero-tag">
            <MapPin size={14} /> Restaurants near you
          </span>
          <h1 className="rp-hero-title">Top Restaurants</h1>
          <p className="rp-hero-sub">
            {restaurants.length} high-rated restaurants — fast prep times, clear delivery fees.
          </p>
          <div className="rp-hero-search">
            <Search size={18} />
            <input
              placeholder="Search cuisine, restaurant…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search restaurants"
            />
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="rp-controls">
        <div className="rp-cats">
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
        <div className="rp-sort-row">
          <SlidersHorizontal size={16} />
          <select
            className="pp-sort-select"
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Results meta */}
      <div className="pp-results-meta">
        <span>
          <Star size={14} /> Showing <strong>{filtered.length}</strong> restaurants
        </span>
        {activeSort !== 'Popular' && (
          <span className="pp-sort-active"><Zap size={13} /> {activeSort}</span>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="rp-grid">
          {filtered.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onOpen={(id) => onNavigate({ name: 'restaurant', restaurantId: id })}
            />
          ))}
        </div>
      ) : (
        <div className="pp-empty">
          <div className="pp-empty-icon">🍴</div>
          <h3>No restaurants found</h3>
          <p>Try a different search or filter.</p>
          <button className="pp-empty-reset" type="button" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
