import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '@/components/PageMeta';
import { galleryItems, type GalleryItem } from '@/content/gallery';
import './GalleryPage.css';

const categories = ['All', 'Port', 'Warehouse', 'Air', 'Heavy lift', 'Events'] as const;

const imageMap: Record<string, string> = {
  Port: '/images/gallery-port.jpg',
  Warehouse: '/images/gallery-warehouse.jpg',
  Air: '/images/gallery-air.jpg',
  'Heavy lift': '/images/gallery-heavy.jpg',
  Events: '/images/gallery-events.jpg',
};

type GalleryPageProps = {
  embedded?: boolean;
};

export function GalleryPage({ embedded }: GalleryPageProps) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const filtered =
    filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      const idx = filtered.findIndex((g) => g.id === lightbox!.id);
      if (e.key === 'ArrowRight' && idx < filtered.length - 1) setLightbox(filtered[idx + 1]);
      if (e.key === 'ArrowLeft' && idx > 0) setLightbox(filtered[idx - 1]);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, filtered, close]);

  return (
    <>
      {!embedded && (
        <PageMeta title={t('gallery.heroTitle')} description="Operations gallery — port, warehouse, air and project cargo." path="/gallery" />
      )}
      <section className="section">
        <div className="container">
          <h1>{t('gallery.heroTitle')}</h1>
          <div className="gallery-filters" role="tablist" aria-label="Categories">
            {categories.map((c) => {
              const labelMap: Record<string, string> = {
                All: t('gallery.catAll'),
                Port: t('gallery.catPort'),
                Warehouse: t('gallery.catWarehouse'),
                Air: t('gallery.catAir'),
                'Heavy lift': t('gallery.catHeavy'),
                Events: t('gallery.catEvents')
              };
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  className={filter === c ? 'gallery-filters__btn is-active' : 'gallery-filters__btn'}
                  onClick={() => setFilter(c)}
                >
                  {labelMap[c] || c}
                </button>
              );
            })}
          </div>
          <div className="gallery-grid">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                className="gallery-card"
                onClick={() => setLightbox(item)}
                aria-label={`Open ${t(`data.gallery.${item.id}.title`, { defaultValue: item.title })}`}
              >
                <div className="gallery-card__img-wrap">
                  <img 
                    src={item.image || imageMap[item.category] || '/images/gallery-port.jpg'} 
                    alt={t(`data.gallery.${item.id}.title`, { defaultValue: item.title })}
                  />
                </div>
                <div className="gallery-card__body">
                  <p className="gallery-card__title">{t(`data.gallery.${item.id}.title`, { defaultValue: item.title })}</p>
                  <span className="gallery-card__cat">{item.category === 'Heavy lift' ? t('gallery.catHeavy') : t(`gallery.cat${item.category}`)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={t(`data.gallery.${lightbox.id}.title`, { defaultValue: lightbox.title })} onClick={close}>
          <div className="gallery-lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="gallery-lightbox__close" onClick={close} aria-label="Close">
              ×
            </button>
            <img 
              src={lightbox.image || imageMap[lightbox.category] || '/images/gallery-port.jpg'} 
              alt={t(`data.gallery.${lightbox.id}.title`, { defaultValue: lightbox.title })}
              style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', display: 'block', marginBottom: '1rem' }}
            />
            <p>{t(`data.gallery.${lightbox.id}.title`, { defaultValue: lightbox.title })}</p>
            <p className="sr-only">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
