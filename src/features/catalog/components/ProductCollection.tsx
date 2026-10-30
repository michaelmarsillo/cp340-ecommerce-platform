import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, catalogFilters } from '../data/products';
import type { CatalogFilter } from '../data/products';
import type { Product } from '../types';
import { ProductIllustration } from './ProductIllustration';
import { ProductDetails } from './ProductDetails';
import { formatCurrency } from '../../../lib/formatCurrency';
import '../catalog.css';
import { useCart } from '../../cart/context';
import { addItem } from '../../cart/cart';
import { flyToCart } from '../../cart/flyToCart';

type ProductCollectionProps = {
  variant?: 'preview' | 'full';
};

export function ProductCollection({ variant = 'preview' }: ProductCollectionProps) {
  const { items, add } = useCart();
  const isFullCollection = variant === 'full';
  const [filter, setFilter] = useState<CatalogFilter>('All rituals');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const visibleProducts = products.filter(
    (product) => filter === 'All rituals' || product.category === filter,
  );

  return (
    <section
      className={`collection-section container ${isFullCollection ? 'collection-full' : 'section-space'}`}
      id="collection"
      aria-labelledby="collection-title"
    >
      {isFullCollection ? (
        <h2 id="collection-title" className="collection-grid-title">
          Find your everyday.
        </h2>
      ) : (
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
      )}
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
          {isFullCollection
            ? `${visibleProducts.length} of ${products.length} products`
            : `${visibleProducts.length} little possibilities`}
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
            {isFullCollection && (
              <div className="product-specification">
                <span>{product.category}</span>
                <span>{product.format}</span>
              </div>
            )}
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
            <button
              className="product-add"
              type="button"
              onClick={(event) => {
                const art =
                  event.currentTarget
                    .closest('.product-card')
                    ?.querySelector('.product-illustration') ?? null;
                add(product.id);
                flyToCart(art);
              }}
              disabled={addItem(items, product.id) === items}
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={16} aria-hidden="true" /> Add to cart
            </button>
          </article>
        ))}
      </div>
      <p className="collection-note">
        {isFullCollection
          ? 'Thoughtfully imagined. Our concept products and prices are illustrative; nothing is available to purchase.'
          : 'A peek at our concept collection. All products and prices are illustrative.'}
      </p>
      {!isFullCollection && (
        <Link className="text-link collection-page-link" to="/collection">
          View all products <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      )}
      <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
