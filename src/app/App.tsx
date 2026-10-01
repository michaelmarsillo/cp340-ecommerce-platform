import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { ProductCollection } from '../features/catalog/components/ProductCollection';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <div className="container">
          <h1>Moss & Mind</h1>
          <p>A little more balance. One semester at a time.</p>
        </div>
        <ProductCollection />
      </main>
      <SiteFooter />
    </>
  );
}
