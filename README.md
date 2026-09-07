# CAS Design System — Documentation Site

Next.js documentation and component reference site for the CAS Design System: foundations
(tokens, color, typography, spacing, radius, grid), component pages with interactive
playgrounds, templates, published prototypes, and design library resources.

Live site: https://casdesignsystem.vercel.app

## Stack

- **Next.js** (App Router) + **React 19**
- **Tailwind CSS v4**, `class-variance-authority` + `cn()` for component variants (shadcn/ui conventions)
- **FontAwesome** for iconography
- Deployed on **Vercel** (see `vercel.json`)

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npm test        # build + rendered-HTML checks (tests/rendered-html.test.mjs)
```

## Project structure

- `app/` — routes (App Router). Each foundation/component/pattern page lives under its own
  route folder (e.g. `app/components/card/page.tsx`, `app/tokens/page.tsx`).
- `components/` — shared UI. `components/ui/` holds the design system's own components
  (Button, Card, Badge, Alert, Sidebar, etc.); everything else is site chrome
  (`app-shell.tsx`, `page-header.tsx`, …).
- `app/token-data.ts` / `app/data/variables.json` — the design tokens consumed by the site,
  generated from the canonical Figma Variables export.
- `Methodology_AI_assisted/` — the governance methodology for this project (see below).
- `tests/rendered-html.test.mjs` — build-and-render smoke tests.

## Design tokens & governance

This repository follows the AI-assisted Design System methodology in
[`Methodology_AI_assisted/`](./Methodology_AI_assisted/README.md). Before making material
changes — especially anything touching tokens, component contracts, or architecture — read
that folder's `README.md` and the relevant authoritative document (`PROJECT_CONTEXT.md`,
`DESIGN_GOVERNANCE.md`, `DESIGN_GUARD_RAILS.md`, `CODE_ARCHITECTURE_AND_MIGRATION.md`).

The canonical, live source of token data is
[`Methodology_AI_assisted/tokens/design-tokens.json`](./Methodology_AI_assisted/tokens/design-tokens.json)
(a Figma Variables export). `app/data/variables.json` is derived from it for consumption by
`app/token-data.ts`.

## Deployment

The site auto-deploys to Vercel from `main` (see `vercel.json` for the framework/build
configuration).
