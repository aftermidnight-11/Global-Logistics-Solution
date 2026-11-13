import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mainNav } from '@/content/navigation';
import { useTheme } from '@/hooks/useTheme';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { trackCta } from '@/utils/analytics';
import './SiteHeader.css';

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { toggle } = useTheme();
  const { open } = useInquiryModal();
  const { t, i18n } = useTranslation();

  // Track auth state (re-evaluate on every render via localStorage)
  const isLoggedIn = !!localStorage.getItem('harborline_auth_token');
  const isAdmin = !!localStorage.getItem('harborline_admin_token');

  // Re-read on storage changes (e.g. after login/logout in another tab)
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handler = () => forceUpdate((n) => n + 1);
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const onChat = () => {
    trackCta('lets_chat_header');
    open();
    setMobileOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" onClick={() => setMobileOpen(false)}>
          <img 
            src="/images/gls_logo_globe.png" 
            alt="Global Logistics Solutions Logo" 
            className="site-header__logo-image" 
          />
        </Link>

        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={mobileOpen}
          aria-controls="primary-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? t('nav.closeMenu') : t('nav.menu')}
        </button>

        <nav id="primary-nav" className={`site-header__nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Primary">
          <ul className="site-header__list">
            {mainNav.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  className="site-header__item site-header__item--dropdown"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className="site-header__link site-header__link--button"
                    aria-expanded={servicesOpen || mobileOpen}
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {t(`nav.${item.label}`, item.label)}
                  </button>
                  <ul className={`site-header__sub ${servicesOpen || mobileOpen ? 'is-open' : ''}`}>
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <NavLink to={child.path} onClick={() => setMobileOpen(false)}>
                          {t(`nav.${child.label}`, child.label)}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.path} className="site-header__item">
                  {item.path?.startsWith('/#') ? (
                    <a
                      href={item.path}
                      className="site-header__link"
                      onClick={(e) => {
                        setMobileOpen(false);
                        if (window.location.pathname === '/') {
                          e.preventDefault();
                          const el = document.getElementById(item.path!.replace('/#', ''));
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState(null, '', item.path);
                        }
                      }}
                    >
                      {t(`nav.${item.label}`, item.label)}
                    </a>
                  ) : (
                    <NavLink
                      to={item.path!}
                      className={({ isActive }) => (isActive ? 'site-header__link is-active' : 'site-header__link')}
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(`nav.${item.label}`, item.label)}
                    </NavLink>
                  )}
                </li>
              )
            )}
            <li className="site-header__item site-header__mobile-auth">
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'site-header__link is-active' : 'site-header__link')}
                onClick={() => setMobileOpen(false)}
              >
                Login
              </NavLink>
            </li>
            <li className="site-header__item site-header__mobile-auth">
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'site-header__link is-active' : 'site-header__link')}
                onClick={() => setMobileOpen(false)}
              >
                Register
              </NavLink>
            </li>
            {(isLoggedIn || isAdmin) && (
              <li className="site-header__item site-header__mobile-auth">
                <NavLink
                  to={isAdmin ? '/admin' : '/account'}
                  className={({ isActive }) => (isActive ? 'site-header__link is-active' : 'site-header__link')}
                  onClick={() => setMobileOpen(false)}
                >
                  {isAdmin ? '⚙ Admin Dashboard' : '👤 My Account'}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="site-header__actions">
          {isLoggedIn || isAdmin ? (
            <Link
              to={isAdmin ? '/admin' : '/account'}
              className="btn btn--outline site-header__login-btn"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            >
              {isAdmin ? '⚙ Admin' : '👤 My Account'}
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn btn--outline site-header__login-btn"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            >
              Login
            </Link>
          )}
          <button type="button" className="site-header__icon-btn" onClick={toggle} aria-label={t('nav.toggleTheme')}>
            ◐
          </button>
          <button
            type="button"
            className="site-header__lang"
            onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
            aria-label={t('nav.language')}
          >
            {i18n.language === 'ar' ? 'EN' : 'AR'}
          </button>
          <button type="button" className="btn btn--primary" onClick={onChat}>
            {t('nav.letsChat')}
          </button>
        </div>
      </div>
    </header>
  );
}
