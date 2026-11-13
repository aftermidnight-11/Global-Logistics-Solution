import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import { getJson } from '@/api/client';
import { NotFoundPage } from './NotFoundPage';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  body?: string;
  content?: string;
};

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [missing, setMissing] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (!slug) return;
    getJson<Post>(`/api/blog/${slug}`)
      .then(setPost)
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing) return <NotFoundPage />;
  if (!post) return null;

  const rawBody = post.body || post.content || '';
  const translatedBody = t(`data.blog.${post.slug}.body`, { defaultValue: rawBody });

  return (
    <>
      <PageMeta title={t(`data.blog.${post.slug}.title`, { defaultValue: post.title })} description={t(`data.blog.${post.slug}.excerpt`, { defaultValue: post.excerpt })} path={`/blog/${post.slug}`} />
      <section className="section">
        <div className="container prose">
          <p>
            <Link to="/blog" style={{ textDecoration: 'none', fontWeight: 600 }}>
              ← {t('blog.backToBlog', 'Back to Blog')}
            </Link>
          </p>
          <h1>{t(`data.blog.${post.slug}.title`, { defaultValue: post.title })}</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {post.publishedAt} · {t(`data.blog.${post.slug}.author`, { defaultValue: post.author })}
          </p>
          {translatedBody.split('\n\n').map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </section>
    </>
  );
}
