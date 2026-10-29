import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { CollectionPage } from '../features/catalog/CollectionPage';
import { HomePage } from '../features/home/HomePage';
import { BlogPage } from '../features/blog/BlogPage';
import { PrivacyPage } from '../features/privacy/PrivacyPage';
import { NotFoundPage } from './NotFoundPage';
import { RouteEffects } from './RouteEffects';
import { CheckoutResultPage } from '../features/checkout/CheckoutResultPage';
import { CartProvider } from '../features/cart/CartContext';
import { CartPage } from '../features/cart/CartPage';

const AboutPage = lazy(() =>
  import('../features/about/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })),
);

export function App() {
  return (
    <CartProvider>
      <RouteEffects />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route
            path="/about"
            element={
              <Suspense
                fallback={
                  <p className="container route-loading" role="status">
                    Loading About...
                  </p>
                }
              >
                <AboutPage />
              </Suspense>
            }
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout/success" element={<CheckoutResultPage key="success" />} />
          <Route path="/checkout/cancel" element={<CheckoutResultPage key="cancel" canceled />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </CartProvider>
  );
}
