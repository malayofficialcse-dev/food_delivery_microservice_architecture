import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Bike,
  ChevronRight,
  CreditCard,
  Flame,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Timer,
  TrendingUp,
  Zap,
  Check,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { RestaurantCard } from '../components/RestaurantCard';
import { foodOptions, restaurants, servicePromos } from '../data/appData';
import type { Page, Product } from '../types';

type HomePageProps = {
  onAddToCart: (productId: string) => void;
  onNavigate: (page: Page) => void;
  onSearch: (term: string) => void;
  products: Product[];
  loading: boolean;
  error: string | null;
};

const HERO_SLIDES = [
  {
    tag: '🎉 Limited time offer',
    title: 'Order food & groceries.',
    highlight: 'Delivered in 20 mins.',
    subtitle: 'From your favourite restaurants to your doorstep — fresh, fast, and flavourful every time.',
    cta: 'Explore restaurants',
    gradient: 'linear-gradient(135deg, #e8320a 0%, #f54e0a 40%, #ff7a2f 100%)',
    badge: '⚡ Fastest delivery',
  },
  {
    tag: '🍕 Weekend special',
    title: 'Discover new flavours.',
    highlight: 'Up to 60% off today.',
    subtitle: 'Try something new — hand-picked dishes from top chefs curated just for your cravings.',
    cta: 'Browse deals',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #9f40f0 40%, #c084fc 100%)',
    badge: '🔥 Hot deals',
  },
  {
    tag: '🛒 Grocery express',
    title: 'Grocery runs made easy.',
    highlight: 'Fresh in 15 minutes.',
    subtitle: 'Milk, veggies, essentials — stocked fresh daily and delivered to you before you miss them.',
    cta: 'Shop groceries',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 40%, #7dd3fc 100%)',
    badge: '🌿 Farm fresh',
  },
];

const TRUST_STATS = [
  { icon: Bike, value: '20 mins', label: 'Avg delivery' },
  { icon: ShieldCheck, value: '99.3%', label: 'On-time orders' },
  { icon: Star, value: '4.8★', label: 'App rating' },
  { icon: Zap, value: '5000+', label: 'Restaurants' },
];

export function HomePage({ onAddToCart, onNavigate, onSearch, products, loading, error }: HomePageProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [locationValue, setLocationValue] = useState('Microsoft City Center, Hyderabad');
  const [searchValue, setSearchValue] = useState('');

  // Interactive filters
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterRating, setFilterRating] = useState(false);
  const [filterETA, setFilterETA] = useState(false);
  const [filterFreeDelivery, setFilterFreeDelivery] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((s) => (s + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  // Helper search trigger
  const triggerSearch = (term: string) => {
    onSearch(term);
    onNavigate({ name: 'products' });
  };

  // Filter restaurants
  let filteredRestaurants = restaurants;
  if (filterVeg) {
    filteredRestaurants = filteredRestaurants.filter((r) => {
      const rProducts = products.filter((p) => p.restaurantId === r.id);
      return rProducts.some((p) => p.vegetarian);
    });
  }
  if (filterRating) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.rating >= 4.6);
  }
  if (filterETA) {
    filteredRestaurants = filteredRestaurants.filter((r) => {
      const minETA = parseInt(r.eta);
      return minETA <= 22; // Pasta Foundry and Northstar Burgers
    });
  }
  if (filterFreeDelivery) {
    filteredRestaurants = filteredRestaurants.filter(
      (r) => r.deliveryFee === 0 || r.offer.toLowerCase().includes('free')
    );
  }

  // Filter bestsellers
  let featured = products.filter((p) => p.bestseller);
  if (filterVeg) {
    featured = featured.filter((p) => p.vegetarian);
  }
  featured = featured.slice(0, 3);

  return (
    <div className="hp-root">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hp-hero" style={{ background: slide.gradient }}>
        {/* animated blobs */}
        <div className="hp-hero-blob hp-hero-blob1" />
        <div className="hp-hero-blob hp-hero-blob2" />

        <div className="hp-hero-content">
          <span className="hp-hero-eyebrow">
            <Sparkles size={14} /> {slide.tag}
          </span>
          <h1 className="hp-hero-title">
            {slide.title}
            <br />
            <span className="hp-hero-highlight">{slide.highlight}</span>
          </h1>
          <p className="hp-hero-sub">{slide.subtitle}</p>

          {/* search strip */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              triggerSearch(searchValue);
            }}
            className="hp-search-strip"
          >
            <div className="hp-search-loc">
              <MapPin size={18} className="hp-search-icon" />
              <input
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                placeholder="Enter delivery location"
                aria-label="Delivery location"
              />
            </div>
            <div className="hp-search-sep" />
            <div className="hp-search-q">
              <Search size={18} className="hp-search-icon" />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search biryani, burger, pizza…"
                aria-label="Search food"
              />
            </div>
            <button className="hp-search-btn" type="submit">
              <Search size={17} /> Search
            </button>
          </form>

          <div className="hp-hero-pills">
            {['Biryani', 'Pizza', 'Burger', 'Sushi', 'Desserts'].map((t) => (
              <button
                key={t}
                className="hp-hero-pill"
                type="button"
                onClick={() => triggerSearch(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* slide dots */}
        <div className="hp-hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hp-hero-dot ${i === activeSlide ? 'active' : ''}`}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActiveSlide(i)}
            />
          ))}
        </div>

        {/* floating badge */}
        <div className="hp-hero-badge">
          <span>{slide.badge}</span>
        </div>
      </section>

      {/* ─── TRUST STATS ────────────────────────────────────────────────────── */}
      <section className="hp-stats-row">
        {TRUST_STATS.map(({ icon: Icon, value, label }) => (
          <div className="hp-stat" key={label}>
            <div className="hp-stat-icon">
              <Icon size={22} />
            </div>
            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ─── SERVICE PROMOS ─────────────────────────────────────────────────── */}
      <section className="hp-promos">
        {servicePromos.map((promo, idx) => (
          <article
            className={`hp-promo hp-promo-${idx}`}
            key={promo.title}
            onClick={() => triggerSearch(promo.title === 'Instamart' ? 'grocery' : promo.title)}
            style={{ cursor: 'pointer' }}
          >
            <img src={promo.image} alt={promo.title} />
            <div className="hp-promo-overlay">
              <span className="hp-promo-kicker">{promo.subtitle}</span>
              <strong className="hp-promo-title">{promo.title}</strong>
              <div className="hp-promo-badge">
                <Tag size={13} /> {promo.offer}
              </div>
              <button className="hp-promo-cta" type="button">
                Order now <ArrowRight size={15} />
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* ─── FOOD CATEGORIES ─────────────────────────────────────────────────── */}
      <section className="hp-section">
        <div className="hp-section-head">
          <div>
            <span className="hp-section-tag">
              <TrendingUp size={14} /> What's trending
            </span>
            <h2 className="hp-section-title">What are you craving?</h2>
          </div>
        </div>
        <div className="hp-categories">
          {foodOptions.map((opt) => (
            <button
              className="hp-cat-card"
              key={opt.name}
              type="button"
              onClick={() => triggerSearch(opt.name)}
            >
              <div className="hp-cat-img-wrap">
                <img src={opt.image} alt={opt.name} />
              </div>
              <span>{opt.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── RESTAURANT SECTION ─────────────────────────────────────────────── */}
      <section className="hp-section">
        <div className="hp-section-head">
          <div>
            <span className="hp-section-tag">
              <Flame size={14} /> Top picks
            </span>
            <h2 className="hp-section-title">Best restaurants near you</h2>
          </div>
          <button
            className="hp-view-all"
            type="button"
            onClick={() => onNavigate({ name: 'restaurants' })}
          >
            View all <ChevronRight size={16} />
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="hp-filters-row">
          <button
            type="button"
            className={`hp-filter-pill ${filterVeg ? 'active' : ''}`}
            onClick={() => setFilterVeg(!filterVeg)}
          >
            {filterVeg && <Check size={12} />}
            🌿 Pure Veg
          </button>
          <button
            type="button"
            className={`hp-filter-pill ${filterRating ? 'active' : ''}`}
            onClick={() => setFilterRating(!filterRating)}
          >
            {filterRating && <Check size={12} />}
            ⭐ Rating 4.6+
          </button>
          <button
            type="button"
            className={`hp-filter-pill ${filterETA ? 'active' : ''}`}
            onClick={() => setFilterETA(!filterETA)}
          >
            {filterETA && <Check size={12} />}
            ⏱️ Fast Delivery (≤ 22m)
          </button>
          <button
            type="button"
            className={`hp-filter-pill ${filterFreeDelivery ? 'active' : ''}`}
            onClick={() => setFilterFreeDelivery(!filterFreeDelivery)}
          >
            {filterFreeDelivery && <Check size={12} />}
            🚚 Free Delivery
          </button>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="hp-restaurant-grid">
            {filteredRestaurants.slice(0, 4).map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                onOpen={(id) => onNavigate({ name: 'restaurant', restaurantId: id })}
              />
            ))}
          </div>
        ) : (
          <div className="hp-no-results-panel">
            <span className="hp-no-results-emoji">🍽️</span>
            <h3>No restaurants match your filters</h3>
            <p>Try resetting some filters to see available partner restaurants.</p>
            <button
              className="hp-reset-filters-btn"
              type="button"
              onClick={() => {
                setFilterVeg(false);
                setFilterRating(false);
                setFilterETA(false);
                setFilterFreeDelivery(false);
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* ─── BESTSELLERS ─────────────────────────────────────────────────────── */}
      <section className="hp-section hp-bestsellers-section">
        <div className="hp-section-head">
          <div>
            <span className="hp-section-tag hp-section-tag--hot">
              <Flame size={14} /> Bestsellers
            </span>
            <h2 className="hp-section-title">Dishes loved by thousands</h2>
          </div>
          <div className="hp-trust-badges">
            <span>
              <Bike size={14} /> Live ETA
            </span>
            <span>
              <ShieldCheck size={14} /> Verified kitchens
            </span>
            <span>
              <CreditCard size={14} /> Secure pay
            </span>
          </div>
        </div>
        
        {loading ? (
          <div className="hp-no-results-panel">
            <span className="hp-no-results-emoji">⏳</span>
            <h3>Loading menu items…</h3>
            <p>Fetching fresh dishes from the backend product service.</p>
          </div>
        ) : error ? (
          <div className="hp-no-results-panel">
            <span className="hp-no-results-emoji">⚠️</span>
            <h3>Unable to connect to the product service</h3>
            <p>{error}</p>
          </div>
        ) : featured.length > 0 ? (
          <div className="hp-product-grid">
            {featured.map((product) => {
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
          <div className="hp-no-results-panel">
            <span className="hp-no-results-emoji">🥗</span>
            <h3>No bestseller items match</h3>
            <p>Try toggling the "Pure Veg" filter off to see other bestsellers.</p>
          </div>
        )}

        <div className="hp-view-products-wrap">
          <button
            className="hp-view-products-btn"
            type="button"
            onClick={() => onNavigate({ name: 'products' })}
          >
            Explore all menu items <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ─── OFFER BANNER ────────────────────────────────────────────────────── */}
      <section className="hp-offer-banner">
        <div className="hp-offer-content">
          <span className="hp-offer-eyebrow">
            <Timer size={16} /> Today only
          </span>
          <h2 className="hp-offer-title">Get your first order 40% off</h2>
          <p>Use code <strong>WELCOME40</strong> at checkout. Valid on orders above $15.</p>
          <button className="hp-offer-btn" type="button" onClick={() => onNavigate({ name: 'products' })}>
            Claim offer <ArrowRight size={16} />
          </button>
        </div>
        <div className="hp-offer-visual">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
            alt="Delicious food offer"
          />
        </div>
      </section>
    </div>
  );
}
