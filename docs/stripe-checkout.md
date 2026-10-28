# Stripe test checkout

Implemented for Michael Marsillo's Assignment 2 payment-gateway section on October 28, 2026. The assignment requires a secure test payment and complete checkout including confirmation. This document records implementation and setup, not proof of a completed Stripe transaction.

## Flow and ownership

1. Open a product's details and choose **Try test checkout**.
2. The browser posts product IDs and quantities to `/api/checkout`.
3. The Vercel function validates the request, looks up CAD prices in the deployed catalog, and creates a Stripe-hosted Checkout Session using a sandbox key.
4. Stripe collects payment details on its own page. The application does not collect card numbers.
5. Stripe returns to `/checkout/success?session_id=...`. The server retrieves the session and confirms it is paid, complete, in test mode, and belongs to this project before returning a summary.
6. Leaving checkout returns to `/checkout/cancel`; the page offers a path back to Products.

There is no order database or fulfillment process. Stripe stores the test sessions, and the return page displays their verified status. A production store would need signed webhooks, durable order records, idempotent fulfillment, and further operational/security work. This assignment integration intentionally rejects live keys and live sessions.

## Connect the sandbox

Use the account picker in Stripe Dashboard to create/open a dedicated **Moss & Mind CP340** sandbox. The real coaching business can remain in its own live environment under the same login. Never copy business/customer data into this course demonstration.

### Local development

Copy `.env.example` to the ignored `.env.local` file and set these values privately:

```dotenv
STRIPE_SECRET_KEY=your_sandbox_secret_key
APP_URL=http://127.0.0.1:5173
```

The secret key must begin with `sk_test_` (or an appropriately permitted `rk_test_` key). Do not paste it into chat, screenshots, source files, or `VITE_` variables. No publishable key is needed for this hosted redirect flow.

Run `npm ci`, then `npm run dev`, and open the exact `APP_URL` address. Vite serves the same checkout handler through development middleware. Restart the server after changing environment values. If another port is needed, update `APP_URL` to match and run `npm run dev -- --port PORT`.

`npm run preview` serves only the compiled client; it does not run this API. Use `npm run dev` or a deployed Vercel environment for payment testing.

### Vercel

In the existing Moss & Mind project's environment variables, configure:

- `STRIPE_SECRET_KEY`: the **sandbox** secret key, stored as a sensitive server environment value.
- `APP_URL`: `https://mossandmind.vercel.app` for Production.

Redeploy after changing environment variables. For a separate preview deployment, set `APP_URL` to the exact preview origin instead. The API checks browser origins and creates return URLs from this trusted configuration, never from browser-supplied redirect addresses.

The SPA rewrite excludes `/api/` so Vercel can execute `api/checkout.ts`. The handler delegates to `server/checkout.ts`. The Stripe SDK is only imported by server code; it is not included in the browser application.

## Connect the teammate's cart

The merged branch had no cart on October 28. Product details currently check out one unit. A future cart can reuse `CheckoutButton` or `startCheckout` from `src/features/checkout/`:

```tsx
<CheckoutButton
  items={cartItems.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }))}
/>
```

Adapt the example to the actual cart type. Import `checkout.css` if the cart doesn't already load it. Each unique catalog product appears once, with integer quantity 1-10. The endpoint accepts 1-5 different products and rejects unknown products, duplicate entries, invalid quantities, and extra pricing/redirect fields. Send IDs and quantities only; prices and currency are authoritative on the server.

The demo adds no tax or shipping. The listed product prices make up the entire test total. Cart totals must use the same policy, and the cart owner should clear a checked-out cart only after successful server verification, not merely on visiting a success URL.

## Verification and evidence

Completed before connecting credentials:

- `npm run check`: TypeScript, ESLint, and formatting passed.
- `npm test`: six tests covering catalog pricing, invalid/tampered requests, live-key rejection, paid-session verification, minimal confirmation data, and HTTP endpoint behavior. Stripe calls are replaced with a test fixture; these are not Stripe sandbox transactions.
- `npm run build`: passed; the existing About/Three.js chunk-size notice remains non-blocking.
- `npm audit`: zero known vulnerabilities after compatible Vite/tooling patches.

Still required with the real sandbox connected:

- [ ] Complete a successful test payment with card `4242 4242 4242 4242`, any future expiry, and a test CVC. Use fictional contact/billing details.
- [ ] Confirm the product, quantity, CAD amount, and successful test status in Stripe Dashboard and the application confirmation page.
- [ ] Test a declined card such as `4000 0000 0000 0002`; it must not show a success confirmation.
- [ ] Leave Stripe checkout and confirm the cancellation page and return link.
- [ ] Try a missing/invalid/unpaid session reference; no successful order should be displayed.
- [ ] Verify the deployed API returns JSON, not the SPA document, and direct confirmation/cancellation URLs load.
- [ ] Capture the product checkout action, Stripe test payment page, successful confirmation, and successful sandbox payment for the report. Keep keys and personal information out of screenshots.
- [ ] Integrate and verify the teammate's cart once it is merged, including quantities and totals.

## Sources and acknowledgment

- [Stripe-hosted Checkout](https://docs.stripe.com/checkout/quickstart?client=react&lang=node)
- [Checkout Session API](https://docs.stripe.com/api/checkout/sessions/create)
- [Verified success page and fulfillment caveat](https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=stripe-hosted)
- [Test cards](https://docs.stripe.com/testing)
- [Sandbox management](https://docs.stripe.com/sandboxes/dashboard/manage)
- [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js)

This implementation and its initial documentation were developed with OpenAI Codex assistance. The student should review the code, run and verify the real sandbox transaction, and acknowledge AI assistance in the submitted report according to the assignment brief. This note does not claim that the student has already performed that review or transaction. Report drafting and hour logging will be completed separately using the student's supplied sections and actual work record.
