import { Bell, Home, Mail, Phone, ShieldCheck, UserRound } from 'lucide-react';

export function ProfilePage() {
  return (
    <section className="page-stack">
      <div className="profile-header">
        <span className="profile-avatar"><UserRound size={34} /></span>
        <div>
          <span className="section-kicker">Customer profile</span>
          <h1>Malay Maity</h1>
          <p>Premium member since 2026 with saved addresses, cards, and notification preferences.</p>
        </div>
      </div>
      <div className="settings-grid">
        <article className="setting-card"><Mail size={21} /><span>Email</span><strong>malay@example.com</strong></article>
        <article className="setting-card"><Phone size={21} /><span>Phone</span><strong>+91 98765 43210</strong></article>
        <article className="setting-card"><Home size={21} /><span>Default address</span><strong>221B Azure Avenue</strong></article>
        <article className="setting-card"><ShieldCheck size={21} /><span>Security</span><strong>2FA enabled</strong></article>
        <article className="setting-card"><Bell size={21} /><span>Notifications</span><strong>Push, SMS, email</strong></article>
      </div>
    </section>
  );
}
