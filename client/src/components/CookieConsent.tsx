import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setAnalyticsConsent } from '@/utils/analytics';
import './CookieConsent.css';

const KEY = 'harborline-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(KEY));

  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (v) setAnalyticsConsent(v === 'granted');
  }, []);

  function accept() {
    localStorage.setItem(KEY, 'granted');
    setAnalyticsConsent(true);
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(KEY, 'denied');
    setAnalyticsConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p>
        We use analytics{' '}
        <Link to="/cookies" className="cookie-banner__link">
          cookies
        </Link>{' '}
        to understand how visitors use our site. You can accept or decline non-essential cookies, or read our{' '}
        <Link to="/cookies" className="cookie-banner__link">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="cookie-banner__actions">
        <button type="button" className="btn btn--ghost" onClick={decline}>
          Decline
        </button>
        <button type="button" className="btn btn--primary" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
