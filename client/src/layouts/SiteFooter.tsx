import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './SiteFooter.css';

const CURRENT_YEAR = new Date().getFullYear();

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__brand">{t('footer.brand')}</p>
          <p className="site-footer__muted">
            {t('footer.address')}
            <br />
            {t('footer.email')}
          </p>
        </div>
        <div>
          <p className="site-footer__heading">{t('footer.links')}</p>
          <ul className="site-footer__links">
            <li><Link to="/services">{t('footer.services')}</Link></li>
            <li><Link to="/about">{t('footer.about')}</Link></li>
            <li><Link to="/career">{t('footer.careers')}</Link></li>
            <li><Link to="/contact">{t('footer.contact')}</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li>
              <a href="https://tracking.global-logisticssolution.com" target="_blank" rel="noopener noreferrer">
                {t('footer.tracking')}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="site-footer__heading">{t('footer.social')}</p>
          <ul className="site-footer__links">
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                {t('footer.linkedin')}
              </a>
            </li>
            <li>
              <a href="https://wa.me/97140000000" target="_blank" rel="noopener noreferrer">
                {t('footer.whatsapp')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© {CURRENT_YEAR} {t('footer.copyright')}</span>
        <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/privacy">{t('footer.privacy', 'Privacy Policy')}</Link>
          <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
          <Link to="/terms">{t('footer.terms', 'Terms & Claims')}</Link>
          <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
          <Link to="/cookies">{t('footer.cookies', 'Cookie Policy')}</Link>
        </div>
      </div>
    </footer>
  );
}
