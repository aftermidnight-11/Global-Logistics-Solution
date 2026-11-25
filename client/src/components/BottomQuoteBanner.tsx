import { useTranslation } from 'react-i18next';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { trackCta } from '@/utils/analytics';
import './BottomQuoteBanner.css';

export function BottomQuoteBanner() {
  const { t } = useTranslation();
  const { open } = useInquiryModal();

  const handleQuoteClick = () => {
    trackCta('bottom_banner_quote');
    open(window.location.pathname);
  };

  return (
    <section className="bottom-quote-banner" aria-label="Request a freight quote">
      <div className="container bottom-quote-banner__inner">
        <div className="bottom-quote-banner__content">
          <div className="bottom-quote-banner__tag">
            {t('quoteBanner.tag', 'Worldwide Freight & Customs')}
          </div>
          <h2 className="bottom-quote-banner__title">
            {t('quoteBanner.title', 'Ready to Ship with Total Visibility & Zero Friction?')}
          </h2>
          <p className="bottom-quote-banner__desc">
            {t(
              'quoteBanner.desc',
              'Get competitive rates for Air, Ocean, Land freight and rapid customs clearance. Guaranteed response from our logistics specialists within 24 hours.'
            )}
          </p>
        </div>
        <div className="bottom-quote-banner__action">
          <button
            type="button"
            className="btn btn--primary bottom-quote-banner__btn"
            onClick={handleQuoteClick}
          >
            <span>{t('home.ctaQuote', 'Get a Quote')}</span>
            <span aria-hidden="true">→</span>
          </button>
          <p className="bottom-quote-banner__note">
            {t('quoteBanner.note', 'Direct Desk:')} <a href="mailto:sales@global-logisticssolution.com">sales@global-logisticssolution.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
