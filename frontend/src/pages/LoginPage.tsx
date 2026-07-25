import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import type { Page } from '../types';

export function LoginPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="auth-layout">
      <div className="auth-copy">
        <span className="section-kicker">Welcome back</span>
        <h1>Sign in to manage orders, payments, and saved favorites.</h1>
        <p>Authentication connects to the auth microservice with JWT, refresh tokens, and role-based access.</p>
      </div>
      <form className="auth-panel">
        <label>
          <span>Email</span>
          <div className="input-shell"><Mail size={17} /><input defaultValue="malay@example.com" /></div>
        </label>
        <label>
          <span>Password</span>
          <div className="input-shell"><LockKeyhole size={17} /><input type="password" defaultValue="password" /></div>
        </label>
        <button className="primary-button full-button" type="button" onClick={() => onNavigate({ name: 'home' })}>Sign in</button>
        <div className="secure-note"><ShieldCheck size={17} /> Secure session with refresh token rotation.</div>
      </form>
    </section>
  );
}
