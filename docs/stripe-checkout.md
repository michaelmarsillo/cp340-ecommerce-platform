# Stripe test checkout

Implemented for Michael Marsillo's Assignment 2 payment-gateway section on October 28, 2026. The assignment requires a secure test payment and complete checkout including confirmation. The hosted checkout, declined-payment handling, verified confirmation, and cancellation return were exercised on the public site using real Stripe sandbox transactions.

## Flow and ownership

1. Open a product's details and choose **Try test checkout**.
2. The browser posts product IDs and quantities to `/api/checkout`.
3. The Vercel function validates the request, looks up CAD prices in the deployed catalog, and creates a Stripe-hosted Checkout Session using a sandbox key.
4. Stripe collects payment details on its own page. The application does not collect card numbers.
5. Stripe returns to `/checkout/success?session_id=...`. The server retrieves the session and confirms it is paid, complete, in test mode, and belongs to this project before returning a summary.
6. Leaving checkout returns to `/checkout/cancel`; the page offers a path back to Products.

There is no order database or fulfillment process. Stripe stores the test sessions, and the return page displays their verified status. A production store would need signed webhooks, durable order records, idempotent fulfillment, and further operational/security work. This assignment integration intentionally rejects live keys and live sessions.

## Connect the sandbox

Use the separate **Moss & Mind - CP340 Demo** account and its **Moss & Mind - CP340 Demo sandbox**. It was created with the separate-account option, without shared organization data/reporting. It uses the same login but is separate from MarsilloMade. The saved local key was checked against the course sandbox account, and live charges are disabled. No MarsilloMade key, bank details, website, or payment settings were changed for this integration.

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

## Cart integration

The cart in `src/features/cart/` shares React state across routes and stores only product IDs and quantities in localStorage. It restores validated entries and looks up current product details and CAD prices in the catalog. Each product appears once with quantity 1-10. The header button opens a side drawer with quantity, removal, and checkout controls; the `/cart` page remains available for direct links. Both pass IDs and quantities to the existing `CheckoutButton` and `/api/checkout`. The server still sets authoritative prices and currency. No tax or shipping is added. Two Daily Focus and one Evening Unwind total CAD $82.00.

Cancellation, declined payments, and checkout errors leave the cart intact. The cart also remains after a verified payment, so an old success URL cannot remove newer additions. Users can remove entries in the cart or clear this site's browser data. There is no order database or fulfillment process.

## Verification and evidence

Completed before connecting credentials:

- `npm run check`: TypeScript, ESLint, and formatting passed.
- `npm test`: six tests covering catalog pricing, invalid/tampered requests, live-key rejection, paid-session verification, minimal confirmation data, and HTTP endpoint behavior. Stripe calls are replaced with a test fixture; these are not Stripe sandbox transactions.
- `npm run build`: passed; the existing About/Three.js chunk-size notice remains non-blocking.
- `npm audit`: zero known vulnerabilities after compatible Vite/tooling patches.

Public-site verification completed on October 28, 2026 (application commit `fcc502b`):

- [x] Complete a successful test payment with card `4242 4242 4242 4242`, any future expiry, and a test CVC. Use fictional contact/billing details.
- [x] Confirm Daily Focus, quantity 1, CAD 28.00, in the application and Stripe API. Stripe returned `livemode=false`, `status=complete`, `payment_status=paid`, and payment-intent status `succeeded`.
- [x] Test a declined card such as `4000 0000 0000 0002`; it must not show a success confirmation.
- [x] Leave Stripe checkout and confirm the cancellation page and return link.
- [x] Invalid reference returned HTTP 400. The actual declined/unpaid session returned HTTP 409. Neither produced a successful confirmation.
- [x] Verify the deployed API returns JSON, not the SPA document, and direct confirmation/cancellation URLs load.
- [x] Capture product entry, Stripe-hosted test form, declined payment, successful confirmation, and cancellation screenshots in the local Codex artifact folder. Only fictional customer/card details were used; browser card-save prompts were declined. A Stripe Dashboard screenshot can be captured separately if desired for the report.
- [x] Integrate the cart with the existing checkout button and server request shape. Unit tests cover repeated additions, quantity limits, restored data, and CAD $82.00 total.
- [ ] Exercise the cart through a real Stripe sandbox session for success, decline, and cancellation with available credentials. No local sandbox key was available during this cart implementation.

Additional deployed checks rejected browser-supplied prices and zero quantities with HTTP 400 and a foreign Origin with HTTP 403. API responses use JSON and `Cache-Control: no-store`. The test key is a server-only Vercel Secret scoped to Production; `APP_URL` is the public store origin. It is also in ignored `.env.local` for development, not Git or the client bundle.

Vercel initially built the function using the root TypeScript config and reported TS5097 import-extension errors, despite a Ready deployment. The root config now uses NodeNext resolution and rewrites TypeScript import extensions for JavaScript output. The emitted handler loaded in a local runtime check; the corrected deployed API and full browser flow passed afterward.

## Sources and acknowledgment

- [Stripe-hosted Checkout](https://docs.stripe.com/checkout/quickstart?client=react&lang=node)
- [Checkout Session API](https://docs.stripe.com/api/checkout/sessions/create)
- [Verified success page and fulfillment caveat](https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=stripe-hosted)
- [Test cards](https://docs.stripe.com/testing)
- [Sandbox management](https://docs.stripe.com/sandboxes/dashboard/manage)
- [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js)

The Stripe integration, cart code, tests, and documentation were developed with OpenAI Codex assistance. The student should review the code, run and verify the cart's real sandbox transaction, and acknowledge AI assistance in the submitted report according to the assignment brief. This note does not claim that the student has already performed that review or transaction. Report drafting and hour logging will be completed separately using the student's supplied sections and actual work record.
