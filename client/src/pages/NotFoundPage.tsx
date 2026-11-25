import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta
        title="Page Not Found (404)"
        description="The page you requested could not be found. Return to Global Logistics Solutions homepage or track your cargo."
      />
      <section className="section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent)' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
          <h1 style={{ fontSize: ' clamp(2rem, 5vw, 3.5rem)', color: 'var(--accent)', margin: '0 0 0.5rem' }}>
            404
          </h1>
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 1rem', color: 'var(--text)' }}>
            {t('notFound.title', 'Page or Cargo Off-Course')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {t(
              'notFound.message',
              'The page you are looking for might have been moved, renamed, or is temporarily unreachable. Let us help guide you back on route.'
            )}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn--primary">
              ← {t('notFound.backHome', 'Back to Homepage')}
            </Link>
            <Link to="/#tracking" className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>{t('notFound.track', 'Track Shipment')}</span>
            </Link>
            <Link to="/services" className="btn btn--ghost">
              {t('notFound.services', 'Our Services')}
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              {t('notFound.contact', 'Contact Us')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
