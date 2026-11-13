import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense, useEffect } from 'react';
import { PageMeta, organizationJsonLd } from '@/components/PageMeta';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { trackCta } from '@/utils/analytics';
import { services } from '@/content/services';
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
        description="Global Logistics Solutions — international freight forwarding, customs, warehousing and project cargo."
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
                className="btn btn--on-dark"
                onClick={() => {
                  trackCta('hero_quote');
                  open('/');
                }}
              >
                {t('home.ctaQuote')}
              </button>
              <Link to="/services" className="btn btn--ghost-dark">
                {t('home.ctaServices')}
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
    </>
  );
}
