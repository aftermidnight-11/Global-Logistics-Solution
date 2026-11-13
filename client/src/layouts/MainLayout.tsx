import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { InquiryModal } from '@/components/InquiryModal';
import { CookieConsent } from '@/components/CookieConsent';
import { FloatingContact } from '@/components/FloatingContact';

export function MainLayout() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main id="main-content">
        <Outlet />
      </main>
      <SiteFooter />
      <InquiryModal />
      <CookieConsent />
      <FloatingContact />
    </>
  );
}
