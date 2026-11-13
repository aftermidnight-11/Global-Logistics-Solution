import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import { services } from '@/content/services';
import { trackEvent } from '@/utils/analytics';
import { useEffect } from 'react';
import './ServicesPage.css';

type ServicesPageProps = {
  embedded?: boolean;
};

export function ServicesPage({ embedded }: ServicesPageProps) {
  const { t } = useTranslation();

  useEffect(() => {
    trackEvent('service_view', { page: 'overview' });
  }, []);

  return (
    <>
      {!embedded && (
        <PageMeta
          title={t('services.heroTitle')}
          description="Freight forwarding, air and ocean freight, customs, warehousing, heavy cargo and more."
          path="/services"
        />
      )}
      <section className="section">
        <div className="container">
          <h1>{t('services.heroTitle')}</h1>
          <p className="prose">
            {t('services.heroDesc')}
          </p>
          <div className="services-grid">
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card services-card">
                <h3>{t(`data.services.${s.slug}.title`, { defaultValue: s.title })}</h3>
                <p>{t(`data.services.${s.slug}.summary`, { defaultValue: s.summary })}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
