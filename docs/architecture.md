# Client architecture

## Decisions now

The project is a **React + Vite + TypeScript static client**. Instructor approval for the custom platform was confirmed by the user on October 1, 2026. TypeScript provides shared contracts for the team; Vite produces ordinary static files suitable for standard static hosting.

The repository is intentionally a single client package. A separate backend workspace can be introduced when a later brief establishes actual server/database requirements. No empty backend, speculative auth system, or unused infrastructure is needed for this stage.

`src/app/App.tsx` composes the shared shell and the Home (`/`) and Blog (`/blog`) routes. `src/main.tsx` wraps the app in React Router's `BrowserRouter`. Shared Home section links include the root path so they work from Blog as well. `vercel.json` sends page requests to `index.html`, allowing direct route visits and refreshes on Vercel. Node is pinned to the 22.x major version, with 22.12.0 as the minimum.

## Boundaries

| Area                 | Responsibility                                         | Rule                                                            |
| -------------------- | ------------------------------------------------------ | --------------------------------------------------------------- |
| `app/`               | Application composition, future routes/providers       | Import feature pages and shared layout here.                    |
| `components/layout/` | Header/footer used across pages                        | Keep page-specific content inside features.                     |
| `components/ui/`     | Shared presentation primitives                         | Avoid importing business feature data here.                     |
| `features/home/`     | Landing page sections and page styles                  | Compose catalog components; do not copy catalog data.           |
| `features/catalog/`  | Product contract, static catalog, product presentation | Keep data separate from rendering; use stable product IDs.      |
| `lib/`               | Small cross-feature helpers                            | Add helpers when there are real consumers.                      |
| `styles/`            | Global styles and reusable design tokens               | Use CSS custom properties for shared colors, type, and spacing. |

Product data lives in `features/catalog/data/products.ts`, with its shape in `features/catalog/types.ts`. Display prices using `lib/formatCurrency.ts`. All current catalog values are fictional. The local state for the filter, active product dialog, and mobile menu stays close to its UI; it is not persisted.

Catalog styles live with the catalog feature in `features/catalog/catalog.css`, so reusing its components on a dedicated Products page does not depend on rendering the Home page. Home-specific styles remain in `features/home/home.css`; shared heading and spacing styles live in the global stylesheet.

Product packaging is drawn with CSS and the shared SVG flower. It needs no external image service, font provider, or tracking request. The native `<dialog>` supplies modal semantics, keyboard focus containment, and Escape handling. The page includes meaningful headings, labeled navigation, focus styles, and a reduced-motion preference.

## Adding the remaining Assignment 1 pages

1. Add `features/blog/BlogPage.tsx`, `features/about/AboutPage.tsx`, and `features/privacy/PrivacyPage.tsx` when the owners implement them. Add the dedicated `ProductsPage.tsx` under `features/catalog/`, reusing the existing collection/data.
2. Agree on stable paths such as `/`, `/blog`, `/about`, `/products`, and `/privacy`.
3. Centralize routing in `app/` and update shared navigation. Keep the Home anchors only where they still make sense.
4. Choose browser routes only if the host supports rewriting missing paths to `index.html`. Otherwise choose hash routing or an equivalent supported deployment strategy.
5. Verify opening every page URL directly, reloading it, navigating back, and following internal links on the public host.
6. Set useful titles/descriptions for each page and update the privacy notice to reflect the deployed site.

## Extending later

These steps are conditional on the later briefs, which have not been provided.

- **API access:** Add a small `lib/api/` HTTP client only when a server exists. Put catalog-specific fetch/mapping code inside `features/catalog/`. Handle loading, errors, empty results, and server validation explicitly.
- **Backend/database:** Introduce a separately configured server package or service when the group selects a stack. Database credentials and migrations belong on the server; the browser must not connect directly with privileged credentials.
- **Authentication:** Put account/auth UI inside an `auth` feature and shared session setup in `app/`. Prefer a server-established secure session or another reviewed approach that fits the requirements. A protected client route is a usability feature; the server must authorize every protected operation.
- **Cart/orders:** Add dedicated features and shared types when required. Server-side code must own authoritative prices, inventory, permissions, and order validation.
- **Environment:** `.env.example` documents a possible future public API base URL. Every `VITE_` variable is bundled into client code. Never use it for database passwords, private API keys, or payment secrets.
- **Testing:** Run `npm run check` and `npm run build` locally to check typing, lint, formatting, and production compilation. Add focused automated tests for real cart calculations, API adapters, auth behavior, and routes as those features arrive; the browser review of this landing page is recorded in `docs/verification.md`.

## Hosting and privacy

The production output is `dist/`. Build command: `npm ci && npm run build`. This is a static build; there is no server-rendered runtime. The local development and preview servers are not submission hosting.

Before deploying, select the actual provider, verify its public-access settings, and document what it logs. Decide whether the course demo should be indexed, then use settings supported by that host. A search-indexing directive is not access control. If content needs restricted access, use actual host access controls and coordinate evaluator access with the instructor.

No analytics or third-party embeds are installed. Adding any service later means reviewing data handling and updating the privacy page/settings. Do not add a nonfunctional cookie banner just to look compliant; configure the services the site actually uses.

## Collaboration conventions

- Create a feature branch and push it to GitHub; no PR template or PR workflow is required.
- Share decisions before modifying layout, tokens, config, or product contracts.
- Run `npm run check` and `npm run build` before merging.
- Keep `package-lock.json` in Git and install with `npm ci` for consistent versions.
- Keep names descriptive and split components by responsibility, rather than by arbitrary line count.
