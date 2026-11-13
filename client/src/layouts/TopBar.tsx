import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topBarContacts } from '@/content/navigation';
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
    <div className="topbar" role="region" aria-label="Regional contacts">
      <div className="container topbar__inner">
        <div className="topbar__contacts">
          {topBarContacts.map((c) => (
            <span key={c.region} className="topbar__item">
              <strong>{c.region}</strong>{' '}
              <a href={`mailto:${c.email}`}>{c.email}</a>
              <span aria-hidden="true"> · </span>
              <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>
            </span>
          ))}
        </div>
        <div className="topbar__right">
          {isLoggedIn || isAdmin ? (
            <Link to={isAdmin ? '/admin' : '/account'} className="topbar__link topbar__link--admin">
              {isAdmin ? '⚙ Admin' : '👤 My Account'}
            </Link>
          ) : (
            <>
              <Link to="/login" className="topbar__link">
                Login
              </Link>
              <span aria-hidden="true" style={{ opacity: 0.5 }}> · </span>
              <Link to="/register" className="topbar__link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
