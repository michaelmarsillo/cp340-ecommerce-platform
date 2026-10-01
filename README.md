# Moss & Mind

A calm, student-focused nootropics and everyday ritual storefront concept for **CP340 E-commerce, Fall 2026**. This repository belongs to a four-person group. The working brand name is **Moss & Mind**; the GitHub repository remains `cp340-ecommerce-platform`.

**Current scope:** a responsive landing page and a maintainable React + Vite + TypeScript foundation. The custom platform has instructor approval, as confirmed by the team on October 1, 2026.

## Run locally

Install Node.js **22.12+** (the project was built with 22.13.1), then:

```sh
npm ci
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). Stop the server with `Ctrl+C`.

```sh
npm run check   # TypeScript, ESLint, and formatting checks
npm run build   # TypeScript check and production build into dist/
npm run preview # Preview the production build locally
npm run format  # Apply the shared formatting rules
```

No API, database, environment variables, or accounts are needed to run the current client. Commit `package-lock.json` so every teammate gets the same dependency versions.

## What is built

- A sage, lavender, and cream landing page with original CSS/SVG product illustrations.
- Responsive navigation, section links, keyboard focus styles, and reduced-motion support.
- Five fictional products with category filters, CAD pricing, and accessible product detail dialogs.
- A philosophy section and an introductory field note with an expandable ending.
- A footer privacy/demo notice. No analytics, embedded external assets, web fonts, cookies, or persistent browser storage are added by the client.
- Strict TypeScript, ESLint, Prettier, editor conventions, a PR template, and GitHub CI.

This is **not yet the complete Assignment 1 submission**. The landing page includes collection and blog previews; dedicated Blog, About Me, Product, and Privacy pages, final hosting settings, and a public website URL remain team tasks. See [the four-person plan](docs/team-plan.md).

Products, prices, and packaging are fictional demonstration content. No checkout exists and no medical or product efficacy claims are made. Any real future supplement business would need verified product information and appropriate review before selling.

## Project structure

```text
src/
  app/                  Application composition; future routes/providers belong here
  components/
    layout/             Shared header and footer
    ui/                 Shared visual primitives
  features/
    home/               Landing page and its sections/styles
    catalog/            Product types, static data, illustrations, and details
  lib/                  Small shared utilities
  styles/               Design tokens and global styles
public/                 Assets served unchanged by Vite
docs/                   Team plan, architecture, and submission checklist
.github/                CI workflow and PR template
```

[Architecture and future extension points](docs/architecture.md) explain how to add routes, authentication, and a backend when later assignments require them.

## Working as a team

Use a short branch for each task, such as `feat/blog-page` or `feat/privacy-page`. Keep `main` runnable, open a pull request, and have another member review it. Agree on changes to shared types, tokens, layout, or configuration before editing them in parallel.

The GitHub remote is [michaelmarsillo/cp340-ecommerce-platform](https://github.com/michaelmarsillo/cp340-ecommerce-platform). Each teammate can clone the repository:

```sh
git clone https://github.com/michaelmarsillo/cp340-ecommerce-platform.git
cd cp340-ecommerce-platform
npm ci
```

Keep credentials, `.env` files, user data, and unpublished course materials out of the public repository. Vite exposes `VITE_` environment variables to the browser; they cannot hold secrets.

## Assignment 1

Due **Sunday, October 4, 2026, at 11:59 p.m. America/Toronto**. One group member submits the **public website URL**, not the GitHub repository URL, to Assignment 1 Dropbox. A local development server is not a public submission URL.

The assignment brief lists Home, Blog, About Me, an introductory blog post, privacy settings, and a product page with at least five products/services. The working checklist and grading allocation are in [docs/assignment-1-checklist.md](docs/assignment-1-checklist.md).
