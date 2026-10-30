import assert from 'node:assert/strict';
import { createServer, type Server } from 'node:http';
import { after, before, test } from 'node:test';
import type { AddressInfo } from 'node:net';
import type Stripe from 'stripe';
import {
  checkoutOrigin,
  checkoutParameters,
  handleCheckout,
  testSecretKey,
  verifiedConfirmation,
} from './checkout.ts';

const origin = 'http://127.0.0.1:5173';
const fixture = {
  id: 'cs_test_fixture12345678',
  livemode: false,
  mode: 'payment',
  status: 'complete',
  payment_status: 'paid',
  amount_total: 5600,
  currency: 'cad',
  metadata: { project: 'moss-and-mind-cp340', purpose: 'assignment-2-test' },
  customer_details: { email: 'not-returned@example.com' },
  line_items: { data: [{ description: 'Daily Focus', quantity: 2, amount_total: 5600 }] },
} as unknown as Stripe.Checkout.Session;

test('prices and currency are calculated from the catalog for multiple items', () => {
  const parameters = checkoutParameters(
    {
      items: [
        { productId: 'daily-focus', quantity: 2 },
        { productId: 'evening-unwind', quantity: 1 },
      ],
    },
    origin,
  );
  assert.equal(parameters.line_items?.[0]?.price_data?.unit_amount, 2800);
  assert.equal(parameters.line_items?.[0]?.price_data?.currency, 'cad');
  assert.equal(parameters.line_items?.[1]?.price_data?.unit_amount, 2600);
  assert.equal(parameters.line_items?.[0]?.quantity, 2);
  assert.equal(parameters.line_items?.[1]?.quantity, 1);
  assert.equal(
    parameters.line_items?.reduce(
      (total, item) => total + (item.price_data?.unit_amount ?? 0) * (item.quantity ?? 0),
      0,
    ),
    8200,
  );
  assert.equal(
    parameters.success_url,
    `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  );
  const large = checkoutParameters(
    { items: [{ productId: 'daily-focus', quantity: 1000 }] },
    origin,
  );
  assert.equal(large.line_items?.[0]?.quantity, 1000);
});

test('invalid products, duplicate entries, quantities, and browser-supplied prices are rejected', () => {
  for (const items of [
    [],
    [{ productId: 'not-a-product', quantity: 1 }],
    [{ productId: 'daily-focus', quantity: 0 }],
    [{ productId: 'daily-focus', quantity: -1 }],
    [{ productId: 'daily-focus', quantity: Number.MAX_SAFE_INTEGER }],
    [{ productId: 'daily-focus', quantity: 1.5 }],
    [{ productId: 'daily-focus', quantity: '2' }],
    [{ productId: 'daily-focus', quantity: 1, price: 1 }],
    [
      { productId: 'daily-focus', quantity: 1 },
      { productId: 'daily-focus', quantity: 1 },
    ],
  ])
    assert.throws(() => checkoutParameters({ items }, origin));
});

test('live keys and untrusted return URLs cannot enable checkout', () => {
  assert.equal(testSecretKey({ STRIPE_SECRET_KEY: 'sk_test_fixture' }), 'sk_test_fixture');
  for (const key of [undefined, '', 'sk_live_fixture', 'rk_live_fixture', 'pk_test_fixture']) {
    assert.throws(() => testSecretKey({ STRIPE_SECRET_KEY: key }));
  }
  for (const url of [
    'http://example.com',
    'https://example.com/path',
    'https://user:pass@example.com',
  ]) {
    assert.throws(() => checkoutOrigin({ APP_URL: url }));
  }
});

test('confirmation requires a paid, complete, test session belonging to this project', () => {
  for (const override of [
    { livemode: true },
    { payment_status: 'unpaid' },
    { status: 'open' },
    { metadata: {} },
    { mode: 'subscription' },
  ])
    assert.throws(() =>
      verifiedConfirmation({ ...fixture, ...override } as Stripe.Checkout.Session),
    );
  const confirmation = verifiedConfirmation(fixture);
  assert.equal(confirmation.total, 5600);
  assert.equal(confirmation.currency, 'CAD');
  assert.equal('customer_details' in confirmation, false);
  assert.equal(JSON.stringify(confirmation).includes('not-returned@example.com'), false);
});

let server: Server;
let base: string;
const created: Stripe.Checkout.SessionCreateParams[] = [];
const fakeStripe = {
  checkout: {
    sessions: {
      create: async (parameters: Stripe.Checkout.SessionCreateParams) => {
        created.push(parameters);
        return { livemode: false, url: 'https://checkout.stripe.com/c/pay/cs_test_fixture' };
      },
      retrieve: async () => fixture,
    },
  },
} as unknown as Stripe;

before(async () => {
  server = createServer((request, response) => {
    void handleCheckout(
      request,
      response,
      { APP_URL: origin, STRIPE_SECRET_KEY: 'sk_test_fixture' },
      () => fakeStripe,
    );
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/checkout`;
});
after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

test('HTTP checkout creates a Stripe redirect using server prices and returns uncached confirmation', async () => {
  const response = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify({ items: [{ productId: 'daily-focus', quantity: 2 }] }),
  });
  assert.equal(response.status, 200);
  const resultData = (await response.json()) as { url: string };
  assert.equal(resultData.url, 'https://checkout.stripe.com/c/pay/cs_test_fixture');
  assert.equal(created.at(-1)?.line_items?.[0]?.price_data?.unit_amount, 2800);
  const result = await fetch(`${base}?session_id=${fixture.id}`);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await result.json(), verifiedConfirmation(fixture));
});

test('HTTP endpoint rejects forged origins, malformed bodies, invalid session IDs, and unsupported methods', async () => {
  const cases: [RequestInit, number][] = [
    [
      {
        method: 'POST',
        headers: { Origin: 'https://attacker.example', 'Content-Type': 'application/json' },
        body: '{}',
      },
      403,
    ],
    [{ method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: '{}' }, 415],
    [{ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }, 400],
    [
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [] }),
      },
      400,
    ],
    [{ method: 'DELETE' }, 405],
    [{ method: 'GET' }, 400],
  ];
  for (const [request, status] of cases) assert.equal((await fetch(base, request)).status, status);
  assert.equal((await fetch(`${base}?session_id=cs_live_fake`)).status, 400);
});
