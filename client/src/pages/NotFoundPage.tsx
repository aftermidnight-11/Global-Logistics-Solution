import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';

export function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page not found" description="The page you requested could not be found." />
      <section className="section">
        <div className="container">
          <h1>404</h1>
          <p>We couldn&apos;t find that page.</p>
          <Link to="/" className="btn btn--primary">
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
