import {
  Bell,
  Headphones,
  Home,
  LogIn,
  Moon,
  PackageCheck,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  Sun,
  UserRound,
  Utensils,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';
import type { NavItem, Page, Theme } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', page: { name: 'home' }, icon: Home },
  { label: 'Restaurants', page: { name: 'restaurants' }, icon: Store },
  { label: 'Products', page: { name: 'products' }, icon: ShoppingBag },
  { label: 'Orders', page: { name: 'orders' }, icon: PackageCheck },
  { label: 'Profile', page: { name: 'profile' }, icon: UserRound },
  { label: 'Support', page: { name: 'support' }, icon: Headphones },
];

type AppShellProps = {
  activePage: Page;
  cartCount: number;
  children: React.ReactNode;
  onNavigate: (page: Page) => void;
  onSearch: (term: string) => void;
  onToggleTheme: () => void;
  theme: Theme;
};

export function AppShell({
  activePage,
  cartCount,
  children,
  onNavigate,
  onSearch,
  onToggleTheme,
  theme,
}: AppShellProps) {
  return (
    <div className="app-shell">
      {/* ── Professional Header ── */}
      <header className="site-header" role="banner">
        <div className="header-inner">
          {/* Brand */}
          <button
            className="brand brand-button"
            type="button"
            onClick={() => onNavigate({ name: 'home' })}
            aria-label="Go to home"
          >
            <span className="brand-mark"><Utensils size={20} /></span>
            <span>
              <strong>AzureEats</strong>
              <small>Food delivery</small>
            </span>
          </button>

          {/* Search */}
          <div className="header-search search-box">
            <Search size={17} />
            <input
              aria-label="Search food"
              placeholder="Search biryani, burger, pasta, restaurant…"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {/* Nav Links */}
          <nav className="header-nav" aria-label="Primary navigation">
            {navItems.map(({ label, page, icon: Icon }) => (
              <button
                key={label}
                className={`header-nav-item ${activePage.name === page.name ? 'active' : ''}`}
                type="button"
                onClick={() => onNavigate(page)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions topbar-actions">
            {/* Cart with badge */}
            <button
              className={`header-nav-item cart-nav-btn ${activePage.name === 'cart' ? 'active' : ''}`}
              type="button"
              onClick={() => onNavigate({ name: 'cart' })}
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </button>
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell size={17} />
            </button>
            <button className="theme-toggle" type="button" onClick={onToggleTheme}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'light' ? 'Night' : 'Day'}</span>
            </button>
            <button
              className="primary-button"
              type="button"
              onClick={() => onNavigate({ name: 'login' })}
            >
              <LogIn size={16} /> Sign in
            </button>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="main-panel" id="main-content">
        {children}
      </main>

      {/* ── Professional Footer ── */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-inner">
          {/* Brand column */}
          <div className="footer-brand-col">
            <button
              className="brand brand-button footer-brand"
              type="button"
              onClick={() => onNavigate({ name: 'home' })}
            >
              <span className="brand-mark"><Utensils size={20} /></span>
              <span>
                <strong>AzureEats</strong>
                <small>Food delivery</small>
              </span>
            </button>
            <p className="footer-tagline">
              Delivering happiness, one meal at a time. Freshly prepared meals from
              the best local restaurants — right to your door.
            </p>
            <div className="footer-location">
              <MapPin size={14} />
              <span>Serving Microsoft City Center &amp; nearby areas</span>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="social-link"><Facebook size={16} /></a>
              <a href="#" aria-label="Twitter" className="social-link"><Twitter size={16} /></a>
              <a href="#" aria-label="Instagram" className="social-link"><Instagram size={16} /></a>
              <a href="#" aria-label="YouTube" className="social-link"><Youtube size={16} /></a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              {navItems.map(({ label, page }) => (
                <li key={label}>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => onNavigate(page)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><span className="footer-link-btn">About Us</span></li>
              <li><span className="footer-link-btn">Careers</span></li>
              <li><span className="footer-link-btn">Blog</span></li>
              <li><span className="footer-link-btn">Press</span></li>
              <li><span className="footer-link-btn">Partner with Us</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4 className="footer-heading">Legal &amp; Help</h4>
            <ul className="footer-links">
              <li><span className="footer-link-btn">Privacy Policy</span></li>
              <li><span className="footer-link-btn">Terms of Service</span></li>
              <li><span className="footer-link-btn">Cookie Policy</span></li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => onNavigate({ name: 'support' })}
                >
                  Help &amp; Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AzureEats. All rights reserved.</p>
          <div className="footer-badges">
            <span className="footer-badge">🔒 SSL Secured</span>
            <span className="footer-badge">🚀 Fast Delivery</span>
            <span className="footer-badge">⭐ Top Rated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
