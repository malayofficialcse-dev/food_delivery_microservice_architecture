import { Bell, ShieldCheck, UserRound } from 'lucide-react';

export function ProfilePage() {
  return (
    <div className="profile-root">
      {/* Header Profile Section */}
      <div className="profile-hero">
        <div className="profile-avatar-wrap">
          <UserRound size={48} />
        </div>
        <div className="profile-info-wrap">
          <span className="premium-badge">GOLD MEMBER</span>
          <h1>Malay Maity</h1>
          <p>Member since 2026 · Saved addresses, cards, and default payment preference ready.</p>
        </div>
      </div>

      {/* Grid options */}
      <div className="profile-options-grid">
        <div className="profile-card">
          <div className="card-header">
            <h3>Account Settings</h3>
          </div>
          <div className="card-list-items">
            <div className="list-item">
              <span className="label">EMAIL</span>
              <span className="value">malay@example.com</span>
            </div>
            <div className="list-item">
              <span className="label">PHONE</span>
              <span className="value">+91 98765 43210</span>
            </div>
            <div className="list-item">
              <span className="label">DEFAULT ADDRESS</span>
              <span className="value">221B Azure Avenue</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <h3>Preferences & Security</h3>
          </div>
          <div className="card-list-items">
            <div className="list-item">
              <div className="icon-label">
                <ShieldCheck size={18} />
                <span>Security Settings</span>
              </div>
              <span className="action-status">2FA ENABLED</span>
            </div>
            <div className="list-item">
              <div className="icon-label">
                <Bell size={18} />
                <span>Notifications</span>
              </div>
              <span className="action-status">ALL CHANNELS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
