import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { getCaseStudy } from '@/content/caseStudies';
import { NotFoundPage } from './NotFoundPage';

export function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = slug ? getCaseStudy(slug) : undefined;
  if (!study) return <NotFoundPage />;

  return (
    <>
      <PageMeta title={study.title} description={study.excerpt} path={`/case-studies/${study.slug}`} />
      <section className="section">
        <div className="container">
          <p>
            <Link to="/case-studies">Case studies</Link>
          </p>
          <h1>{study.title}</h1>
          <p>
            <strong>Cargo type:</strong> {study.cargoType}
          </p>
          <h2>Challenge</h2>
          <p>{study.challenge}</p>
          <h2>Solution</h2>
          <p>{study.solution}</p>
          <h2>Result</h2>
          <p>{study.result}</p>
        </div>
      </section>
    </>
  );
}
