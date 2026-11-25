import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import { InquiryForm } from '@/components/InquiryForm';
import { getJson } from '@/api/client';

type Office = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  hours: string;
  mapEmbedUrl?: string;
};

export function ContactPage() {
  const { t } = useTranslation();
  const [offices, setOffices] = useState<Office[]>([]);

  useEffect(() => {
    getJson<Office[]>('/api/offices')
      .then(setOffices)
      .catch(() =>
        setOffices([
          {
            id: 'dubai',
            name: 'Dubai HQ',
            address: 'Jebel Ali Free Zone, Dubai, UAE',
            email: 'sales@global-logisticssolution.com',
            phone: '+971 4 000 0000',
            hours: 'Sun–Thu, 8:00–18:00 GST',
          },
        ])
      );
  }, []);

  const departmentEmails = [
    { title: 'Sales & Inquiries', email: 'sales@global-logisticssolution.com', desc: 'Freight quotes, pricing, and partnerships' },
    { title: 'Imports & Operations', email: 'import@global-logisticssolution.com', desc: 'Customs clearance, import filings, and tracking' },
    { title: 'Accounts & Billing', email: 'accounts@global-logisticssolution.com', desc: 'Invoices, receipts, and finance inquiries' },
    { title: 'General Inquiries', email: 'info@global-logisticssolution.com', desc: 'General questions and corporate communications' },
  ];

  return (
    <>
      <PageMeta title={t('contact.heroTitle')} description="Office locations, hours and inquiry form for Global Logistics Solutions." path="/contact" />
      <section className="section">
        <div className="container">
          <h1>{t('contact.heroTitle')}</h1>
          <p className="prose">{t('contact.heroDesc')}</p>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Regional Offices & Hubs</h2>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {offices.map((o) => (
                  <article key={o.id} className="card">
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text)', marginBottom: '0.4rem' }}>{o.name}</h3>
                    <p style={{ margin: '0.25rem 0', color: 'var(--text-muted)', fontSize: '0.92rem' }}>{o.address}</p>
                    <p style={{ margin: '0.35rem 0' }}>
                      <a href={`mailto:${o.email}`} style={{ fontWeight: 500 }}>{o.email}</a>
                      <span style={{ marginInline: '0.5rem', color: 'var(--border)' }}>·</span>
                      <a href={`tel:${o.phone.replace(/\s/g, '')}`}>{o.phone}</a>
                    </p>
                    <p style={{ color: 'var(--text-muted)', margin: '0.35rem 0 0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{o.hours}</span>
                    </p>
                    {o.mapEmbedUrl && (
                      <iframe
                        title={`Map for ${o.name}`}
                        src={o.mapEmbedUrl}
                        width="100%"
                        height="200"
                        style={{ border: 0, borderRadius: 8, marginTop: '0.75rem' }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    )}
                  </article>
                ))}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Direct Department Contacts</h2>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {departmentEmails.map((dept) => (
                    <div
                      key={dept.email}
                      className="card"
                      style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
                    >
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text)' }}>{dept.title}</strong>
                      <p style={{ margin: '0.1rem 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>{dept.desc}</p>
                      <a href={`mailto:${dept.email}`} style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent)' }}>
                        {dept.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{t('contact.sendInquiry')}</h2>
              <div className="card" style={{ padding: '1.75rem' }}>
                <InquiryForm variant="inline" sourcePage="/contact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
