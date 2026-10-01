# Four-person work plan

Replace **Member 1–4** with the group’s actual names. Each owner implements their area and asks a different member to review it. This split follows the tasks in `Assignment 1-V1.pdf`; the phases below are our proposed workflow, not phase names supplied by the assignment.

## Assignment 1 requirements

**Due:** Sunday, October 4, 2026, at 11:59 p.m. America/Toronto. Only one group member needs to submit. The required submission is the public website link through Assignment 1 Dropbox.

| Brief task            | Requirement                                        | Primary owner                                       | Reviewer        |
| --------------------- | -------------------------------------------------- | --------------------------------------------------- | --------------- |
| 1. Platform selection | Confirm an allowed platform                        | Member 1                                            | Member 4        |
| 2. Website creation   | Home, Blog, and About Me pages                     | Member 1: Home/integration; Member 2: Blog/About Me | Members 4 and 1 |
| 3. Blog setup         | Introductory post explaining the website’s purpose | Member 2                                            | Member 3        |
| 4. Privacy settings   | Understand and implement suitable settings         | Member 4                                            | Member 2        |
| 5. Product page       | At least five planned products/services            | Member 3                                            | Member 1        |

The assessment allocates **6% to website structure**, **2% to the product page**, and **2% to blog setup and privacy settings**, for **10% total**. Allocate effort accordingly: a polished Home page does not replace the other required pages.

## Phase 1 — Foundation and brand (October 1)

**Member 1 — Client foundation and integration**

- [x] React + Vite + TypeScript platform chosen; custom-platform approval confirmed by the user.
- [x] Local Git initialized with `main`; supplied GitHub `origin` configured.
- [x] Working brand, design tokens, shared layout, and responsive Home landing page.
- [x] Shared product model and five fictional catalog entries.
- [x] Formatting, lint/type checks, and CI configuration.
- [x] Commit and push the reviewed starter project in focused commits so all members can clone it.
- [ ] Record the four actual owners and confirm everyone can install/run the project.

The starter includes a blog preview and privacy notice. Full dedicated pages remain in Phase 2.

## Phase 2 — Required pages and content (October 2–3)

| Owner        | Deliverable                                         | Main working area                                       | Acceptance criteria                                                                                                                                                                                                                                  |
| ------------ | --------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Member 1** | Navigation, routing, integration, final Home polish | `src/app/`, shared layout, `src/features/home/`         | Distinct Home, Blog, About Me, and Product routes; links work; refresh/direct links work on the chosen host; Home remains usable at phone and desktop widths.                                                                                        |
| **Member 2** | Blog page, introductory post, About Me page         | Add `src/features/blog/` and `src/features/about/`      | Published introductory post explains purpose, audience, and planned offerings. About Me presents the actual team and project story without invented personal details. Coordinate shared navigation with Member 1.                                    |
| **Member 3** | Dedicated product page and catalog content          | `src/features/catalog/`                                 | At least five distinct products/services, with names, descriptions, clear demo pricing, and visuals. Review the existing mock entries; do not invent ingredients, certifications, reviews, or clinical results. Product navigation and dialogs work. |
| **Member 4** | Privacy page, host configuration, and verification  | Add `src/features/privacy/`; hosting dashboard; `docs/` | Privacy content matches actual data handling and host settings. Document indexing/visibility choices and third-party services, if any. Deploy the static client and verify the public URL.                                                           |

**Coordination:** Member 1 owns shared route/layout changes. Members 2–4 can build page components independently and provide their exports for integration. Consult the group before changing `Product`, the CSS tokens, or package dependencies.

## Phase 3 — Review, publish, and submit (October 4)

Aim to finish by **9:00 p.m. Toronto time** to leave a buffer before 11:59 p.m.

- **Member 1:** Integrate reviewed branches, run `npm ci`, `npm run check`, and `npm run build`; freeze unnecessary layout changes.
- **Member 2:** Proofread Blog/About content; cross-check every required page and the introductory post against the brief.
- **Member 3:** Verify all five products on desktop/mobile, accessible controls, prices, category filtering, and product details.
- **Member 4:** Check privacy settings and final public deployment; test direct page links and refresh in an incognito window; record the final URL and deployment evidence.
- **Submission owner (choose one):** Submit the public website URL to Assignment 1 Dropbox and share confirmation with the group.

Use [assignment-1-checklist.md](assignment-1-checklist.md) for the final pass.

## Proposed ownership for Assignments 2 and 3

**The later assignment briefs have not been supplied.** These are possible areas to reserve, not claims about course requirements or a promise to implement them now. Rebalance the split after each brief arrives.

| Member | Proposed future area                                              | Dependencies to agree on first                                                               |
| ------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1      | Application routes, authentication UI, client integration         | Actual auth requirements, backend API contract, and session approach                         |
| 2      | Blog/About content, account pages if required, usability          | Actual page requirements and accessible navigation                                           |
| 3      | Product catalog, cart/order client features if required           | Product API model, pricing rules, inventory, and required checkout scope                     |
| 4      | Backend/database if required, deployment, security/privacy checks | Approved backend stack, data model, environment/secrets strategy, and server-side validation |

Pair on backend/database work if it becomes a large part of the grade. Avoid assigning one person all security, infrastructure, and data work without help. Rotate PR reviewers so everyone understands the shared foundation.

## Team workflow

1. Pull the current `main`, then create a task branch.
2. Keep work inside the owned feature where possible. Discuss shared changes before overlapping edits.
3. Run `npm run format`, `npm run check`, and `npm run build` before opening a PR.
4. Include the assignment requirement and desktop/mobile verification in the PR description.
5. Have the assigned reviewer check behavior and content, then merge the agreed change.
6. Update the checklist and confirm the public deployment still works.
