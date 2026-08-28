# 2. Structure — every page and section

## The idea in one line

The **home page scrolls through short versions of every section**. Each section
**also has its own full page** with everything else.

Why both: the recruiter never clicks anything, they just scroll and leave. The
hiring manager wants detail. Building only the scroll page starves the second
person. Building only separate pages makes the first person click six times
before seeing any of your work, and they won't.

## Address map

This is your original section tree, turned into real URLs.

| Your tree | On the home page | Its own page |
|---|---|---|
| `Home` | `/` | — |
| `Home/About` | `/#about` | `/about` |
| `Home/Experience` | `/#experience` | `/experience` |
| `Home/Skills` | `/#skills` | `/skills` |
| `Home/Education` | `/#education` | `/education` |
| `Home/Blogs` | `/#blog` — 3 most recent | `/blog` and `/blog/[slug]` |
| `Home/Extras` | `/#extras` | `/extras` |
| *(added)* Contact | `/#contact` | — |
| `Footer` | on every page | — |

Your tree has `info` and `assets` under several sections. Those become:

- **`info`** → a typed data file in `content/`. Adding a job or a course is
  editing an array, not editing a component.
- **`assets`** → images in `public/`. Company logos, university crest,
  certificate thumbnails.

---

## Section by section

### Hero (top of `/`)

**What this achieves:** answers "who is this and what do they do" before the
recruiter scrolls a single pixel.

Your name, your role in plain words (not "passionate innovator" — the actual
job title you want), one sentence on your specialism, and two buttons: view work,
download resume.

This section is the main risk to load speed. It gets a CSS gradient or an SVG
background, not a large photo. If a photo is used it must be optimised and sized
for mobile.

### About — `/#about` and `/about`

**What this achieves:** turns a list of skills into a person, and gives the
reader a reason to keep going.

On the home page: three or four sentences and your photo. On `/about`: the longer
version — how you got into this, what kind of problems you like, what you are
looking for next.

Content lives in `content/profile.ts` (short version) and the About page itself
(long version).

### Experience — `/#experience` and `/experience`

**What this achieves:** proves you have actually done the work, with numbers
where numbers exist. This is the section that gets you the interview.

Two different kinds of proof sit here:

**Work history** — jobs, internships, freelance. Each entry is a company, role,
dates, and two or three bullet points that describe an **outcome**, not a duty.
"Cut API response time from 800ms to 120ms" beats "responsible for backend
performance". Lives in `content/experience.ts`.

**Live coding stats** — pulled from GitHub, LeetCode and Codeforces, plus your
verified certificates. These update themselves, which means the section is never
stale, and they are third-party evidence rather than self-reported claims. This
is what the four API endpoints in [03-api.md](03-api.md) are for.

The stat widgets load **after** the rest of the page appears. If LeetCode is slow
today, your page still paints instantly and the numbers fill in a moment later.

### Skills — `/#skills` and `/skills`

**What this achieves:** lets a recruiter keyword-match you against their job
description in about five seconds.

Your tree splits this in two, and that split is worth keeping:

- **Stacks** — the combinations you actually build with. "Next.js + TypeScript +
  Postgres" tells a reader far more than three separate logos do.
- **Technologies worked** — the broader list of everything you have touched.

Be honest about the difference. A recruiter forgives "familiar with"; an
interviewer does not forgive a bluff.

Content in `content/skills.ts`. Plain text, so scrapers can read it — not icons
alone.

### Education — `/#education` and `/education`

**What this achieves:** clears the box some companies still tick, and gives
context if you are early in your career.

Degree, institution, dates, and anything genuinely notable — relevant
coursework, thesis, honours. Keep it short unless you are a recent graduate, in
which case this section carries more weight and can hold more.

Content in `content/education.ts`, crest and images in `public/`.

### Blog — `/#blog`, `/blog`, `/blog/[slug]`

**What this achieves:** shows you can explain your thinking, not only write code.
It is also the only part of the site that brings in visitors from search.

The home page shows the three most recent posts. `/blog` lists them all.
`/blog/[slug]` is an individual post.

Posts are Markdown files in `content/blog/`. Each starts with a small header
block:

```
---
title: Why our API got 6x faster
date: 2026-08-01
summary: One index, one bad query, and a lesson about ORMs.
tags: [postgres, performance]
---
```

Writing a post means creating a file and pushing it. No admin panel, no login,
nothing to pay for. Every post is turned into plain HTML at build time, so they
load instantly and rank well.

If you have no posts yet, the section is hidden rather than shown empty. An empty
blog looks worse than no blog.

### Extras — `/#extras` and `/extras`

**What this achieves:** makes you memorable. A recruiter reviews forty
portfolios in a day and they blur together. The one who restores mechanical
keyboards or writes about climbing is the one they remember at the shortlist
meeting.

Things you like, side interests, books, whatever is genuinely yours. Keep it
brief and real. This section is small on purpose — it is seasoning, not the meal.

Content in `content/extras.ts`.

### Contact — `/#contact`

**What this achieves:** a recruiter reaches you in one click, from any device,
with nothing to break and no spam to filter.

Three links and a download, no form, no server:

- **Email** — a `mailto:` link. Clicking it opens whatever mail app the visitor
  already uses (Gmail in the browser, Outlook, Apple Mail) **with your address
  already in the To: field**, plus a prefilled subject line so portfolio mail is
  easy to spot in your inbox:

  ```
  mailto:you@example.com?subject=Opportunity%20—%20via%20your%20portfolio
  ```

  Show the address as visible text as well, so it can be copied by hand if a
  browser blocks `mailto:` links.

- **GitHub** and **LinkedIn** — plain links, opening in a new tab.
- **Resume** — a PDF in `public/`, direct download.

### Footer — every page

**What this achieves:** whoever scrolls to the bottom of anything can still reach
you without scrolling back up.

Credits (what the site is built with, plus any required icon attribution),
copyright line, and the same contact links repeated.

All addresses and URLs come from `content/profile.ts`, so one edit updates the
contact section and the footer together.

---

## Folder layout

```
app/
├── layout.tsx              fonts, theme, header, footer — wraps every page
├── page.tsx                the home page, all sections
├── (sections)/             a "route group": shared layout, no /sections/ in the URL
│   ├── layout.tsx          back-to-home nav and shared spacing
│   ├── about/page.tsx
│   ├── experience/page.tsx
│   ├── skills/page.tsx
│   ├── education/page.tsx
│   └── extras/page.tsx
├── blog/
│   ├── page.tsx            list of posts
│   └── [slug]/page.tsx     one post
├── api/
│   ├── github/route.ts
│   ├── leetcode/route.ts
│   ├── codeforces/route.ts
│   └── verifications/route.ts
├── sitemap.ts              tells search engines every URL
├── robots.ts               tells crawlers what they may read
├── opengraph-image.tsx     the preview card when a link is shared
├── not-found.tsx           the 404 page
└── error.tsx               shown if something crashes

components/
├── ui/                     components pasted from 21st.dev and Aceternity
└── sections/               Hero, About, Experience, Skills, Education,
                            Blog, Extras, Contact, Footer

content/
├── types.ts                the shape of every content file
├── profile.ts              name, role, socials, email, resume link
├── experience.ts           jobs
├── skills.ts               stacks and technologies
├── education.ts            degrees
├── certifications.ts       certificates — feeds /api/verifications
├── extras.ts               interests
└── blog/*.mdx              posts

lib/
├── fetch-json.ts           shared helper: fetch with a timeout
└── schemas.ts              validation rules for external API responses

public/                     images, logos, resume PDF
```

## About the routing

You asked for advanced routing. Here is what is actually used and what each
feature buys — nothing is included for its own sake.

**Route group `(sections)`** — the five detail pages share one layout (the
back-to-home nav, the spacing) without `/sections/` appearing in the URL. The
folder organises the code; the visitor never sees it.

**Dynamic segment `[slug]`** — one file, `blog/[slug]/page.tsx`, serves every
blog post. Twenty posts, one file.

**`generateStaticParams`** — at deploy time, Next.js reads your Markdown folder
and builds a real HTML file for every post. Visitors get instant loads, and
search engines get plain HTML.

**Route handlers** — the four API endpoints. Covered in [03-api.md](03-api.md).

**`generateMetadata`** — each page sets its own browser tab title, search
description, and social preview card. Sharing `/experience` on LinkedIn shows an
experience-specific card, not a generic one.

**Streaming with `<Suspense>`** — the page paints immediately with placeholder
boxes where the live stats will go, then the numbers stream in when the APIs
answer. This is what stops a slow LeetCode response from wrecking your load-time
score.

**Intercepting routes — optional, Phase 7.** Clicking a certificate opens it as
a pop-over on top of the page, and the URL changes to that certificate's address.
Paste that URL to someone and they get a full page instead. It is a genuinely
nice touch and it is genuinely optional; nothing depends on it.

## Component rules

- Components pasted from 21st.dev or Aceternity go into `components/ui/`
  **unchanged the first time**, then edited in place. No wrapper layer on top of
  them.
- Aceternity components usually need extra Tailwind configuration (custom
  keyframes and similar). Copy the config block from their page too — without it
  the component renders but never animates, silently.
- Most of these components need `"use client"` at the top because they use
  browser features. Keep them inside a client boundary or the build fails.
- One motion library across the whole site.
