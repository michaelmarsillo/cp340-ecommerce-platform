# Starter verification

Verified locally on **October 1, 2026**. This records the starter’s actual validation; it is not a claim that Assignment 1 is complete or deployed.

## Build and quality checks

- `npm run check`: strict TypeScript compilation, ESLint, and Prettier checks pass.
- `npm run build`: production client build passes and writes static output to `dist/`.
- Dependency installation reports zero known vulnerabilities at installation time.
- `origin` points to `https://github.com/michaelmarsillo/cp340-ecommerce-platform.git`; a remote listing succeeded and the remote was empty at setup time.

The starter was published in six focused commits. The GitHub workflow, PR template, and shared VS Code settings were subsequently removed to keep the repository simple. Quality checks remain available locally through the npm scripts. A public website has not been deployed.

## Browser review

- Reviewed desktop and mobile page layouts in the in-app browser.
- Checked viewport widths of 1280, 768, 390, and 320 pixels; no horizontal document overflow was detected. The browser’s scrollbar reduces the corresponding content width slightly.
- All rituals shows five products; Nootropics shows two, Rituals shows two, and Bundles shows one.
- Product illustrations and title buttons open the appropriate details.
- Product dialogs display content and CAD pricing on desktop and phone layouts.
- Escape and the Keep exploring button close the dialog and return focus to the opening control. Body scrolling is restored.
- The mobile menu opens, closes with Escape, and closes after following a section link.
- The introductory field note expands to show its remaining content.
- Section links target the collection, philosophy, field note, and privacy notice.

During development, moving CSS into the catalog feature briefly produced hot-reload messages before the new file was created. The completed page was reloaded and verified again.

## Still required before submission

See [assignment-1-checklist.md](assignment-1-checklist.md) for the dedicated pages, final content review, actual hosting privacy settings, public deployment, and one-member submission. Recheck the built site on the selected host after those changes.
