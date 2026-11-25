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

type InquirySummary = {
  _id: string;
  inquiryType: string;
  message?: string;
  status: string;
  createdAt: string;
};

export function UserPage() {
  const navigate = useNavigate();
  const [token] = useState<string>(
    () => localStorage.getItem('harborline_auth_token') || localStorage.getItem('harborline_admin_token') || ''
  );
  const [user, setUser] = useState<UserData | null>(null);
  const [inquiries, setInquiries] = useState<InquirySummary[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

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
        .catch(() => { });

      setInquiriesLoading(true);
      getJson<{ success: boolean; inquiries: InquirySummary[] }>('/api/auth/my-inquiries', {
        Authorization: `Bearer ${token}`,
      })
        .then((res) => {
          if (res?.inquiries) {
            setInquiries(res.inquiries);
          }
        })
        .catch(() => { })
        .finally(() => setInquiriesLoading(false));
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <div>
                <h1>My Account</h1>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Welcome back, {user?.name || 'User'}
                </p>
              </div>
            </div>
            <div className="user-page__header-actions">
              <Link to="/" className="btn btn--ghost" style={{ fontSize: '0.88rem', padding: '0.45rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home</span>
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="btn btn--primary" style={{ fontSize: '0.88rem', padding: '0.45rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <button type="button" className="btn btn--outline" onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Admin alert banner if user is admin */}
          {user?.role === 'admin' && (
            <div
              style={{
                marginBottom: '1.5rem',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(255, 107, 44, 0.08)',
                border: '1px solid rgba(255, 107, 44, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', color: '#ff6b2c' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
                <div>
                  <strong style={{ color: 'var(--text)', fontSize: '0.95rem' }}>
                    Administrator Privileges Active
                  </strong>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    You have full access to message management, resumes, blogs, and settings.
                  </p>
                </div>
              </div>
              <Link to="/admin" className="btn btn--primary" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                Open Admin Panel →
              </Link>
            </div>
          )}

          <div className="user-page__grid">
            {/* Profile card */}
            <div className="user-card">
              <div className="user-card__avatar-wrap">
                <div className="user-card__avatar">{initials}</div>
                <div className="user-card__role-badge">
                  {user?.role === 'admin' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Administrator
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified Account
                    </span>
                  )}
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
                    <dt>Role</dt>
                    <dd style={{ textTransform: 'capitalize' }}>{user.role}</dd>
                  </div>
                </dl>
              ) : (
                <p className="user-card__loading">Loading profile…</p>
              )}

              {user?.role === 'admin' && (
                <div className="user-card__admin-link">
                  <Link to="/admin" className="btn btn--primary" style={{ width: '100%', textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span>Go to Admin Dashboard</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="user-page__right">
              {/* Inquiries / Quote requests */}
              <div className="user-section-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h2 className="user-section-card__title" style={{ margin: 0, border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    </svg>
                    <span>My Inquiries &amp; Quotes</span>
                  </h2>
                  <Link to="/contact" className="btn btn--outline" style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}>
                    + New Request
                  </Link>
                </div>

                {inquiriesLoading ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading inquiry activity…</p>
                ) : inquiries.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    No quote requests recorded yet.{' '}
                    <Link to="/contact" style={{ color: 'var(--accent)', fontWeight: 600 }}>Submit your first inquiry →</Link>
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {inquiries.map((inq) => (
                      <div
                        key={inq._id}
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--bg)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>
                            {inq.inquiryType}
                          </span>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              padding: '0.15rem 0.6rem',
                              borderRadius: '999px',
                              background: inq.status === 'new' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                              color: inq.status === 'new' ? '#3b82f6' : '#10b981',
                            }}
                          >
                            {inq.status === 'new' ? 'Received' : inq.status === 'emailed' ? 'Under Review' : inq.status}
                          </span>
                        </div>
                        {inq.message && (
                          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                            {inq.message.length > 140 ? `${inq.message.slice(0, 140)}…` : inq.message}
                          </p>
                        )}
                        <time style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {new Date(inq.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </time>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick links */}
              <div className="user-section-card">
                <h2 className="user-section-card__title">Quick Actions</h2>
                <div className="user-quick-links">
                  <Link to="/services" className="user-quick-link">
                    <span className="user-quick-link__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1" />
                        <path d="M4 18L3 12h18l-1 6" />
                        <path d="M12 4v8" />
                        <path d="M8 8h8" />
                      </svg>
                    </span>
                    <div>
                      <strong>Our Services</strong>
                      <p>Explore freight and logistics solutions</p>
                    </div>
                  </Link>
                  <Link to="/contact" className="user-quick-link">
                    <span className="user-quick-link__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <div>
                      <strong>Get a Quote</strong>
                      <p>Submit a logistics inquiry</p>
                    </div>
                  </Link>
                  <Link to="/case-studies" className="user-quick-link">
                    <span className="user-quick-link__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </span>
                    <div>
                      <strong>Case Studies</strong>
                      <p>See how we've helped clients</p>
                    </div>
                  </Link>
                  <Link to="/blog" className="user-quick-link">
                    <span className="user-quick-link__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </span>
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

