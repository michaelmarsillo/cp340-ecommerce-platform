import { useEffect, useRef, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { products } from '../catalog/data/products';
import { CheckoutButton } from '../checkout/CheckoutButton';
import { useCart } from './context';
import { cartTotalCents, MAX_QUANTITY } from './cart';
import './cart.css';
import '../checkout/checkout.css';

const money = (cents: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(cents / 100);

export function CartDrawer({
  onClose,
  triggerRef,
}: {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { items, update, remove } = useCart();
  const lines = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [triggerRef]);

  return (
    <dialog
      ref={dialogRef}
      className="cart-drawer"
      aria-labelledby="cart-drawer-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="cart-drawer-header">
        <div>
          <span className="eyebrow">YOUR CART / TEST CHECKOUT</span>
          <h2 id="cart-drawer-title">Your little rituals.</h2>
        </div>
        <button
          className="cart-drawer-close"
          type="button"
          onClick={onClose}
          aria-label="Close cart"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      {lines.length === 0 ? (
        <div className="cart-drawer-empty">
          <ShoppingBag size={34} aria-hidden="true" />
          <h3>Your cart is taking a breather.</h3>
          <p>Explore the collection and add a ritual that feels right for you.</p>
          <Link className="button" to="/collection" onClick={onClose}>
            Explore products
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-drawer-body">
            <ul className="cart-drawer-lines">
              {lines.map(({ product, quantity }) => (
                <li className="cart-drawer-line" key={product.id}>
                  <div className="cart-drawer-line-top">
                    <div>
                      <span className="eyebrow">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.format}</p>
                      <p>{money(Math.round(product.price * 100))} CAD each</p>
                    </div>
                    <strong>{money(Math.round(product.price * 100) * quantity)} CAD</strong>
                  </div>
                  <div className="cart-line-actions">
                    <div
                      className="quantity-control"
                      role="group"
                      aria-label={`${product.name} quantity`}
                    >
                      <button
                        type="button"
                        onClick={() => update(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label={`Decrease ${product.name} quantity`}
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <output aria-label={`${product.name} quantity`}>{quantity}</output>
                      <button
                        type="button"
                        onClick={() => update(product.id, quantity + 1)}
                        disabled={quantity >= MAX_QUANTITY}
                        aria-label={`Increase ${product.name} quantity`}
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      className="cart-remove"
                      type="button"
                      onClick={() => remove(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <Trash2 size={16} aria-hidden="true" /> Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Link className="text-link cart-drawer-more" to="/collection" onClick={onClose}>
              Add more products
            </Link>
          </div>
          <div className="cart-drawer-summary">
            <div>
              <span>{items.reduce((count, item) => count + item.quantity, 0)} items</span>
              <span>Tax and shipping {money(0)}</span>
            </div>
            <div className="cart-drawer-total">
              <strong>Total</strong>
              <strong>{money(cartTotalCents(items))} CAD</strong>
            </div>
            <CheckoutButton items={items} />
            <p>Stripe test checkout only. No real money is charged or products shipped.</p>
          </div>
        </>
      )}
    </dialog>
  );
}
