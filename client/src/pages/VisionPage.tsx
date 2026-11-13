import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import './VisionPage.css';

type VisionPageProps = {
  embedded?: boolean;
};

export function VisionPage({ embedded }: VisionPageProps) {
  const { t } = useTranslation();

  return (
    <>
      {!embedded && (
        <PageMeta
          title={t('vision.heroTitle')}
          description="Global Logistics Solutions vision for transparent, resilient global supply chains."
          path="/vision"
        />
      )}
      <section className="section section--band vision-hero">
        <div className="container">
          <h1>{t('vision.heroTitle')}</h1>
          <p className="vision-hero__lead">
            {t('vision.heroDesc')}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>{t('vision.prioritiesTitle')}</h2>
          <ul className="vision-priorities">
            <li>{t('vision.p1')}</li>
            <li>{t('vision.p2')}</li>
            <li>{t('vision.p3')}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
