/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/HomePage';

// الصفحة الرئيسية تُحمَّل فوراً، وباقي الصفحات تُحمَّل عند فتحها فقط لتسريع أول زيارة
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const CollectionsPage = lazy(() =>
  import('./pages/CollectionsPage').then((m) => ({ default: m.CollectionsPage }))
);
const CollectionDetailPage = lazy(() =>
  import('./pages/CollectionDetailPage').then((m) => ({ default: m.CollectionDetailPage }))
);
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ArticlesPage = lazy(() => import('./pages/EditorialPages').then((m) => ({ default: m.ArticlesPage })));
const ContactPage = lazy(() => import('./pages/EditorialPages').then((m) => ({ default: m.ContactPage })));
const GalleryPage = lazy(() => import('./pages/EditorialPages').then((m) => ({ default: m.GalleryPage })));
const OffersPage = lazy(() => import('./pages/EditorialPages').then((m) => ({ default: m.OffersPage })));
const StaticContentPage = lazy(() =>
  import('./pages/EditorialPages').then((m) => ({ default: m.StaticContentPage }))
);

/** يظهر لجزء من الثانية أثناء تحميل صفحة لأول مرة (الهيدر والفوتر يبقيان ظاهرين). */
const PageFallback: React.FC = () => <div className="min-h-[60vh]" aria-busy="true" />;

import { Language } from './types/cms';

// Keep the Admin bundle separate from the public website via code splitting
const AdminPortal = lazy(() => import('./admin/AdminPortal'));

const LanguageRoutes: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <PublicLayout lang={lang}>
      <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route index element={<HomePage lang={lang} />} />
        <Route path="products" element={<ProductsPage lang={lang} />} />
        <Route path="products/:slug" element={<ProductDetailPage lang={lang} />} />
        <Route path="collections" element={<CollectionsPage lang={lang} />} />
        <Route path="collections/:slug" element={<CollectionDetailPage lang={lang} />} />
        <Route path="services" element={<ServicesPage lang={lang} />} />
        <Route path="about" element={<StaticContentPage lang={lang} pageKey="about" />} />
        <Route path="gallery" element={<GalleryPage lang={lang} />} />
        <Route path="articles" element={<ArticlesPage lang={lang} />} />
        <Route path="offers" element={<OffersPage lang={lang} />} />
        <Route path="contact" element={<ContactPage lang={lang} />} />
        <Route path="privacy" element={<StaticContentPage lang={lang} pageKey="privacy" />} />
        <Route path="terms" element={<StaticContentPage lang={lang} pageKey="terms" />} />
        <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
      </Routes>
      </Suspense>
    </PublicLayout>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <BrowserRouter>
        <Routes>
          {/* Root route renders Arabic Royal Atelier by default while keeping /ar and /en symmetric */}
          <Route
            path="/"
            element={
              <PublicLayout lang="ar">
                <HomePage lang="ar" />
              </PublicLayout>
            }
          />

          {/* Arabic RTL Routes (/ar and /ar/*) */}
          <Route path="/ar/*" element={<LanguageRoutes lang="ar" />} />

          {/* English LTR Routes (/en and /en/*) */}
          <Route path="/en/*" element={<LanguageRoutes lang="en" />} />

          {/* Separate Code-Split Admin Area (/admin) — Not shown in public navigation */}
          <Route
            path="/admin/*"
            element={
              <Suspense
                fallback={
                  <div className="min-h-screen bg-[#090909] text-[#C9A24A] flex items-center justify-center text-xs uppercase tracking-[0.2em]">
                    Loading KINGSMEN LINE Atelier Command Center...
                  </div>
                }
              >
                <AdminPortal />
              </Suspense>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/ar" replace />} />
        </Routes>
      </BrowserRouter>
    </CMSProvider>
  );
}
