# Team work plan

The five team members are Arpit Das, Eric Luo, Michael Marsillo, Shailesh Mathrani, and Gurshan Sidhar. The split below is a proposed allocation for the group to confirm.

Assignment 1 is due **October 4, 2026, at 11:59 p.m. Toronto time**. Michael Marsillo submits the public website URL to Assignment 1 Dropbox.

## Phase 1 - Foundation

Completed: React + Vite + TypeScript scaffold, Home landing page, shared layout, five concept products, local quality checks, and the initial GitHub commits. Custom-platform approval has been confirmed.

## Phase 2 - Required pages

| Team member       | Proposed work                                                                           | Main area                                           |
| ----------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Michael Marsillo  | Home, routing, shared navigation, and integrating the team's branches                   | `src/app/`, `src/components/`, `src/features/home/` |
| Arpit Das         | Blog page and introductory post explaining the store's purpose                          | Add `src/features/blog/`                            |
| Eric Luo          | Dedicated product page with at least five offerings                                     | `src/features/catalog/`                             |
| Shailesh Mathrani | Privacy page, hosting settings, and deployment                                          | Add `src/features/privacy/`; hosting dashboard      |
| Gurshan Sidhar    | About Me page with team/project information, content review, and mobile/keyboard checks | Add `src/features/about/`; check all pages          |

Coordinate shared layout, product types, and CSS token changes with Michael Marsillo before making overlapping edits. The Home collection and field note are previews; the required standalone pages still need to be built.

## Phase 3 - Final checks and submission

- Michael Marsillo integrates the branches and runs `npm run check` and `npm run build`.
- Arpit Das checks the Blog page and introductory post.
- Eric Luo verifies all five products and their details.
- Shailesh Mathrani verifies privacy settings and the public deployment URL.
- Gurshan Sidhar checks navigation, page content, phone layouts, and keyboard use.
- Michael Marsillo submits the public website URL and shares the submission confirmation.

Aim to finish by **9:00 p.m. on October 4**. Use [assignment-1-checklist.md](assignment-1-checklist.md) for the final pass. Website structure is worth 6%, the product page 2%, and blog/privacy 2%.

## Branch workflow

1. Pull the latest `main` and create a task branch, such as `feat/blog-page`.
2. Make changes in the relevant feature folder.
3. Run `npm run format`, `npm run check`, and `npm run build`.
4. Commit the work and push the branch with `git push -u origin your-branch-name`.
5. Share the branch name with Michael Marsillo for integration. No PR or PR formatting is required.

## Later assignments

Assignments 2 and 3 have not been supplied yet. Revisit the split when their briefs arrive. Reserve authentication, backend/database, cart/orders, and additional content work for the actual requirements.
