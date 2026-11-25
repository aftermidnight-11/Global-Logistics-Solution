import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { setAnalyticsConsent } from '@/utils/analytics';

const KEY = 'harborline-cookie-consent';

export function CookiePage() {
  const [consent, setConsent] = useState<'granted' | 'denied' | 'none'>(() => {
    const stored = localStorage.getItem(KEY);
    return stored === 'granted' || stored === 'denied' ? stored : 'none';
  });

  const handleUpdate = (val: 'granted' | 'denied') => {
    localStorage.setItem(KEY, val);
    setAnalyticsConsent(val === 'granted');
    setConsent(val);
  };

  return (
    <>
      <PageMeta
        title="Cookie Policy — Global Logistics Solutions"
        description="Learn how Global Logistics Solutions uses cookies to deliver reliable freight forwarding services and protect your privacy."
        path="/cookies"
      />
      <div className="section container prose" style={{ paddingBlock: '3rem 5rem' }}>
        <p>
          <Link to="/">Home</Link> / Cookie Policy
        </p>
        <h1 style={{ marginTop: '0.5rem' }}>Cookie Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Last updated: November 2026 · Global Logistics Solutions
        </p>

        <div
          className="card"
          style={{
            marginBlock: '1.5rem',
            padding: '1.25rem 1.5rem',
            background: 'var(--surface)',
            borderLeft: '4px solid var(--accent)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem' }}>Your Current Preference</h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.92rem' }}>
            Analytics & Non-essential Cookies Status:{' '}
            <strong style={{ color: consent === 'granted' ? '#10b981' : '#ef4444' }}>
              {consent === 'granted' ? 'Accepted' : consent === 'denied' ? 'Declined' : 'Not Set (Defaulting to Essential Only)'}
            </strong>
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn--primary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
              onClick={() => handleUpdate('granted')}
            >
              Accept All Cookies
            </button>
            <button
              type="button"
              className="btn btn--outline"
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
              onClick={() => handleUpdate('denied')}
            >
              Decline Non-Essential
            </button>
          </div>
        </div>

        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your computer or mobile device when you visit our website. They allow
          our systems to recognize your device, maintain your session while requesting quotes or accessing your shipment
          portal, and improve site performance.
        </p>

        <h2>2. Cookies We Use</h2>
        <p>Global Logistics Solutions uses three distinct categories of cookies:</p>

        <div style={{ display: 'grid', gap: '1rem', marginBlock: '1rem' }}>
          <div className="card">
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--accent)' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Strictly Necessary Cookies (Essential)</span>
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Required for the website to function. They authenticate logged-in users, prevent CSRF attacks, manage
              inquiry submissions, and maintain security tokens. These cookies cannot be switched off in our systems.
            </p>
          </div>

          <div className="card">
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#10b981' }}>
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span>Analytics &amp; Performance Cookies (Optional)</span>
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Enable us to count visits and traffic sources so we can measure and improve the performance of our site.
              All data collected is anonymized and aggregated. You can accept or decline these at any time.
            </p>
          </div>

          <div className="card">
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#3b82f6' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Functional &amp; Preference Cookies (Optional)</span>
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Remember your choices, such as your preferred language (Arabic or English) and your light/dark display
              mode, providing an enhanced and personalized experience.
            </p>
          </div>
        </div>

        <h2>3. Cookie Retention Period</h2>
        <p>
          Session cookies are temporary and expire automatically when you close your browser. Persistent cookies (such
          as your language preference and consent choice) remain on your device for up to 12 months or until you clear
          them via your browser settings.
        </p>

        <h2>4. How to Manage Cookies in Your Browser</h2>
        <p>
          Most modern browsers allow you to manage or block cookies through their settings. Please note that blocking
          strictly necessary cookies may impact the functionality of our customer portal and quote inquiry forms:
        </p>
        <ul>
          <li>
            <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data
          </li>
          <li>
            <strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Options → Privacy & Security → Enhanced Tracking Protection
          </li>
          <li>
            <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies
          </li>
        </ul>

        <h2>5. Contact Our Privacy Team</h2>
        <p>
          If you have any questions regarding our use of cookies or our data privacy practices under KSA Personal Data
          Protection Law (PDPL) and international standards, please contact us:
        </p>
        <p>
          Email:{' '}
          <a href="mailto:info@global-logisticssolution.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            info@global-logisticssolution.com
          </a>
          <br />
          Compliance Desk:{' '}
          <a href="mailto:accounts@global-logisticssolution.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            accounts@global-logisticssolution.com
          </a>
        </p>
      </div>
    </>
  );
}
