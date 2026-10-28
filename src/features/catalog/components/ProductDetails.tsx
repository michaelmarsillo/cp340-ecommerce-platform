import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../types';
import { ProductIllustration } from './ProductIllustration';
import { formatCurrency } from '../../../lib/formatCurrency';
import { CheckoutButton } from '../../checkout/CheckoutButton';
import '../../checkout/checkout.css';

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
          Try a secure Stripe test payment. Use test card details only; no real money is charged and
          no product is shipped. The listed CAD price is the full demo total, with no added shipping
          or tax.
        </p>
        <CheckoutButton key={product.id} items={[{ productId: product.id, quantity: 1 }]} />
        <button type="button" className="text-link dialog-keep-exploring" onClick={onClose}>
          Keep exploring
        </button>
      </div>
    </dialog>
  );
}
