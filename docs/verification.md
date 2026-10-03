# Verification record

Updated **October 2, 2026**, after the navigation/privacy update. Initial navigation/privacy production application commit: **`d5cc048acfaadbb91fa0e5baaa5ba3d4953af2f2`**. Public website: **https://mossandmind.vercel.app**. This record confirms implementation and sampled checks, not assignment submission.

## Build and deployment

- `npm ci` completed after the October 2 pull; zero known vulnerabilities were reported at installation time.
- `npm run check` passed: TypeScript, ESLint, and Prettier.
- `npm run build` passed and generated `dist/`.
- Vercel deployment `mossandmind-85gemo9hx-michaels-projects-890ee310.vercel.app` reached Ready; its API metadata identifies application commit `d5cc048`.
- `/`, `/collection`, `/about`, `/blog`, and `/privacy` returned public HTTP 200 responses.
- Main CSS/JS assets and the local 3D bottle model returned HTTP 200 with the appropriate content types.
- The temporary local preview server used for verification was stopped afterward.

About's Three.js chunk is approximately 616.50 kB (155.57 kB gzip), producing a non-blocking Vite size warning. Vercel's dashboard Node 24 setting is overridden by package Node 22. Neither notice prevents deployment.

## Browsing flow

Desktop and phone-width checks used the in-app browser, including 1280 x 900 and 390 x 844 viewports. Scrollbars reduce content width. These are responsive viewport checks, not tests on a physical phone.

| Check                    | Result                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Main menu                | Home, Products, About, Blog appear with direct routes; current page is indicated                                                                       |
| Primary product path     | Home Explore products opens `/collection`; Products title and five items render                                                                        |
| Home preview links       | Product, About, and Blog link labels name their destination                                                                                            |
| Page changes             | RouteEffects resets scroll and updates page title/description; Home-to-Blog preview navigation starts at the top                                       |
| About                    | Existing content and Three.js bottle remain; About title renders correctly                                                                             |
| Blog                     | Three posts remain; introductory post expands with Enter; summary arrows are absent                                                                    |
| Products                 | Five products, category counts 2/2/1/5, and all five dialogs were checked during the initial October 2 audit; a dialog was rechecked after this update |
| Dialog keyboard behavior | Enter opens; Escape closes; focus/scroll cleanup works in the sampled checks                                                                           |
| Mobile navigation        | Four clear page links render; About and Products navigation close the menu                                                                             |
| Privacy                  | Footer opens `/privacy`; direct refresh works; text covers actual demo settings and Vercel hosting                                                     |
| Missing path             | Local production preview displays a useful not-found page with Home/Products recovery links                                                            |
| Overflow/errors          | No horizontal document overflow in the sampled phone-width pages; no error-level console messages in the deployed flow                                 |

## Implemented privacy settings

All five public page responses were checked for these headers:

| Setting              | Verified value                             | Purpose                                                    |
| -------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| `X-Robots-Tag`       | `noindex, nofollow`                        | Request search-engine exclusion for this course demo       |
| `Referrer-Policy`    | `no-referrer`                              | Do not send the page address when following external links |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disable unused sensitive browser capabilities              |

HTML also contains robots and referrer meta directives. The site stays public and uses HTTPS for grading. Search directives are requests to crawlers, not access controls.

Source review found no application analytics SDK, account/payment forms, cookie writes, persistent browser storage, or third-party embeds/fonts. The deployed page's script tags pointed to the local application bundle. The Privacy page explains that Vercel may still process technical connection/request information; it does not promise a custom provider-log retention period. See [Vercel's privacy notice](https://vercel.com/legal/privacy-notice), [headers configuration](https://vercel.com/docs/project-configuration/vercel-json#headers), [referrer policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy), and [permissions policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy).

## Hosting configuration evidence

The Vercel project API returned existing `ssoProtection.deploymentType: all_except_custom_domains`. An unauthenticated request to the unique deployment URL redirected to Vercel authentication (HTTP 302), while `mossandmind.vercel.app` returned HTTP 200. Access protection was preserved.

Public deployment source was not opted into (`publicSource` returned null); an explicit project API request to keep it false was accepted. The file-based `public` property was rejected by the deployment validator, so it was removed and configuration was kept at project level. The corrected application deployment succeeded. The latest deployment metadata identifies the GitHub repository as **private**, superseding the original public-repository setup.

Web Analytics and Speed Insights API fields contain allocated IDs but no enabled timestamps in the inspected response. The application has no integration scripts. This records the evidence without treating IDs alone as proof of enabled or disabled tracking. No hosting log-retention settings were changed or inferred.

## Header and SVG follow-up

The October 2 follow-up adds Privacy beside Blog in both navigation menus, preserves the footer privacy link, and hides the header's Browse products call to action on `/collection`. Home's About Moss & Mind and Browse all products arrows now use Lucide SVG icons instead of Unicode characters that can render as emoji.

- `npm run check` and `npm run build` passed after this change.
- Local production-preview checks at 821, 390, and 1280 pixels confirmed header layout, both SVG icons, mobile Privacy navigation, and the product CTA disappearing on Products and returning on Home.
- No horizontal overflow at the checked 821-pixel breakpoint or error-level console messages in the sampled flow.
- These viewport checks do not reproduce physical iOS Safari; the group should confirm the updated icons on an iPhone after deployment.

The group subsequently confirmed the SVG arrows on mobile Safari. A further header refinement keeps the hidden product button's layout space so the navigation does not move between pages. Local production-preview comparisons confirmed identical logo/navigation or menu-toggle coordinates between Home and Products at 1280, 821, 780, and 390 pixels, with no horizontal overflow. The hidden button is absent from accessible link queries and has `tabIndex=-1`; the mobile menu still omits its redundant product CTA. TypeScript, ESLint, Prettier, and the production build passed.

## Remaining group checks

- Approve the final About, Blog, product, and privacy content.
- Review the public site on a real phone and in a fresh/private browser, including keyboard navigation.
- WebGL failure fallback, reduced-motion behavior, and slow-network loading were reviewed in source but not deliberately exercised in this browser pass.
- Have one group member submit **https://mossandmind.vercel.app** through Assignment 1 Dropbox by **October 4, 2026, at 11:59 p.m. Toronto time** and keep confirmation.

See [assignment-1-checklist.md](assignment-1-checklist.md). Individual task assignments have been removed.
