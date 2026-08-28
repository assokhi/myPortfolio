# 4. Build plan

## Order of work

Eight phases. Each one ends in something you can look at and check.

| Phase | What happens | Finished when |
|---|---|---|
| 1 | Set up the project and the visual basics | `npm run build` passes on a blank page |
| 2 | Write the content files with your real information | Content compiles, no placeholder text left |
| 3 | Build the static sections | The home page reads top to bottom with real content |
| 4 | Build the routing and the detail pages | Every URL in the address map works |
| 5 | Build the four API endpoints and the Experience section | All four return valid data and fail gracefully |
| 6 | Build the blog | A test post appears at its own URL |
| 7 | Add the animation | Reduced-motion setting stops all of it |
| 8 | Check performance and accessibility, then deploy | All targets in the checklist below are met |

---

## Phase 1 — set up

Create the Next.js project (version 16.3.2, the current stable release) with
TypeScript, Tailwind and the App Router.

Then, before any component exists, decide the visual basics: colour palette,
font choices, type sizes, spacing scale. These go into the Tailwind config as
named tokens. Picking them now means every component built afterwards is
consistent by default, instead of being reconciled later.

Also in this phase: delete `.claude/skills/caveman/` and
`.claude/skills/ponytail/`. Those were written as standalone copies before the
real plugins were installed; now that the plugins are in, the copies state the
same rules twice.

**Security note:** a critical Next.js security fix is scheduled for
**26 August 2026**. Run `npm update next` after that date and before the site
goes public.

## Phase 2 — content first

Write `content/types.ts` (the shape of everything), then fill in `profile.ts`,
`experience.ts`, `skills.ts`, `education.ts`, `certifications.ts` and
`extras.ts` with your real information.

**Content before layout, deliberately.** Building components against invented
placeholder text means rebuilding them when the real content turns out to be
three lines longer or has an extra field. Writing the content first costs an
afternoon and saves a rewrite.

This is also the slowest phase, because writing about yourself is harder than
writing code. Budget for that.

## Phase 3 — the static sections

Build Hero, About, Skills, Education, Extras, Contact and Footer. All of these
read from the content files and have no live data, so they are straightforward.

By the end of this phase the home page is a complete, readable document. No
animation yet, no live stats yet — but if you had to send someone the link
today, it would already do its job.

## Phase 4 — routing

Add the route group and the five detail pages, per-page metadata, the sitemap,
the robots file, the 404 page and the error page.

Check every address in the map in [02-structure.md](02-structure.md) resolves,
and that every in-page anchor link scrolls to the right section.

## Phase 5 — the live data

Build `lib/fetch-json.ts`, `lib/schemas.ts`, then the four route files, then the
Experience section that displays them.

The stat widgets go inside `<Suspense>` so the page paints before the data
arrives. Build the fallback state at the same time as the success state — not
afterwards. Fallbacks added later are the ones that never get tested.

## Phase 6 — the blog

Set up the Markdown pipeline, the list page and the post page. Write one real
post to prove it works end to end.

If you have no posts to publish yet, hide the blog section on the home page. An
empty blog reads worse than no blog.

## Phase 7 — animation

Now, and not before. Every animation gets a `prefers-reduced-motion` check as it
is written, not as a cleanup pass afterwards.

Animation is last because it is the easiest thing to overdo and the easiest to
cut. With the site already working, it is obvious which movements help someone
scan the page and which are just noise.

Optional here: the certificate pop-over using intercepting routes.

## Phase 8 — check and deploy

Run the full checklist below, fix what fails, connect the repository to Vercel.
Deployment is automatic on push after that.

---

## Dependencies

Beyond Next.js, React, TypeScript and Tailwind:

| Package | What it's for | Why not something else |
|---|---|---|
| `motion` | All animation | The component libraries assume it. One library for the whole site |
| `zod` | Checking external API responses | Data from other companies' servers is untrusted input |
| `next-mdx-remote` + `gray-matter` | Turning Markdown files into blog pages | Reads posts from `content/`, keeping them out of the app folder |
| `lucide-react` | Interface icons | MIT licensed, no attribution needed, matches the component libraries |

**Not being added:** any CMS, any database, any state management library, any
email service. `tailwindcss-animate` only if a pasted component actually needs
it.

For brand or specialty icons, Font Awesome's free tier is fine. The Noun
Project's free tier requires visible attribution — credit it in the footer or
buy the icon.

---

## How to verify the whole thing

### 1. It builds

```
npm run build
```

Must pass with zero TypeScript errors. This also proves every route compiles and
every blog post generated correctly.

### 2. The APIs return what they should

One script, `scripts/check-apis.ts`, calls all four endpoints and validates each
response against the same schemas the routes use. Run it against the dev server.

This is the one automated check the project commits to. Everything else here is a
manual pass, because a portfolio's real failure modes are visual and cannot be
asserted in a test.

### 3. Failures look fine

Point the LeetCode username at a user that does not exist. Reload. The widget
shows its fallback, the page still works, nothing is broken visually. Repeat for
GitHub and Codeforces.

### 4. It's fast enough

Run Lighthouse in mobile mode against the deployed URL.

- Largest Contentful Paint under 2.5 seconds
- Cumulative Layout Shift under 0.1

If LCP fails, the hero background is the first thing to check — it usually is.

### 5. It works without a mouse

Tab from the top of each page to the bottom. Every link and button must be
reachable, and the focus outline must always be visible. Try the blog and the
detail pages too, not only the home page.

### 6. It respects reduced motion

In browser devtools, set `prefers-reduced-motion: reduce`. Reload.

All movement stops. Nothing becomes invisible or unreadable as a side effect —
a fade-in that never fades in leaves an invisible element, which is a worse
outcome than the animation.

### 7. Contact actually works

Click the email link on desktop and on a real phone. A mail app must open with
your address already in the To: field. Check the address is also visible as
copyable text, and that GitHub, LinkedIn and the resume PDF all open correctly.

### 8. Security

After 26 August 2026, run `npm update next`, rebuild, and redeploy before
sharing the link publicly.

---

## Rough effort

Not deadlines — relative sizes, so you can see where the time actually goes.

| Phase | Size |
|---|---|
| 1 — setup and design tokens | Small |
| 2 — writing your content | **Largest.** This is writing, not coding |
| 3 — static sections | Medium |
| 4 — routing | Small |
| 5 — APIs and Experience | Medium |
| 6 — blog | Small |
| 7 — animation | Medium, and easy to let run long |
| 8 — checks and deploy | Small |

The two phases that consistently overrun are 2 and 7 — writing honestly about
yourself, and knowing when to stop adding effects.
