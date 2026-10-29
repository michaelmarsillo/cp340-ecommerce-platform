import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { products } from '../catalog/data/products';
import { ProductIllustration } from '../catalog/components/ProductIllustration';
import { CheckoutButton } from '../checkout/CheckoutButton';
import { useCart } from './context';
import { cartTotalCents, MAX_QUANTITY } from './cart';
import './cart.css';
import '../checkout/checkout.css';

const money = (cents: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(cents / 100);

export function CartPage() {
  const { items, update, remove } = useCart();
  const lines = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });

  return (
    <div className="cart-page">
      <PageHeader
        eyebrow="YOUR CART / TEST CHECKOUT"
        title={
          <>
            A little something <em>for your day.</em>
          </>
        }
        description="Your chosen rituals are ready for a secure Stripe test checkout. No real money is charged."
      />
      <section className="container cart-content" aria-label="Shopping cart">
        {lines.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={38} aria-hidden="true" />
            <h2>Your cart is taking a breather.</h2>
            <p>Explore the collection and add a ritual that feels right for you.</p>
            <Link className="button" to="/collection">
              Explore products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div>
              <h2 className="cart-section-title">Your selections</h2>
              <ul className="cart-lines">
                {lines.map(({ product, quantity }) => (
                  <li className="cart-line" key={product.id}>
                    <div className={`cart-art tone-${product.tone}`} aria-hidden="true">
                      <ProductIllustration
                        name={product.name}
                        tone={product.tone}
                        variant={product.illustration}
                      />
                    </div>
                    <div className="cart-line-info">
                      <span className="eyebrow">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.format}</p>
                      <p>Unit price {money(Math.round(product.price * 100))} CAD</p>
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
                    </div>
                    <strong className="cart-line-total">
                      {money(Math.round(product.price * 100) * quantity)} CAD
                    </strong>
                  </li>
                ))}
              </ul>
              <Link className="text-link cart-continue" to="/collection">
                Continue exploring
              </Link>
            </div>
            <aside className="cart-summary" aria-label="Cart total">
              <span className="eyebrow">YOUR TEST ORDER</span>
              <h2>Order summary</h2>
              <div className="cart-summary-row">
                <span>Items</span>
                <span>{items.reduce((count, item) => count + item.quantity, 0)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{money(cartTotalCents(items))}</span>
              </div>
              <div className="cart-summary-row">
                <span>Tax and shipping</span>
                <span>{money(0)}</span>
              </div>
              <div className="cart-summary-row cart-grand-total">
                <strong>Total</strong>
                <strong>{money(cartTotalCents(items))} CAD</strong>
              </div>
              <CheckoutButton items={items} />
              <p>
                Stripe test checkout only. Use fictional details and test cards. No products are
                shipped.
              </p>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
