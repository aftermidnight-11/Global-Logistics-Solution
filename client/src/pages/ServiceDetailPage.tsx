import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { getServiceBySlug } from '@/content/services';
import { getCaseStudy } from '@/content/caseStudies';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { trackEvent } from '@/utils/analytics';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const { open } = useInquiryModal();

  useEffect(() => {
    if (service) trackEvent('service_view', { slug: service.slug });
  }, [service]);

  if (!service) return <NotFoundPage />;

  const caseStudy = service.relatedCaseStudy ? getCaseStudy(service.relatedCaseStudy) : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: { '@type': 'Organization', name: 'Global Logistics Solutions' },
  };

  return (
    <>
      <PageMeta title={service.title} description={service.metaDescription} path={`/services/${service.slug}`} jsonLd={jsonLd} />
      <section className="section">
        <div className="container">
          <p>
            <Link to="/services">Services</Link> / {service.title}
          </p>
          <h1>{service.title}</h1>
          <p className="prose" style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {service.summary}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            margin: '2rem 0',
          }}>
            <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--accent)' }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Typical Transit Time</span>
              </h3>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text)' }}>
                {service.transitTime}
              </p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--secondary)' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Coverage Areas</span>
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                {service.coverage}
              </p>
            </div>
          </div>

          <h2>Who it&apos;s for</h2>
          <p>{service.audience}</p>

          <h2>What&apos;s included</h2>
          <ul>
            {service.included.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>

          <h2>Our process</h2>
          <ol>
            {service.process.map((p) => (
              <li key={p.step}>
                <strong>
                  {p.step}. {p.title}
                </strong>{' '}
                — {p.text}
              </li>
            ))}
          </ol>

          <h2>FAQs</h2>
          {service.faqs.map((f) => (
            <details key={f.q} className="card" style={{ marginBottom: '0.5rem', padding: '0.75rem 1rem' }}>
              <summary>{f.q}</summary>
              <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{f.a}</p>
            </details>
          ))}

          {service.relatedSlugs.length > 0 && (
            <>
              <h2>Related services</h2>
              <ul>
                {service.relatedSlugs.map((rs) => (
                  <li key={rs}>
                    <Link to={`/services/${rs}`}>{rs.replace(/-/g, ' ')}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {caseStudy && (
            <p>
              Case study: <Link to={`/case-studies/${caseStudy.slug}`}>{caseStudy.title}</Link>
            </p>
          )}

          <button type="button" className="btn btn--primary" style={{ marginTop: '1.5rem' }} onClick={() => open(`/services/${service.slug}`)}>
            Request a quote
          </button>
        </div>
      </section>
    </>
  );
}
