# Portfolio

Personal portfolio site. Next.js (App Router) · TypeScript · Tailwind CSS v4 ·
deployed to Vercel. The plan it was built from lives in [prd/](prd/).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

## Checks

```bash
npm run build        # must pass with zero TypeScript errors
npm run typecheck    # types only (run `next build` once first — it generates route types)
npm run check:apis   # calls all four endpoints against a running dev server
npm run lint
```

## Configuration

One secret, optional in development:

```bash
cp .env.example .env.local
# GITHUB_TOKEN=ghp_...   classic token, scopes: read:user, public_repo
```

Without it the GitHub endpoint still works but the contribution count is
omitted, and you share the unauthenticated 60-requests-per-hour limit.
`.env*` is gitignored.

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
- `app/api/` — four route handlers, thin wrappers over `lib/stats.ts`.
- `lib/stats.ts` — the data layer. Server components call it directly rather
  than fetching their own API over HTTP.
- `components/sections/` — the page sections.
- `components/ui/` — components pasted from 21st.dev / Aceternity, owned in
  place. No wrapper layer over them.
