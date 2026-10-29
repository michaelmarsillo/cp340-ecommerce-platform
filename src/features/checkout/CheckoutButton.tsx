import { useRef, useState } from 'react';
import { ArrowUpRight, LoaderCircle, LockKeyhole } from 'lucide-react';
import { startCheckout } from './api';
import type { CheckoutItem } from './types';

export function CheckoutButton({ items }: { items: CheckoutItem[] }) {
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);
  const [error, setError] = useState('');

  async function checkout() {
    if (submitting.current || items.length === 0) return;
    submitting.current = true;
    setPending(true);
    setError('');
    try {
      await startCheckout(items);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Checkout could not open. Please try again.',
      );
      setPending(false);
      submitting.current = false;
    }
  }

  return (
    <div className="checkout-action">
      <button
        className="button"
        type="button"
        onClick={checkout}
        disabled={pending || items.length === 0}
      >
        {pending ? (
          <LoaderCircle size={17} aria-hidden="true" />
        ) : (
          <LockKeyhole size={17} aria-hidden="true" />
        )}
        {pending ? 'Opening Stripe...' : 'Try test checkout'}
        {!pending && <ArrowUpRight size={17} aria-hidden="true" />}
      </button>
      {error && (
        <p className="checkout-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
