# Portfolio

Personal portfolio site. Next.js (App Router) · TypeScript · Tailwind CSS v4 ·
deployed to Cloudflare Workers as a static export plus one small Worker. The
plan it was built from lives in [prd/](prd/).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000 — Next dev server
npm run build        # static export to out/
npm run preview      # wrangler dev — out/ + worker.ts on http://localhost:8787
```

`npm run dev` serves everything except `/api/visitors`, which is Worker code
now. Use `npm run preview` to exercise the deployed shape.

## Checks

```bash
npm run build        # must pass with zero TypeScript errors
npm run typecheck    # types only (run `next build` once first — it generates route types)
npm run lint
npm run check:bento

# all five endpoints, against `npm run preview` in another terminal
CHECK_BASE_URL=http://127.0.0.1:8787 npm run check:apis
```

## Architecture

```text
GitHub main
     │ push (or the daily Refresh stats deploy hook)
     ▼
Cloudflare Workers Builds
     │ npm ci → npm run build → npx wrangler deploy
     ▼
Cloudflare Worker  (worker.ts)
     │
     ├── /api/visitors ──────► KV counter (Upstash until KV is bound)
     ├── /api/blog-views ────► KV  (read every post's count)
     ├── /api/blog-views/:s ─► KV  (record one read, deduped per IP+slug+day)
     ├── /api/contact ───────► Turnstile → D1 → Resend
     ├── /api/newsletter ────► Turnstile → D1
     │
     └── everything else ────► Workers Static Assets ──► out/
```

Every binding is optional at runtime. With no KV or D1 bound, those endpoints
answer `{ ok: false }` and the UI degrades — the counter badge hides itself,
`/views` still lists every post without numbers, and the contact form tells the
visitor to email instead. That is what lets the Worker be deployed before the
namespaces exist.

`next.config.ts` sets `output: "export"`, so `npm run build` writes plain
HTML/CSS/JS, the blog pages, `out/opengraph-image`, `out/sitemap.xml` and the
four stats JSON files (`out/api/github`, `leetcode`, `codeforces`,
`verifications`) — all served as static assets, which do not count as Worker
invocations. `public/_headers` fixes the MIME types of the extension-less files
Next emits for those routes.

**Stats are baked at build time.** There is no ISR: the numbers are as fresh as
the last deploy. `.github/workflows/refresh-stats.yml` POSTs a Cloudflare Deploy
Hook once a day, which starts the same Workers Build a push starts — one
deployment pipeline, two triggers.

## Configuration

Local development (`.env`, gitignored — `cp .env.example .env`):

| Variable | Used by | Needed for |
|---|---|---|
| `GITHUB_TOKEN` | build | Contribution calendar; without it GitHub still answers, but unauthenticated (60 req/hour) and with no calendar |
| `UPSTASH_REDIS_REST_URL` | `worker.ts` | Visitor counter under `npm run preview` (until KV is bound) |
| `UPSTASH_REDIS_REST_TOKEN` | `worker.ts` | Same |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | build | Renders the Turnstile widget. Absent = no widget, and the Worker skips the check to match |
| `TURNSTILE_SECRET_KEY` | `worker.ts` | Server-side token verification |
| `RESEND_API_KEY` | `worker.ts` | Contact-form email delivery |
| `CONTACT_TO_EMAIL` | `worker.ts` | Where contact mail is sent |
| `NEXT_PUBLIC_PEERLIST_URL` | build | Optional footer embed; omitted entirely when unset |

Production (nothing secret is committed — see [Deployment](#deployment)):

- `GITHUB_TOKEN` — Workers Builds **build variable** (encrypted). Build time only.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — Workers Builds **build variable**. Public
  by design; it is rendered into the page.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `TURNSTILE_SECRET_KEY`,
  `RESEND_API_KEY`, `CONTACT_TO_EMAIL` — **Worker secrets**. Runtime only, never
  reach the browser.

### Storage, once you have the ids

`wrangler.jsonc` deliberately declares no KV or D1 binding yet: a placeholder id
there fails the next deploy, and `main` deploys on push. To switch the backends
on:

1. `npx wrangler kv namespace create KV` and
   `npx wrangler d1 create portfolio_db`.
2. Add both to `wrangler.jsonc` (`binding: "KV"` and `binding: "DB"`).
3. `npx wrangler types` to regenerate `worker-configuration.d.ts`.
4. `npx wrangler d1 execute portfolio_db --remote --file=db/schema.sql`.
5. Deploy. The counter moves off Upstash automatically — `worker.ts` prefers KV
   whenever it is bound.

Everything public — usernames, links, email — lives in `content/profile.ts`.

## Deployment

GitHub `main` is the source of truth: a push builds and deploys the exact
repository state. Cloudflare Workers Builds is the only thing that deploys.

One-time Cloudflare setup (dashboard → Workers & Pages → the `portfolio`
Worker):

1. **Settings → Builds → Connect** the GitHub repository.
2. Production branch `main`, build command `npm run build`, deploy command
   `npx wrangler deploy`.
3. **Settings → Variables and Secrets**: add `UPSTASH_REDIS_REST_URL` and
   `UPSTASH_REDIS_REST_TOKEN` as Secrets (or `npx wrangler secret put <NAME>`).
4. **Settings → Builds → Build variables**: add `GITHUB_TOKEN` (encrypted).
5. **Settings → Builds → Deploy Hooks**: create one for `main`, then store the
   URL as the GitHub repository secret `CLOUDFLARE_DEPLOY_HOOK_URL` so the daily
   stats refresh can trigger it.
6. Optional: enable non-production branch builds for PR previews (they use
   `npx wrangler versions upload`, which uploads a preview version without
   promoting it to production).

Everything else — `wrangler.jsonc`, `worker.ts`, `next.config.ts` — is in the
repository. Do not edit production files in the Cloudflare dashboard.

Everything public — usernames, links, email — lives in `content/profile.ts`.

## Editing content

All of it is typed data. Add a job, a skill or a certificate by editing an
array, never a component.

| File | What it feeds |
|---|---|
| `content/profile.ts` | Hero, About, Contact, Footer, all metadata |
| `content/experience.ts` | Experience section and `/experience` |
| `content/skills.ts` | Skills section and `/skills` |
| `content/education.ts` | Education section and `/education` |
| `content/certifications.ts` | The certifications widget (`/api/verifications`) |
| `content/blog/*.mdx` | Blog. One file per post, frontmatter at the top |

Every file seeded with example data carries a `TODO(you)` comment.

## Structure

- `app/(sections)/` — route group; the five detail pages share a layout and
  `(sections)` never appears in a URL.
- `app/api/` — four route handlers, thin wrappers over `lib/stats.ts`, exported
  as static JSON (`export const dynamic = "force-static"`).
- `worker.ts` + `wrangler.jsonc` — the Cloudflare Worker: `/api/visitors` and
  the Static Assets binding. The only server-side code that runs in production.
- `lib/stats.ts` — the data layer. Server components call it directly rather
  than fetching their own API over HTTP.
- `components/sections/` — the page sections.
- `components/ui/` — components pasted from 21st.dev / Aceternity, owned in
  place. No wrapper layer over them.
