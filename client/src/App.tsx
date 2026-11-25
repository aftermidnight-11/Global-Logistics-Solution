import { Component, lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { InquiryModalProvider } from '@/hooks/useInquiryModal';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const VisionPage = lazy(() => import('@/pages/VisionPage').then((m) => ({ default: m.VisionPage })));
const CareerPage = lazy(() => import('@/pages/CareerPage').then((m) => ({ default: m.CareerPage })));
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const CaseStudiesPage = lazy(() =>
  import('@/pages/CaseStudiesPage').then((m) => ({ default: m.CaseStudiesPage }))
);
const CaseStudyDetailPage = lazy(() =>
  import('@/pages/CaseStudyDetailPage').then((m) => ({ default: m.CaseStudyDetailPage }))
);
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const AdminPage = lazy(() => import('@/pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const UserPage = lazy(() => import('@/pages/UserPage').then((m) => ({ default: m.UserPage })));
const CookiePage = lazy(() => import('@/pages/CookiePage').then((m) => ({ default: m.CookiePage })));
const TermsPage = lazy(() => import('@/pages/TermsPage').then((m) => ({ default: m.TermsPage })));

function Fallback() {
  return <div className="section container">Loading…</div>;
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h2 style={{ color: '#ff6b2c' }}>Something went wrong</h2>
          <pre style={{ fontSize: '0.8rem', color: '#888', whiteSpace: 'pre-wrap', margin: '1rem auto', maxWidth: '600px' }}>
            {(this.state.error as Error).message}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '0.6rem 1.5rem', background: '#ff6b2c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <InquiryModalProvider>
            <Suspense fallback={<Fallback />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="vision" element={<VisionPage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="services/:slug" element={<ServiceDetailPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="privacy" element={<PrivacyPage />} />
                  <Route path="terms" element={<TermsPage />} />
                  <Route path="cookies" element={<CookiePage />} />
                  <Route path="career" element={<CareerPage />} />
                  <Route path="gallery" element={<GalleryPage />} />
                  <Route path="case-studies" element={<CaseStudiesPage />} />
                  <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
                  <Route path="blog" element={<BlogPage />} />
                  <Route path="blog/:slug" element={<BlogPostPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="account" element={<UserPage />} />
                  <Route path="user" element={<Navigate to="/account" replace />} />
                  <Route path="user-page" element={<Navigate to="/account" replace />} />
                  <Route path="profile" element={<Navigate to="/account" replace />} />
                  <Route path="dashboard" element={<Navigate to="/account" replace />} />
                  <Route path="404" element={<NotFoundPage />} />
                </Route>
                <Route path="admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </InquiryModalProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
