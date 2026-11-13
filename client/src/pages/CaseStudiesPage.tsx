import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import { caseStudies } from '@/content/caseStudies';
import '@/styles/card-list.css';

type CaseStudiesPageProps = {
  embedded?: boolean;
};

export function CaseStudiesPage({ embedded }: CaseStudiesPageProps) {
  const { t } = useTranslation();
  return (
    <>
      {!embedded && (
        <PageMeta title={t('caseStudies.heroTitle')} description="GLS project and exhibition logistics case studies." path="/case-studies" />
      )}
      <section className="section">
        <div className="container">
          <h1>{t('caseStudies.heroTitle')}</h1>
          <div className="card-list">
            {caseStudies.map((c) => (
              <Link key={c.slug} to={`/case-studies/${c.slug}`} className="card entry-card">
                <p className="entry-card__meta">{t(`data.caseStudies.${c.slug}.cargoType`, { defaultValue: c.cargoType })}</p>
                <h2 className="entry-card__title">{t(`data.caseStudies.${c.slug}.title`, { defaultValue: c.title })}</h2>
                <p className="entry-card__excerpt">{t(`data.caseStudies.${c.slug}.excerpt`, { defaultValue: c.excerpt })}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
