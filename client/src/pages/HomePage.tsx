import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense, useEffect } from 'react';
import { PageMeta, organizationJsonLd } from '@/components/PageMeta';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { trackCta } from '@/utils/analytics';
import { services } from '@/content/services';
import { ShipmentTracker } from '@/components/ShipmentTracker';
import { AboutPage } from './AboutPage';
import './HomePage.css';

const VisionPage = lazy(() => import('./VisionPage').then(m => ({ default: m.VisionPage })));
const ServicesPage = lazy(() => import('./ServicesPage').then(m => ({ default: m.ServicesPage })));
const GalleryPage = lazy(() => import('./GalleryPage').then(m => ({ default: m.GalleryPage })));
const CaseStudiesPage = lazy(() => import('./CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const BlogPage = lazy(() => import('./BlogPage').then(m => ({ default: m.BlogPage })));
const CareerPage = lazy(() => import('./CareerPage').then(m => ({ default: m.CareerPage })));

export function HomePage() {
  const { t } = useTranslation();
  const { open } = useInquiryModal();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      <PageMeta
        title="Home"
        description="Global Logistics Solutions — International Freight Forwarding, Customs, Warehousing and Project Cargo."
        path="/"
        jsonLd={organizationJsonLd}
      />
      <section className="home-hero section--band">
        <div className="container home-hero__grid">
          <div className="home-hero__text">
            <h1>{t('home.heroTitle')}</h1>
            <p className="home-hero__lead">{t('home.heroLead')}</p>
            <div className="home-hero__actions">
              <button
                type="button"
                className="btn btn--on-dark hero-btn hero-btn--primary"
                onClick={() => {
                  trackCta('hero_quote');
                  open('/');
                }}
              >
                <span>{t('home.ctaQuote')}</span>
                <span className="hero-btn__arrow" aria-hidden="true">→</span>
              </button>
              <Link to="/services" className="btn btn--ghost-dark hero-btn hero-btn--ghost">
                <span>{t('home.ctaServices')}</span>
                <span className="hero-btn__arrow hero-btn__arrow--diag" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <img
            src="/images/hero-ship.jpg"
            alt="Cargo ship at modern port"
            className="home-hero__img"
          />
        </div>
      </section>

      {/* Live Shipment Tracking Section */}
      <ShipmentTracker />

      <section className="section">
        <div className="container">
          <h2>{t('home.whyTitle')}</h2>
          <div className="home-stats">
            {[
              { n: '15+', l: t('home.stat1') },
              { n: '40+', l: t('home.stat2') },
              { n: '6',   l: t('home.stat3') },
              { n: '24h', l: t('home.stat4') },
            ].map((s) => (
              <div key={s.l} className="card stat-card">
                <p className="stat-n">{s.n}</p>
                <p className="stat-l">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-services">
        <div className="container">
          <h2>{t('home.coreServices')}</h2>
          <div className="home-services__grid">
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card home-services__card">
                <h3>{t(`data.services.${s.slug}.title`, { defaultValue: s.title })}</h3>
                <p>{t(`data.services.${s.slug}.summary`, { defaultValue: s.summary })}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div id="about"><AboutPage embedded /></div>
      <Suspense fallback={<div className="section container">{t('home.loading')}</div>}>
        <div id="vision"><VisionPage embedded /></div>
        <div id="services"><ServicesPage embedded /></div>
        <div id="gallery"><GalleryPage embedded /></div>
        <div id="case-studies"><CaseStudiesPage embedded /></div>
        <div id="blog"><BlogPage embedded /></div>
        <div id="career"><CareerPage embedded /></div>
      </Suspense>

      {/* Comprehensive Logistics FAQ */}
      <section id="faq" className="section home-faq">
        <div className="container">
          <div className="home-faq__header">
            <span className="home-faq__badge">{t('faq.badge', 'Knowledge Base')}</span>
            <h2>{t('faq.title', 'Frequently Asked Questions')}</h2>
            <p className="home-faq__subtitle">
              {t('faq.subtitle', 'Answers regarding freight pricing, customs clearance, restricted commodities, and transit times.')}
            </p>
          </div>

          <div className="home-faq__list">
            <details className="card home-faq__item">
              <summary className="home-faq__question">
                <span>{t('faq.q1', 'How are freight shipping rates and chargeable weights calculated?')}</span>
                <span className="home-faq__chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="home-faq__answer">
                <p>
                  {t(
                    'faq.a1',
                    'Freight charges depend on whichever is greater: actual gross weight or volumetric (dimensional) weight. For air freight, the volumetric formula is (Length × Width × Height in cm) / 6000. For ocean LCL, rates are billed per CBM (cubic meter) or 1,000 kg. For overland GCC trucking, standard full truckload (FTL) rates apply or CBM-based LTL pricing.'
                  )}
                </p>
              </div>
            </details>

            <details className="card home-faq__item">
              <summary className="home-faq__question">
                <span>{t('faq.q2', 'What commodities are restricted, prohibited, or subject to special permits?')}</span>
                <span className="home-faq__chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="home-faq__answer">
                <p>
                  {t(
                    'faq.a2',
                    'Prohibited items include narcotics, unapproved pharmaceuticals, weapons, fireworks, and counterfeit goods. Regulated items requiring pre-approval include lithium batteries (requiring UN 38.3 test summaries & MSDS), chemicals/dangerous goods (requiring IATA/IMDG declarations), food and cosmetics (requiring SFDA pre-registration), and electronics/machinery (requiring SABER PCoC/SCoC).'
                  )}
                </p>
              </div>
            </details>

            <details className="card home-faq__item">
              <summary className="home-faq__question">
                <span>{t('faq.q3', 'What documentation is required for import customs clearance in Saudi Arabia?')}</span>
                <span className="home-faq__chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="home-faq__answer">
                <p>
                  {t(
                    'faq.a3',
                    'Standard import documentation includes: 1) Original Commercial Invoice with HS codes; 2) Detailed Packing List; 3) Clean Bill of Lading (B/L) or Air Waybill (AWB); 4) Attested Certificate of Origin; 5) SABER Shipment Certificate of Conformity (SCoC); and 6) SFDA import permit for food, medical, or cosmetics. Our licensed FASAH brokers can handle the full clearance workflow.'
                  )}
                </p>
              </div>
            </details>

            <details className="card home-faq__item">
              <summary className="home-faq__question">
                <span>{t('faq.q4', 'What are your typical transit times across Air, Ocean, and Land freight?')}</span>
                <span className="home-faq__chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="home-faq__answer">
                <p>
                  {t(
                    'faq.a4',
                    'Typical transit times: Air Freight: 1–3 business days for Express, 3–5 days for Standard. Overland GCC Trucking: 12–24 hours domestic intercity, 2–4 days cross-border. Ocean Freight: 14–22 days on Asia–Arabian Gulf routes, 18–28 days Europe–Middle East, and 28–38 days Americas–Middle East.'
                  )}
                </p>
              </div>
            </details>

            <details className="card home-faq__item">
              <summary className="home-faq__question">
                <span>{t('faq.q5', 'Can I track my shipment online, and how do I receive live status updates?')}</span>
                <span className="home-faq__chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="home-faq__answer">
                <p>
                  {t(
                    'faq.a5',
                    'Yes! You can enter your tracking reference (such as GLS-882914 or your Bill of Lading / AWB number) in the Live Shipment Tracker at the top of our homepage. We also provide automated SMS, WhatsApp, and email milestone notifications at each stage of transit.'
                  )}
                </p>
              </div>
            </details>

            <details className="card home-faq__item">
              <summary className="home-faq__question">
                <span>{t('faq.q6', 'How fast can I get a quotation, and how do I set up a corporate credit account?')}</span>
                <span className="home-faq__chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="home-faq__answer">
                <p>
                  {t(
                    'faq.a6',
                    'Click "Get a Quote" anywhere on the site or email sales@global-logisticssolution.com. We respond within 24 hours. For regular commercial shippers, our accounts department (accounts@global-logisticssolution.com) offers 30-day corporate credit facilities upon credit verification.'
                  )}
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
