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
          <p className="prose">{service.summary}</p>

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
