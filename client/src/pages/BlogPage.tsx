import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import { getJson } from '@/api/client';
import '@/styles/card-list.css';

type PostListItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
};

type BlogPageProps = {
  embedded?: boolean;
};

export function BlogPage({ embedded }: BlogPageProps) {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<PostListItem[]>([]);

  useEffect(() => {
    getJson<PostListItem[]>('/api/blog')
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <>
      {!embedded && (
        <PageMeta title={t('blog.heroTitle')} description="Insights on freight, customs and project cargo from GLS." path="/blog" />
      )}
      <section className="section">
        <div className="container">
          <h1>{t('blog.heroTitle')}</h1>
          <div className="card-list">
            {posts.map((p) => (
              <article key={p.slug} className="card entry-card">
                <p className="entry-card__meta">
                  {p.publishedAt} · {t(`data.blog.${p.slug}.author`, { defaultValue: p.author })}
                </p>
                <h2 className="entry-card__title">
                  <Link to={`/blog/${p.slug}`}>{t(`data.blog.${p.slug}.title`, { defaultValue: p.title })}</Link>
                </h2>
                <p className="entry-card__excerpt">{t(`data.blog.${p.slug}.excerpt`, { defaultValue: p.excerpt })}</p>
              </article>
            ))}
            {posts.length === 0 && <p>{t('blog.noPosts')}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
