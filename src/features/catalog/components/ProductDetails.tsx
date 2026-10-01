import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../types';
import { ProductIllustration } from './ProductIllustration';
import { formatCurrency } from '../../../lib/formatCurrency';

type ProductDetailsProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!product || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [product]);

  if (!product) return null;

  return (
    <dialog
      ref={dialogRef}
      className="product-dialog"
      aria-labelledby="product-dialog-title"
      aria-describedby="product-dialog-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        type="button"
        onClick={onClose}
        aria-label="Close product details"
      >
        <X size={22} aria-hidden="true" />
      </button>
      <div className={`dialog-art tone-${product.tone}`}>
        <ProductIllustration
          name={product.name}
          tone={product.tone}
          variant={product.illustration}
        />
      </div>
      <div className="dialog-copy">
        <span className="eyebrow">{product.category} · Concept collection</span>
        <h2 id="product-dialog-title">{product.name}</h2>
        <p id="product-dialog-description">{product.description}</p>
        <div className="dialog-meta">
          <span>{product.format}</span>
          <strong>{formatCurrency(product.price)} CAD</strong>
        </div>
        <p className="dialog-note">
          For a class project. This product is not available to purchase.
        </p>
        <button type="button" className="button" onClick={onClose}>
          Keep exploring
        </button>
      </div>
    </dialog>
  );
}
