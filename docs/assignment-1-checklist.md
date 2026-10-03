# Assignment 1 submission checklist

Reviewed **October 2, 2026**, against `Assignment 1-V1.pdf`. Due **Sunday, October 4, 2026, at 11:59 p.m. America/Toronto**. Groups may have up to five members; only one member needs to submit the website link through Assignment 1 Dropbox.

Public website: **https://mossandmind.vercel.app**. Individual task assignments have been removed. Checked implementation items refer to the integrated site; the final group review and submission remain open.

## Website structure - 6%

- [x] React + Vite + TypeScript selected; instructor approval was confirmed by the user on October 1.
- [x] Home page at `/`.
- [x] Dedicated Blog at `/blog`.
- [x] Dedicated About page at `/about`, covering the concept, purpose, and philosophy.
- [x] Clearly labeled Home, Products, About, Blog, and Privacy navigation on desktop and mobile.
- [x] Direct links, current-page indication, route titles, and scroll reset on page changes.
- [x] Vercel SPA fallback supports direct visits and refreshes.
- [ ] Final group approval of the content and a fresh/private-browser check on the deployed site.
- [ ] Final physical-phone check; desktop and phone-width browser testing is recorded in [verification.md](verification.md).

## Product page - 2%

- [x] `/collection`, labeled Products, is the dedicated product page.
- [x] Five fictional offerings: Daily Focus, Evening Unwind, Mindful Matcha, The Pause Tea, and The Semester Set.
- [x] Descriptions, formats, CAD prices, illustrations, category filters, and working details dialogs.
- [x] Home's product calls to action lead directly to the dedicated Products page.
- [ ] Group approval of the final offerings and demo labeling before submission.

## Blog setup and privacy settings - 2%

- [x] Introductory Blog post identifies the student course project and discusses its purpose.
- [x] Home's Blog preview links to `/blog`; Blog's Read the rest controls expand in place without navigation arrows.
- [x] Privacy notice at `/privacy`, linked from the shared header and footer, explains temporary state, lack of application tracking, and Vercel hosting.
- [x] Application has no accounts, checkout/payment forms, cookie writes, persistent storage, analytics SDK, or third-party embeds.
- [x] Course-demo indexing policy: `noindex, nofollow` in HTML and Vercel's `X-Robots-Tag` response header.
- [x] Referrer policy: `no-referrer` in HTML and the response header.
- [x] Browser permissions policy disables camera, microphone, and geolocation, which this demo does not use.
- [x] Vercel project configuration keeps deployment source/build logs private; public website access remains available for grading.
- [x] Existing Vercel project protection configuration was read through the project API; the application's absence of analytics integration was checked in source. See verification for the scope of this evidence.

The brief requires appropriate privacy settings but does not specify a particular switch or require a separate Privacy page. The group chose the documented settings above for this static course demo. Search-engine directives request exclusion; they do not restrict access. The site still discloses that Vercel may process technical connection data.

## Final verification and submission

- [x] Repository and public hosting are connected.
- [x] All required pages are integrated.
- [x] Local TypeScript, lint, formatting, and production-build checks pass.
- [x] Deployment and live checks are recorded in [verification.md](verification.md).
- [ ] Complete the final group content and real-device review.
- [ ] Have one group member submit **https://mossandmind.vercel.app** to Assignment 1 Dropbox.
- [ ] Retain successful submission confirmation before the deadline.

## Optional polish and future scope

Adding team names/biographies to About is optional; the brief does not demand biographies. About's Three.js chunk-size warning does not prevent deployment, but performance can be improved later. Aligning Vercel's dashboard Node setting with package Node 22 would remove an informational warning.

The PDF does not require individual URLs for every product, authentication, a database, a cart, or checkout. Those features should follow the actual Assignment 2 and 3 briefs. This version demonstrates a clearer browsing path without pretending to accept purchases.
