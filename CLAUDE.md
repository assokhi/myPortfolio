# myPortfolio

Personal portfolio site. **Purpose: job hunting** — a recruiter skims this in
under a minute. Every call ranks: clear role → projects with outcomes → fast
load → easy contact. Animation supports scanning; it never delays it.

Status: reskinned 2026-09-09 to the marcushutchins.com direction, against the
build spec in `~/.claude/plans/this-is-not-looking-mellow-scone.md` — token
reference persisted at `.claude/rules/design-system.md`. `prd/` describes the
FIRST build (routes `/about`, `/experience`, `/skills`; lamp and tracing-beam
design) and is superseded — read it for the reasoning about audience and performance budgets,
not for the current structure.

Content files still carry example data marked `TODO(you)`, and some of it is
live: the certifications are fabricated and six of seven blog posts are lorem
ipsum. That is the highest-priority fix on a site whose job is hiring.

## Stack (decided 2026-08-23)

Next.js App Router · TypeScript · Tailwind CSS · deployed to Cloudflare Workers
(static export in `out/` served by Workers Static Assets, plus `worker.ts` for
`/api/visitors` only). Push to `main` → Cloudflare Workers Builds → production;
that is the only deployment path. Stats are baked at build time — no ISR.

Chosen because [21st.dev](https://21st.dev/) and [Aceternity UI](https://ui.aceternity.com/)
are copy-in React + Tailwind registries — they are the component source, not npm
dependencies. Paste components into `components/ui/` and own them.

## Skills in this repo

`.claude/skills/` — load these, don't re-derive them:

- **ponytail** — the write-less-code decision ladder. Applies to every change.
- **caveman** — terse output mode, on request. Never applies to site copy, commits, or docs.
- **design-sources** — the approved reference pack, with per-source licensing and a11y rules.

## Non-negotiables

- **`prefers-reduced-motion` on every animation.** Not optional. An Aceternity
  effect without a reduced-motion fallback is a defect, not a shortcut.
- **Contrast survives the background.** 4.5:1 over aurora/image heroes — add a
  scrim, never lower the type contrast.
- **Semantic HTML and keyboard reachability.** Recruiters use screen readers too,
  and so do the ATS scrapers that read this page.
- **Licence-check icons before shipping.** Noun Project free tier needs attribution.
- **Performance budget:** LCP < 2.5s, CLS < 0.1 on a mid-range phone. The hero is
  the usual offender — prefer CSS gradients and SVG over large PNGs.

## Conventions

- Registry components land in `components/ui/`, unmodified on first paste, then
  edited in place. No wrapper abstraction layer over them (ponytail, rung 1).
- Aceternity components often need Tailwind config additions (custom keyframes,
  `tailwindcss-animate`) — copy the config block, not just the JSX, or the
  component silently renders static.
- Many registry blocks are `"use client"`. Keep them behind a client boundary.
- One motion system for the whole site. Two animation libraries reads as
  indecision and doubles the bundle.
- Content lives as data, not JSX — projects and experience in a typed array so
  adding one is a data edit.

## Commands

```bash
npm run dev          # http://localhost:3000 (no runtime /api/* — those are worker.ts)
npm run build        # static export to out/; must pass with zero TypeScript errors
npm run preview      # wrangler dev on :8787 — out/ + worker.ts, the deployed shape
npm run lint

# all six endpoints, against `npm run preview`
CHECK_BASE_URL=http://127.0.0.1:8787 npm run check:apis

npx wrangler types   # regenerate worker-configuration.d.ts after editing wrangler.jsonc
npx wrangler d1 execute portfolio_db --local --file=db/schema.sql
```

On Windows `wrangler dev` keeps a handle on `out/`, so `npm run build` fails with
`EBUSY: rmdir out` while the preview is running. Stop the preview first.

`npm run typecheck` needs `next build` to have run once — Next generates the
`PageProps`/`LayoutProps` route types into `.next/types`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
