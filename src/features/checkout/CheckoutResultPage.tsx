import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CircleCheck, LockKeyhole, Undo2 } from 'lucide-react';
import { getConfirmation } from './api';
import type { CheckoutConfirmation } from './types';
import './checkout.css';

function money(amount: number, currency: string) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency }).format(amount / 100);
}

export function CheckoutResultPage({ canceled = false }: { canceled?: boolean }) {
  const [search] = useSearchParams();
  const sessionId = search.get('session_id');
  const [result, setResult] = useState<{
    sessionId: string;
    confirmation?: CheckoutConfirmation;
    error?: string;
  } | null>(null);
  const confirmation = result?.sessionId === sessionId ? result?.confirmation : undefined;
  const error = result?.sessionId === sessionId ? result?.error : undefined;

  useEffect(() => {
    if (canceled || !sessionId) return;
    const controller = new AbortController();
    getConfirmation(sessionId, controller.signal)
      .then((confirmation) => setResult({ sessionId, confirmation }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setResult({
            sessionId,
            error: error instanceof Error ? error.message : 'The payment could not be verified.',
          });
        }
      });
    return () => controller.abort();
  }, [canceled, sessionId]);

  const problem = error || (!sessionId && !canceled ? 'No checkout reference was provided.' : '');
  const title = canceled
    ? 'A little pause. No payment made.'
    : confirmation
      ? 'Your test order is confirmed.'
      : problem
        ? 'Let’s check that payment.'
        : 'Confirming your test payment...';

  return (
    <section className="checkout-result container" aria-labelledby="checkout-title">
      <div className="checkout-result-card">
        <span className="checkout-result-icon" aria-hidden="true">
          {canceled ? (
            <Undo2 size={30} />
          ) : confirmation ? (
            <CircleCheck size={30} />
          ) : (
            <LockKeyhole size={30} />
          )}
        </span>
        <span className="eyebrow">STRIPE / TEST CHECKOUT</span>
        <h1 id="checkout-title">{title}</h1>
        {canceled ? (
          <p>
            You returned before completing checkout. You can explore the collection and try again
            whenever you’re ready.
          </p>
        ) : problem ? (
          <p className="checkout-error" role="alert">
            {problem} We have not confirmed a successful payment.
          </p>
        ) : !confirmation ? (
          <p role="status">
            Checking the payment securely with Stripe. Please keep this page open.
          </p>
        ) : (
          <>
            <p>
              Stripe verified your successful test payment. No real money was charged, and no
              products will be shipped.
            </p>
            <ul className="checkout-summary" aria-label="Test order items">
              {confirmation.items.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <span>
                    {item.name} <small>Quantity {item.quantity}</small>
                  </span>
                  <strong>{money(item.total, confirmation.currency)}</strong>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Test total</span>
              <strong>
                {money(confirmation.total, confirmation.currency)} {confirmation.currency}
              </strong>
            </div>
            <p className="checkout-reference">
              Stripe reference <span>{confirmation.reference}</span>
            </p>
          </>
        )}
        <Link className="button" to="/collection">
          Back to products
        </Link>
        <p className="checkout-disclaimer">
          A CP340 course demonstration. Use test card details only.
        </p>
      </div>
    </section>
  );
}
