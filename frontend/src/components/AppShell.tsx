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
} from 'lucide-react';
import type { NavItem, Page, Theme } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', page: { name: 'home' }, icon: Home },
  { label: 'Restaurants', page: { name: 'restaurants' }, icon: Store },
  { label: 'Products', page: { name: 'products' }, icon: ShoppingBag },
  { label: 'Cart', page: { name: 'cart' }, icon: ShoppingCart },
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
      <aside className="sidebar" aria-label="Primary navigation">
        <button className="brand brand-button" type="button" onClick={() => onNavigate({ name: 'home' })}>
          <span className="brand-mark"><Utensils size={22} /></span>
          <span>
            <strong>AzureEats</strong>
            <small>Food delivery</small>
          </span>
        </button>

        <nav className="nav-list">
          {navItems.map(({ label, page, icon: Icon }) => (
            <button
              className={`nav-item ${activePage.name === page.name ? 'active' : ''}`}
              key={label}
              type="button"
              onClick={() => onNavigate(page)}
            >
              <Icon size={18} />
              {label}
              {page.name === 'cart' && cartCount > 0 ? <span className="nav-badge">{cartCount}</span> : null}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <span className="pill success">Open now</span>
          <p>Fast delivery from restaurants near Microsoft City Center.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="search-box">
            <Search size={18} />
            <input
              aria-label="Search food"
              placeholder="Search biryani, burger, pasta, restaurant"
              onChange={(event) => onSearch(event.target.value)}
            />
          </div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="theme-toggle" type="button" onClick={onToggleTheme}>
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
              <span>{theme === 'light' ? 'Night' : 'Day'}</span>
            </button>
            <button className="primary-button" type="button" onClick={() => onNavigate({ name: 'login' })}>
              <LogIn size={17} /> Sign in
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
