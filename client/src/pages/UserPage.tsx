import { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { postJson, getJson } from '@/api/client';
import './UserPage.css';

type UserData = {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  role: string;
};

export function UserPage() {
  const navigate = useNavigate();
  const [token] = useState<string>(
    () => localStorage.getItem('harborline_auth_token') || localStorage.getItem('harborline_admin_token') || ''
  );
  const [user, setUser] = useState<UserData | null>(null);

  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  const loadUser = useCallback(() => {
    const raw = localStorage.getItem('harborline_user');
    if (raw) {
      try {
        setUser(JSON.parse(raw) as UserData);
      } catch {
        setUser(null);
      }
    }
    if (token) {
      getJson<{ success: boolean; user: UserData }>('/api/auth/me', {
        Authorization: `Bearer ${token}`,
      })
        .then((res) => {
          if (res?.user) {
            setUser((prev) => (prev ? { ...prev, ...res.user } : res.user));
            localStorage.setItem('harborline_user', JSON.stringify(res.user));
          }
        })
        .catch(() => {});
    }
  }, [token]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = () => {
    localStorage.removeItem('harborline_auth_token');
    localStorage.removeItem('harborline_admin_token');
    localStorage.removeItem('harborline_user');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const handlePwChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');

    if (pwForm.next !== pwForm.confirm) {
      setPwError('New passwords do not match.');
      return;
    }
    if (pwForm.next.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }

    setPwLoading(true);
    try {
      await postJson(
        '/api/auth/change-password',
        { currentPassword: pwForm.current, newPassword: pwForm.next },
        { Authorization: `Bearer ${token}` }
      );
      setPwSuccess('Password changed successfully.');
      setPwForm({ current: '', next: '', confirm: '' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to change password.';
      setPwError(msg);
    } finally {
      setPwLoading(false);
    }
  };

  if (!token) {
    return <Navigate to="/login?redirect=/account" replace />;
  }

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      <PageMeta
        title="My Account – Global Logistics Solutions"
        description="Manage your Global Logistics Solutions account profile"
        path="/account"
      />

      <div className="user-page">
        <div className="container">
          {/* Page header */}
          <div className="user-page__header">
            <h1>My Account</h1>
            <div className="user-page__header-actions">
              <Link to="/" className="btn btn--ghost" style={{ fontSize: '0.88rem', padding: '0.45rem 1rem' }}>
                ← Home
              </Link>
              <button type="button" className="btn btn--outline" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          </div>

          <div className="user-page__grid">
            {/* Profile card */}
            <div className="user-card">
              <div className="user-card__avatar-wrap">
                <div className="user-card__avatar">{initials}</div>
                <div className="user-card__role-badge">
                  {user?.role === 'admin' ? '⭐ Admin' : '✓ Verified User'}
                </div>
              </div>

              {user ? (
                <dl className="user-card__info">
                  <div className="user-card__info-row">
                    <dt>Full Name</dt>
                    <dd>{user.name}</dd>
                  </div>
                  <div className="user-card__info-row">
                    <dt>Email Address</dt>
                    <dd>{user.email}</dd>
                  </div>
                  {user.phone && (
                    <div className="user-card__info-row">
                      <dt>Phone / WhatsApp</dt>
                      <dd>
                        <a href={`https://wa.me/${user.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                          {user.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  {user.companyName && (
                    <div className="user-card__info-row">
                      <dt>Company</dt>
                      <dd>{user.companyName}</dd>
                    </div>
                  )}
                  <div className="user-card__info-row">
                    <dt>Account Type</dt>
                    <dd style={{ textTransform: 'capitalize' }}>{user.role}</dd>
                  </div>
                </dl>
              ) : (
                <p className="user-card__loading">Loading profile…</p>
              )}

              {user?.role === 'admin' && (
                <div className="user-card__admin-link">
                  <Link to="/admin" className="btn btn--primary" style={{ width: '100%', textAlign: 'center' }}>
                    Go to Admin Dashboard →
                  </Link>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="user-page__right">
              {/* Quick links */}
              <div className="user-section-card">
                <h2 className="user-section-card__title">Quick Actions</h2>
                <div className="user-quick-links">
                  <Link to="/services" className="user-quick-link">
                    <span className="user-quick-link__icon">🚢</span>
                    <div>
                      <strong>Our Services</strong>
                      <p>Explore freight and logistics solutions</p>
                    </div>
                  </Link>
                  <Link to="/contact" className="user-quick-link">
                    <span className="user-quick-link__icon">📞</span>
                    <div>
                      <strong>Get a Quote</strong>
                      <p>Submit a logistics inquiry</p>
                    </div>
                  </Link>
                  <Link to="/case-studies" className="user-quick-link">
                    <span className="user-quick-link__icon">📊</span>
                    <div>
                      <strong>Case Studies</strong>
                      <p>See how we've helped clients</p>
                    </div>
                  </Link>
                  <Link to="/blog" className="user-quick-link">
                    <span className="user-quick-link__icon">📰</span>
                    <div>
                      <strong>Industry Insights</strong>
                      <p>Read our latest articles</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Change password */}
              <div className="user-section-card">
                <h2 className="user-section-card__title">Change Password</h2>
                <form className="user-pw-form" onSubmit={handlePwChange}>
                  {pwError && <div className="user-pw-form__alert user-pw-form__alert--error">{pwError}</div>}
                  {pwSuccess && <div className="user-pw-form__alert user-pw-form__alert--success">{pwSuccess}</div>}

                  <div className="user-form-group">
                    <label htmlFor="upw-current">Current Password</label>
                    <input
                      id="upw-current"
                      type="password"
                      placeholder="Your current password"
                      value={pwForm.current}
                      onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="user-form-group">
                    <label htmlFor="upw-new">New Password</label>
                    <input
                      id="upw-new"
                      type="password"
                      placeholder="At least 6 characters"
                      value={pwForm.next}
                      onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="user-form-group">
                    <label htmlFor="upw-confirm">Confirm New Password</label>
                    <input
                      id="upw-confirm"
                      type="password"
                      placeholder="Repeat new password"
                      value={pwForm.confirm}
                      onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <button type="submit" className="btn btn--primary" disabled={pwLoading}>
                    {pwLoading ? 'Updating…' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

