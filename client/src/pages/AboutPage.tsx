import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { trackCta } from '@/utils/analytics';
import aboutLogisticsImg from '@/assets/about_logistics_collage.jpg';
import './AboutPage.css';

/* const team = [
  { id: 'zoya', name: 'Zoya Falak', role: 'Managing Director', bio: '3 years of experience in tech, Deals with requests.' },
  { id: 'ashique', name: 'Ashique Ali', role: 'Shipping & Logistics', bio: '20 years in regional forwarding and compliance.' },
  { id: 'hasnain', name: 'Hasnain Ali', role: 'Customs Lead', bio: 'Former carrier planner focused on schedule reliability.' },
  { id: 'mohsin', name: 'Mohsin Ali', role: 'Project Cargo', bio: 'Heavy lift specialist for energy and EPC clients.' },
]; */

const partners = ['FIATA', 'IATA Cargo Agent', 'JAFZA Operator', 'Singapore Logistics Association'];

type AboutPageProps = {
  embedded?: boolean;
};

export function AboutPage({ embedded }: AboutPageProps) {
  const { open } = useInquiryModal();
  const { t } = useTranslation();

  return (
    <>
      {!embedded && (
        <PageMeta
          title="About"
          description="Meet Global Logistics Solutions — our story, mission, team and global partner network."
          path="/about"
        />
      )}

      <section className="about-hero section--band">
        <div className="container about-hero__inner">
          <div>
            <h1>{t('about.heroTitle')}</h1>
            <div className="about-hero__lead">
              {String(t('about.heroLead') || '')
                .split('\n\n')
                .map((para, i) => (
                  <p key={i} style={{ marginBottom: '1rem' }}>
                    {para}
                  </p>
                ))}
            </div>
            <div className="about-hero__actions">
              <a href="#story" className="btn btn--on-dark">
                {t('about.readStory')}
              </a>
              <a href="#mission" className="btn btn--ghost-dark">
                {t('about.ourMission', 'Our Mission')}
              </a>
            </div>
          </div>
          <div className="about-hero__image-wrapper">
            <img src={aboutLogisticsImg} alt="Logistics Operations" />
          </div>
        </div>
      </section>

      <section id="story" className="section">
        <div className="container about-company">
          <div className="about-company__text">
            <h2>{t('about.companyTitle')}</h2>
            <p>
              {t('about.companyP1')}
            </p>
            <p>
              {t('about.companyP2')}
            </p>
            <div className="about-company__stats">
              {[
                { n: '100+', l: t('about.globalPartners', 'Global Partners') },
                { n: '500+', l: t('about.successfulShipments', 'Successful Shipments') },
                { n: '20+', l: t('about.countries', 'Countries Served') },
                { n: '24/7', l: t('about.customerSupport', 'Customer Support') },
              ].map((f) => (
                <div key={f.l} className="card stat-card">
                  <p className="stat-n">{f.n}</p>
                  <p className="stat-l">{f.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-company__image">
            <img
              src={aboutLogisticsImg}
              alt="GBL logistics operations: ships, cargo, airplanes, and warehouses"
              className="about-company__photo"
            />
          </div>
        </div>
      </section>

      <section id="mission" className="section about-mission">
        <div className="container">
          <h2>{t('about.missionTitle')}</h2>
          <div className="about-values">
            {[
              { t: t('about.val1Title'), d: t('about.val1Desc') },
              { t: t('about.val2Title'), d: t('about.val2Desc') },
              { t: t('about.val3Title'), d: t('about.val3Desc') },
            ].map((v) => (
              <div key={v.t} className="card about-values__col">
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-video">
          <div>
            <h2>{t('about.videoTitle')}</h2>
            <p style={{ marginBottom: '1rem' }}>
              {t('about.videoP1')}
            </p>
            <p>
              {t('about.videoP2')}
            </p>
          </div>
          <div className="about-video__player">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/video-thumb.jpg"
            >
              <source src="/videos/how-we-work.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/*
      <section id="team" className="section">
        <div className="container">
          <h2>{t('about.teamTitle')}</h2>
          <div className="about-team">
            {team.map((m) => (
              <article key={m.id} className="card about-team__card">
                <div className="about-team__avatar" aria-hidden />
                <h3>{t(`data.team.${m.id}.name`, { defaultValue: m.name })}</h3>
                <p className="about-team__role">{t(`data.team.${m.id}.role`, { defaultValue: m.role })}</p>
                <p>{t(`data.team.${m.id}.bio`, { defaultValue: m.bio })}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      */}

      <section className="section">
        <div className="container">
          <h2>{t('about.networkTitle')}</h2>
          <p>{t('about.networkDesc')}</p>
          <ul className="about-partners">
            {partners.map((p) => (
              <li key={p} className="about-partners__chip">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-cta section--band">
        <div className="container about-cta__inner">
          <h2>{t('about.ctaTitle')}</h2>
          <p>{t('about.ctaDesc')}</p>
          <button
            type="button"
            className="btn btn--on-dark"
            onClick={() => {
              trackCta('about_cta');
              open('/about');
            }}
          >
            {t('about.ctaBtn')}
          </button>
        </div>
      </section>
    </>
  );
}
