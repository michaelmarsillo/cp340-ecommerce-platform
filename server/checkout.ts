// AI-assisted implementation; review and testing evidence are in docs/stripe-checkout.md.
import Stripe from 'stripe';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { products } from '../src/features/catalog/data/products.ts';
import type { CheckoutConfirmation } from '../src/features/checkout/types.ts';

type Environment = Record<string, string | undefined>;
type CheckoutRequest = IncomingMessage & { body?: unknown };

export class CheckoutError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function checkoutOrigin(environment: Environment): string {
  const url = new URL(environment.APP_URL || 'https://mossandmind.vercel.app');
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (
    (url.protocol !== 'https:' && !(local && url.protocol === 'http:')) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new CheckoutError(503, 'Checkout is not configured correctly. Please try again later.');
  }
  return url.origin;
}

export function testSecretKey(environment: Environment): string {
  const key = environment.STRIPE_SECRET_KEY?.trim();
  if (!key || !/^(sk|rk)_test_[A-Za-z0-9]+$/.test(key)) {
    throw new CheckoutError(
      503,
      'Test checkout is not available yet. Please try again once the Stripe sandbox is connected.',
    );
  }
  return key;
}

export function checkoutParameters(
  body: unknown,
  origin: string,
): Stripe.Checkout.SessionCreateParams {
  if (
    !isRecord(body) ||
    Object.keys(body).some((key) => key !== 'items') ||
    !Array.isArray(body.items) ||
    body.items.length === 0 ||
    body.items.length > products.length
  ) {
    throw new CheckoutError(400, 'Choose between one and five products to check out.');
  }

  const seen = new Set<string>();
  const lineItems = body.items.map((item: unknown) => {
    if (
      !isRecord(item) ||
      Object.keys(item).some((key) => key !== 'productId' && key !== 'quantity') ||
      typeof item.productId !== 'string' ||
      typeof item.quantity !== 'number' ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 10 ||
      seen.has(item.productId)
    ) {
      throw new CheckoutError(
        400,
        'Each product needs a quantity from 1 to 10 and one cart entry.',
      );
    }
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) throw new CheckoutError(400, 'One of these products is no longer available.');
    seen.add(product.id);

    // Prices and currency come from the deployed catalog, never from the browser.
    return {
      quantity: item.quantity,
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          description: `${product.format}. Fictional course product; test payment only.`,
        },
      },
    };
  });

  return {
    mode: 'payment',
    allowed_payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    metadata: { project: 'moss-and-mind-cp340', purpose: 'assignment-2-test' },
    branding_settings: {
      display_name: 'Moss & Mind - Course Demo',
      background_color: '#f8f7f2',
      button_color: '#405344',
    },
    custom_text: {
      submit: {
        message: 'CP340 test checkout. No real money is charged and no goods are shipped.',
      },
    },
  };
}

export function verifiedConfirmation(session: Stripe.Checkout.Session): CheckoutConfirmation {
  if (
    session.livemode ||
    session.metadata?.project !== 'moss-and-mind-cp340' ||
    session.metadata?.purpose !== 'assignment-2-test' ||
    session.mode !== 'payment'
  ) {
    throw new CheckoutError(404, 'This test checkout could not be found.');
  }
  if (session.status !== 'complete' || session.payment_status !== 'paid') {
    throw new CheckoutError(409, 'This checkout has not completed a successful test payment.');
  }
  if (session.amount_total === null || !session.currency || !session.line_items?.data.length) {
    throw new CheckoutError(502, 'We could not load the payment summary. Please try again.');
  }
  // Return only order information. Email, billing details, and card data stay with Stripe.
  return {
    reference: session.id,
    currency: session.currency.toUpperCase(),
    total: session.amount_total,
    items: session.line_items.data.map((item) => ({
      name: item.description || 'Concept product',
      quantity: item.quantity ?? 1,
      total: item.amount_total,
    })),
  };
}

async function readBody(request: CheckoutRequest): Promise<unknown> {
  if (request.body !== undefined) {
    return typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  }
  let body = '';
  for await (const chunk of request) {
    body += String(chunk);
    if (Buffer.byteLength(body) > 8192)
      throw new CheckoutError(413, 'Checkout request is too large.');
  }
  return JSON.parse(body);
}

export async function handleCheckout(
  request: CheckoutRequest,
  response: ServerResponse,
  environment: Environment = process.env,
  createStripe: (key: string) => Stripe = (key) => new Stripe(key, { maxNetworkRetries: 1 }),
) {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  const send = (status: number, value: unknown) => {
    response.statusCode = status;
    response.end(JSON.stringify(value));
  };

  try {
    if (request.method !== 'POST' && request.method !== 'GET') {
      response.setHeader('Allow', 'GET, POST');
      throw new CheckoutError(405, 'This checkout request method is not supported.');
    }
    const origin = checkoutOrigin(environment);
    if (request.headers.origin && request.headers.origin !== origin) {
      throw new CheckoutError(403, 'Start checkout from the Moss & Mind website.');
    }

    if (request.method === 'POST') {
      if (request.headers['content-type']?.split(';')[0]?.trim() !== 'application/json') {
        throw new CheckoutError(415, 'Checkout needs a JSON request.');
      }
      if (Number(request.headers['content-length'] ?? 0) > 8192) {
        throw new CheckoutError(413, 'Checkout request is too large.');
      }
      const parameters = checkoutParameters(await readBody(request), origin);
      const stripe = createStripe(testSecretKey(environment));
      const session = await stripe.checkout.sessions.create(parameters);
      if (
        session.livemode ||
        !session.url ||
        new URL(session.url).origin !== 'https://checkout.stripe.com'
      ) {
        throw new CheckoutError(502, 'Stripe could not open a test checkout. Please try again.');
      }
      send(200, { url: session.url });
    } else {
      const sessionId = new URL(request.url || '/', origin).searchParams.get('session_id');
      if (!sessionId || !/^cs_test_[A-Za-z0-9]{8,200}$/.test(sessionId)) {
        throw new CheckoutError(400, 'A valid test checkout reference is required.');
      }
      const stripe = createStripe(testSecretKey(environment));
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
      });
      send(200, verifiedConfirmation(session));
    }
  } catch (error) {
    if (error instanceof CheckoutError) send(error.status, { error: error.message });
    else if (error instanceof SyntaxError)
      send(400, { error: 'Checkout request could not be read.' });
    else if (
      error instanceof Stripe.errors.StripeInvalidRequestError &&
      error.code === 'resource_missing'
    ) {
      send(404, { error: 'This test checkout could not be found.' });
    } else {
      // Do not log request bodies, session IDs, keys, or Stripe's customer data.
      console.error(
        'Stripe checkout failed:',
        error instanceof Error ? error.name : 'UnknownError',
      );
      send(502, { error: 'We could not reach test checkout. Please try again in a moment.' });
    }
  }
}
