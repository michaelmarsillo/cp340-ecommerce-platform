import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { CollectionPage } from '../features/catalog/CollectionPage';
import { HomePage } from '../features/home/HomePage';
import { BlogPage } from '../features/blog/BlogPage';

const AboutPage = lazy(() =>
  import('../features/about/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })),
);

export function App() {
  return (
    <>
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
              <Suspense fallback={null}>
                <AboutPage />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
