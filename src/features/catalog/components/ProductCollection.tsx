import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { products, catalogFilters } from '../data/products';
import type { CatalogFilter } from '../data/products';
import type { Product } from '../types';
import { ProductIllustration } from './ProductIllustration';
import { ProductDetails } from './ProductDetails';
import { formatCurrency } from '../../../lib/formatCurrency';
import '../catalog.css';

export function ProductCollection() {
  const [filter, setFilter] = useState<CatalogFilter>('All rituals');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const visibleProducts = products.filter(
    (product) => filter === 'All rituals' || product.category === filter,
  );

  return (
    <section
      className="collection-section section-space container"
      id="collection"
      aria-labelledby="collection-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE EVERYDAY COLLECTION</span>
          <h2 id="collection-title">
            Small rituals. <em>Fresh starts.</em>
          </h2>
        </div>
        <p>
          For the early lectures, the late chapters,
          <br className="desktop-break" /> and everything in between.
        </p>
      </div>
      <div className="collection-toolbar">
        <div className="collection-filters" role="group" aria-label="Filter the collection">
          {catalogFilters.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-button ${filter === category ? 'is-active' : ''}`}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="collection-count" aria-live="polite">
          {visibleProducts.length} little possibilities
        </span>
      </div>
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <button
              type="button"
              className={`product-art tone-${product.tone}`}
              onClick={() => setSelectedProduct(product)}
              aria-label={`Explore ${product.name}`}
            >
              <span className="product-tag">{product.tag}</span>
              <div className="product-art-halo" aria-hidden="true" />
              <ProductIllustration
                name={product.name}
                tone={product.tone}
                variant={product.illustration}
              />
              <span className="product-open" aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
            </button>
            <div className="product-info">
              <div>
                <h3>
                  <button type="button" onClick={() => setSelectedProduct(product)}>
                    {product.name}
                  </button>
                </h3>
                <p>{product.subtitle}</p>
              </div>
              <span className="product-price">
                {formatCurrency(product.price)} <small>CAD</small>
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="collection-note">
        A peek at our concept collection. All products and prices are illustrative.
      </p>
      <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
