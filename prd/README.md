# Portfolio — product requirements

Everything this site needs to be, written down before any code exists.

## TLDR

A personal portfolio site for **job hunting**. A recruiter lands on it, and in
under a minute they should know what you do, see proof you can do it, and know
how to reach you.

It is one scrolling home page with seven sections. Each section also has its own
full page for anyone who wants more detail. Coding profile stats (GitHub,
LeetCode, Codeforces) are pulled live from those sites and cached. Blog posts are
Markdown files in this repo. Contact is three links — no form, no server.

Built with Next.js and Tailwind, deployed to Vercel.

## Which document answers what

| Document | Read it when you want to know |
|---|---|
| [01-overview.md](01-overview.md) | Who the site is for, what it must achieve, and how we tell if it worked |
| [02-structure.md](02-structure.md) | Every page and section, what each one achieves, and where its content lives |
| [03-api.md](03-api.md) | The four API endpoints — what they fetch, how they're cached, what happens when they fail |
| [04-build-plan.md](04-build-plan.md) | The order things get built, and how to check each piece works |

## Decisions already made

| Thing | Decision | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | The component libraries we want are React + Tailwind |
| Styling | Tailwind CSS | Same reason |
| Hosting | Vercel | Made by the Next.js team, free tier is enough, deploys on `git push` |
| Page structure | Home page scrolls through all sections; each also has its own page | Recruiters skim, hiring managers dig |
| Blog content | Markdown files in the repo | No CMS to pay for or maintain |
| Contact | Links only — email, GitHub, LinkedIn | Nothing to break, no spam to filter |
| Database | None | There is no data that needs saving |

## Status

Nothing is built yet. This folder is the plan. Building starts at Phase 1 in
[04-build-plan.md](04-build-plan.md).
