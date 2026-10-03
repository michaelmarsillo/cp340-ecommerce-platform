# Assignment 1 team progress

Updated **October 2, 2026**. The five team members listed for this repository are Arpit Das, Eric Luo, Michael Marsillo, Shailesh Mathrani, and Gurshan Sidhar. Assignment 1 tasks are no longer assigned to individuals in this document. The implementation status and remaining submission work apply to the group.

## Implemented

- React + Vite + TypeScript client with instructor approval confirmed by the user.
- Home, Products (`/collection`), About (`/about`), and Blog (`/blog`).
- Five fictional offerings with filters, descriptions, CAD prices, and product dialogs.
- Introductory Blog post explaining the website's purpose.
- Three.js bottle visual on About, with a local model and an illustration fallback.
- Clear Home / Products / About / Blog navigation and direct page links.
- Privacy notice at `/privacy`, no application trackers or persistent storage, and explicit browser/indexing privacy settings.
- Public Vercel hosting at **https://mossandmind.vercel.app**.

## Final group pass

1. Approve the final About, Blog, and product content against [assignment-1-checklist.md](assignment-1-checklist.md).
2. Open the deployed site on a real phone and in a fresh/private browser; check navigation, Blog expansion, and product details.
3. Confirm the final deployment and review [verification.md](verification.md).
4. Have **one group member** submit the public website URL to Assignment 1 Dropbox and retain confirmation.

The official deadline is **Sunday, October 4, 2026, at 11:59 p.m. Toronto time**. An optional group target of 9:00 p.m. leaves time for submission.

## Branch workflow

Pull latest `main`, create a focused branch, and run `npm ci` when dependencies change. Before integration, run `npm run check` and `npm run build`. Keep dependency additions in both `package.json` and `package-lock.json`, and share the branch for integration. No PR template or mandatory PR formatting is required.

## Later assignments

Assignments 2 and 3 have not been supplied. Plan authentication, backend/database, cart/orders, and other features when their requirements arrive.
