import type { CheckoutConfirmation, CheckoutItem } from './types';

async function responseData(response: Response) {
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Test checkout is unavailable. Please try again in a moment.');
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Test checkout could not be loaded.');
  return data;
}

// The cart can pass its product IDs and quantities to this same function when it is merged.
export async function startCheckout(items: CheckoutItem[]): Promise<void> {
  const data = await responseData(
    await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    }),
  );
  const url = new URL(data.url);
  if (url.origin !== 'https://checkout.stripe.com')
    throw new Error('Invalid checkout destination.');
  window.location.assign(url.href);
}

export async function getConfirmation(
  sessionId: string,
  signal: AbortSignal,
): Promise<CheckoutConfirmation> {
  return responseData(
    await fetch(`/api/checkout?session_id=${encodeURIComponent(sessionId)}`, {
      cache: 'no-store',
      signal,
    }),
  );
}
