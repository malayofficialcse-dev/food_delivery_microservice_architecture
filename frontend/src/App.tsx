import { useEffect, useState } from 'react';
import { AppShell } from './components/AppShell';
import { products } from './data/appData';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { OrdersPage } from './pages/OrdersPage';
import { PaymentPage } from './pages/PaymentPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProfilePage } from './pages/ProfilePage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { SupportPage } from './pages/SupportPage';
import type { CartLine, Page, Theme } from './types';
import { getCartCount } from './utils/cart';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('food-ui-theme') as Theme | null;
    return storedTheme ?? 'light';
  });
  const [page, setPage] = useState<Page>({ name: 'home' });
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartLine[]>([
    { productId: products[0].id, quantity: 1 },
    { productId: products[2].id, quantity: 1 },
  ]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('food-ui-theme', theme);
  }, [theme]);

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (productId: string) => {
    setCart((current) => {
      const existing = current.find((line) => line.productId === productId);
      if (existing) {
        return current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line);
      }
      return [...current, { productId, quantity: 1 }];
    });
  };

  const decreaseCart = (productId: string) => {
    setCart((current) => current.flatMap((line) => {
      if (line.productId !== productId) return [line];
      if (line.quantity <= 1) return [];
      return [{ ...line, quantity: line.quantity - 1 }];
    }));
  };

  const productQuantity = page.name === 'product'
    ? cart.find((line) => line.productId === page.productId)?.quantity ?? 0
    : 0;

  return (
    <AppShell
      activePage={page}
      cartCount={getCartCount(cart)}
      onNavigate={navigate}
      onSearch={setSearchTerm}
      onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      theme={theme}
    >
      {page.name === 'home' && <HomePage onAddToCart={addToCart} onNavigate={navigate} />}
      {page.name === 'restaurants' && <RestaurantsPage onNavigate={navigate} />}
      {page.name === 'restaurant' && (
        <RestaurantDetailPage restaurantId={page.restaurantId} onAddToCart={addToCart} onNavigate={navigate} />
      )}
      {page.name === 'products' && (
        <ProductsPage searchTerm={searchTerm} onAddToCart={addToCart} onNavigate={navigate} />
      )}
      {page.name === 'product' && (
        <ProductDetailPage
          productId={page.productId}
          quantity={productQuantity}
          onAddToCart={addToCart}
          onDecrease={decreaseCart}
          onNavigate={navigate}
        />
      )}
      {page.name === 'cart' && <CartPage cart={cart} onAdd={addToCart} onDecrease={decreaseCart} onNavigate={navigate} />}
      {page.name === 'checkout' && <CheckoutPage cart={cart} onNavigate={navigate} />}
      {page.name === 'payment' && <PaymentPage cart={cart} onNavigate={navigate} />}
      {page.name === 'orders' && <OrdersPage onNavigate={navigate} />}
      {page.name === 'order' && <OrderDetailPage orderId={page.orderId} />}
      {page.name === 'profile' && <ProfilePage />}
      {page.name === 'login' && <LoginPage onNavigate={navigate} />}
      {page.name === 'support' && <SupportPage />}
    </AppShell>
  );
}

export { App };
