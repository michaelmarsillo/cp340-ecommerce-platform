# Client architecture

Reviewed **October 2, 2026**, after the Assignment 1 navigation and privacy update. This describes the implemented client; remaining assignment tasks are in [assignment-1-checklist.md](assignment-1-checklist.md).

## Stack and routes

The project is a **React + Vite + TypeScript static client**, deployed on Vercel at **https://mossandmind.vercel.app**. Michael Marsillo confirmed instructor approval for the custom platform on October 1. This is one client package with no backend, database, accounts, cart, or checkout.

`src/main.tsx` wraps the app in React Router's `BrowserRouter`. `src/app/App.tsx` owns the shared header/footer and route composition:

| Path          | Page                  | Implementation                             |
| ------------- | --------------------- | ------------------------------------------ |
| `/`           | Home                  | `features/home/HomePage.tsx`               |
| `/collection` | Products              | `features/catalog/CollectionPage.tsx`      |
| `/blog`       | Blog                  | `features/blog/BlogPage.tsx`               |
| `/about`      | About / About Me page | Lazy-loaded `features/about/AboutPage.tsx` |
| `/privacy`    | Privacy notice        | `features/privacy/PrivacyPage.tsx`         |

The public menu names are Home, Products, About, Blog, and Privacy. Products retains the existing `/collection` route. Privacy is at `/privacy`, linked from the header and footer; unknown routes show `app/NotFoundPage.tsx`. The header's Browse products call to action is hidden on Products, including in the mobile menu. The desktop/tablet button keeps its layout space while hidden and is excluded from keyboard navigation and assistive technology, so the header stays aligned between pages. Home's link arrows use SVG icons for consistent rendering across browsers. About loads through `React.lazy` and `Suspense` with a visible loading status. `vercel.json` rewrites page requests to `index.html` so direct visits and refreshes work.

Page navigation uses React Router `Link` and `NavLink`, including current-page indication. Main navigation contains pages rather than Home section shortcuts. `app/RouteEffects.tsx` centralizes page titles/descriptions and scroll reset; Home preserves direct hash-section visits for existing links. The native Back to the top link remains an in-page anchor.

## Boundaries and data

| Area                 | Responsibility                                       | Rule                                                                           |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| `app/`               | Routes and shared shell                              | Compose feature pages/providers here.                                          |
| `components/layout/` | Header, footer, reusable page heading                | Keep feature content in its feature folder.                                    |
| `components/ui/`     | Shared presentation primitives                       | Avoid importing business feature data.                                         |
| `features/home/`     | Landing sections and previews                        | Reuse catalog components; link the Blog preview to `/blog`.                    |
| `features/catalog/`  | Product contract, data, Collection, filters, dialogs | Keep stable IDs and data separate from rendering.                              |
| `features/blog/`     | Blog page and static posts                           | Keep post content in `data/posts.ts`; expand full posts with native `details`. |
| `features/about/`    | About content and 3D bottle scene                    | Keep Three.js and scene lifecycle inside this feature.                         |
| `features/privacy/`  | Course-demo privacy notice                           | Match the deployed configuration and actual services.                          |
| `lib/`               | Cross-feature helpers                                | Add helpers when there are real consumers.                                     |
| `styles/`            | Global styles and design tokens                      | Reuse CSS properties for colors, type, and spacing.                            |
| `public/`            | Favicon and local bottle model                       | Static files are publicly served; never store secrets here.                    |

Product data lives in `features/catalog/data/products.ts`; its contract is in `features/catalog/types.ts`. `lib/formatCurrency.ts` formats CAD prices. All five products and prices are fictional. `ProductCollection` supports a Home preview and a full Collection variant using the same filters, cards, and `ProductDetails` dialog.

Blog has three static posts, including the introductory purpose post. Home's FieldNote is a separate preview component; its remaining-content link navigates to Blog. Changes to the introduction should keep these two representations consistent. Blog's Read the rest control expands in place and has no arrow.

Menu state, category filters, selected products, and native Blog expansion are transient. The client does not implement cookie writes or persistent browser storage.

## Visuals and accessibility

Product cards use CSS packaging illustrations and the shared SVG brand mark. About additionally uses **Three.js** and `GLTFLoader` to load `public/models/moss_mind_daily_focus_bottle.glb` from the same host. The model is approximately 1.3 MB; About's separate JS chunk is approximately 617 kB before gzip in the reviewed build. Vite reports a non-blocking chunk-size warning.

`BottleScene` resizes the canvas, renders scroll-driven rotation, responds to reduced-motion preferences, and cleans up listeners, animation frames, and rendering resources. A CSS product illustration is the fallback when renderer creation or model loading fails. The fallback and reduced-motion behavior were reviewed in code, not forced in the October 2 browser audit.

Native product `dialog` provides modal semantics and Escape behavior; cleanup restores scrolling and focus. The site includes a skip link, labeled navigation, headings, focus styles, and responsive layouts. Browser checks are recorded in [verification.md](verification.md); they do not replace a full accessibility audit.

## Deployment and privacy

Node is constrained to **22.x, minimum 22.12.0**, in `package.json`. Install with `npm ci`, build with `npm run build`, and serve `dist/`. Vercel currently builds `main` successfully using Node 22; its dashboard setting still says 24, producing an informational override warning. Local dev and preview servers are not submission hosting.

No analytics SDK, external font service, third-party embed, or application data-collection endpoint is implemented in the reviewed source. This does not establish the hosting dashboard's configuration or mean the host processes no connection data. Vercel's [privacy notice](https://vercel.com/legal/privacy-notice) describes technical/request information it processes.

The shared footer identifies Vercel and links to `features/privacy/PrivacyPage.tsx`. The course demo uses `noindex, nofollow` in HTML and an `X-Robots-Tag` response header, `no-referrer` in HTML and a Referrer-Policy header, and a Permissions-Policy header disabling camera, microphone, and geolocation. Deployment source/build logs remain protected through Vercel project settings; public source is not opted into. These are explicit course-demo choices; indexing directives do not provide access control. Public evaluator access is verified separately from the project's existing Vercel deployment protection. See [Vercel headers configuration](https://vercel.com/docs/project-configuration/vercel-json#headers) and [deployment protection](https://vercel.com/docs/deployment-protection).

The Assignment 1 PDF requires privacy settings but does not explicitly require a separate Privacy page. The group chose `/privacy` to make the data-handling notice easy to find. Hosting-provider logs remain distinct from application tracking; no custom retention period is promised.

## Extending later

Assignments 2 and 3 have not been supplied. Add infrastructure when their requirements are known:

- **API/backend/database:** introduce a server package or service when needed. Keep catalog fetching/mapping in its feature and shared HTTP helpers in `lib/api/`. Database credentials, migrations, authoritative prices, and validation belong on the server.
- **Authentication:** put account UI in an `auth` feature and session setup in `app/`. Server-side authorization must protect operations; a client route guard alone is insufficient.
- **Cart/orders:** add dedicated features and shared types when required; the server must validate prices, inventory, and permissions.
- **Environment:** `.env.example` documents a possible future public API base URL. `VITE_` values are bundled into client code and must not contain private credentials.
- **Verification:** run `npm run check` and `npm run build` before integration. Add focused tests when real business logic, API adapters, or authentication arrive.

## Collaboration

Push focused feature branches and coordinate integration with the group. There is no required PR template or shared VS Code configuration. Keep the lockfile committed, coordinate shared contracts/layout/tokens, and update these docs when routes, dependencies, hosting behavior, or data handling change.
