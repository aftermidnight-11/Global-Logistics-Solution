import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

export function TopBar() {
  const isLoggedIn = !!localStorage.getItem('harborline_auth_token');
  const isAdmin = !!localStorage.getItem('harborline_admin_token');

  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handler = () => forceUpdate((n) => n + 1);
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <div className="topbar" role="region" aria-label="Official company contacts">
      <div className="container topbar__inner">
        <div className="topbar__contacts">
          <span className="topbar__item">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '5px' }}
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <strong>Sales:</strong>{' '}
            <a href="mailto:sales@global-logisticssolution.com">sales@global-logisticssolution.com</a>
          </span>
          <span className="topbar__item">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '5px' }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <strong>Info:</strong>{' '}
            <a href="mailto:info@global-logisticssolution.com">info@global-logisticssolution.com</a>
          </span>
        </div>

        <div className="topbar__right">
          {isLoggedIn || isAdmin ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link to="/account" className="topbar__link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>My Account</span>
              </Link>
              {isAdmin && (
                <>
                  <span aria-hidden="true" style={{ opacity: 0.5 }}> · </span>
                  <Link to="/admin" className="topbar__link topbar__link--admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span>Admin</span>
                  </Link>
                </>
              )}
              <span aria-hidden="true" style={{ opacity: 0.5 }}> · </span>
              <button
                type="button"
                className="topbar__link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', font: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                onClick={() => {
                  localStorage.removeItem('harborline_auth_token');
                  localStorage.removeItem('harborline_admin_token');
                  localStorage.removeItem('harborline_user');
                  window.dispatchEvent(new Event('storage'));
                  window.location.href = '/login';
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="topbar__link">
                Login
              </Link>
              <span aria-hidden="true" style={{ opacity: 0.5 }}> · </span>
              <Link to="/register" className="topbar__link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
