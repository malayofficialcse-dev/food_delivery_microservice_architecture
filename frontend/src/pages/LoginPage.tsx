import { LockKeyhole, Mail, ShieldCheck, Sparkles, Utensils } from 'lucide-react';
import type { Page } from '../types';

export function LoginPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="login-root">
      <div className="login-container">
        {/* Visual Brand Left Side */}
        <div className="login-visual-side">
          <div className="login-visual-overlay" />
          <div className="login-visual-content">
            <span className="brand-logo-large">
              <Utensils size={36} />
            </span>
            <h2>Vibe & Feast with AzureEats</h2>
            <p>Order from your favorite local hot spots with our blazing fast checkout.</p>
            <div className="visual-stats">
              <div className="v-stat">
                <strong>20 min</strong>
                <span>Avg delivery</span>
              </div>
              <div className="v-stat">
                <strong>99.9%</strong>
                <span>Secure pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form Right Side */}
        <div className="login-form-side">
          <div className="login-form-header">
            <span className="welcome-pill">
              <Sparkles size={13} /> Welcome Back
            </span>
            <h1>Sign In</h1>
            <p>Access your orders, favorites, and secure tokenized checkout settings.</p>
          </div>

          <form className="login-form-body">
            <label className="checkout-label">
              <span>Email Address</span>
              <div className="input-shell">
                <Mail size={17} />
                <input type="email" defaultValue="malay@example.com" aria-label="Email" />
              </div>
            </label>
            <label className="checkout-label">
              <span>Password</span>
              <div className="input-shell">
                <LockKeyhole size={17} />
                <input type="password" defaultValue="password" aria-label="Password" />
              </div>
            </label>

            <button
              className="login-submit-btn"
              type="button"
              onClick={() => onNavigate({ name: 'home' })}
            >
              Sign In to Your Account
            </button>

            <div className="login-secure-banner">
              <ShieldCheck size={16} />
              <span>JWT authentication via secure token rotation.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
