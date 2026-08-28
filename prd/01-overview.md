# 1. Overview

## What this site is

A personal portfolio website. One person, one site, one job: get you hired.

## Who actually reads it

Three people, in this order of importance.

**The recruiter.** Skims for 30–60 seconds, usually on a phone, usually with ten
other tabs open. They are checking one thing: does this person match the role I
am filling? If they cannot answer that fast, they close the tab. Everything on
the home page is built for this person.

**The hiring manager or engineer.** Arrives after the recruiter passes you on.
They want depth — what you actually built, what stack, what the outcome was.
This is who the individual section pages are for.

**The automated scraper.** Applicant tracking systems and search engines read the
raw HTML. They do not run animations and they do not see images. This is why the
site uses proper HTML tags instead of styled `div`s everywhere.

## What the site must achieve

In priority order. When two goals conflict, the higher one wins.

1. **Say what you do, immediately.** Your role and specialism visible without
   scrolling.
2. **Show proof.** Projects and experience with real outcomes, not job
   descriptions. Live stats from GitHub, LeetCode and Codeforces are proof that
   updates itself.
3. **Load fast.** A portfolio that takes five seconds to appear has already
   failed, no matter how good it looks.
4. **Make contact obvious.** Email, GitHub and LinkedIn reachable from every
   page.
5. **Look like you built it on purpose.** Distinctive, not a template. This is
   itself a work sample.

## What "done" means

The site is finished when all of these are true:

| Check | Target |
|---|---|
| Largest Contentful Paint (how long until the main content appears) | Under 2.5 seconds on a mid-range phone |
| Cumulative Layout Shift (how much the page jumps while loading) | Under 0.1 |
| Text contrast against any background | At least 4.5:1 |
| Keyboard navigation | Every link and button reachable by Tab, focus always visible |
| Reduced motion setting | All animation stops, nothing becomes unreadable |
| Build | `npm run build` passes with zero TypeScript errors |
| API endpoints | All four return valid data, and degrade gracefully when the source is down |

## Rules that are not negotiable

These come from the project's `CLAUDE.md` and apply to every piece of work.

**Every animation respects `prefers-reduced-motion`.** Some people get motion
sickness or migraines from parallax and movement. Their operating system already
broadcasts this preference. An animation that ignores it is a bug, not a
stylistic choice.

**Text stays readable over any background.** Aurora gradients and hero images
look great and destroy contrast. The fix is a dark scrim behind the text, never
dimming the text itself.

**Proper HTML tags.** `<nav>`, `<main>`, `<article>`, `<h1>` through `<h3>` in
order. Screen readers and job-board scrapers both depend on this.

**Check icon licences before shipping.** Font Awesome's free tier is fine. The
Noun Project's free tier requires visible attribution — either credit it or buy
the icon.

**Performance is a feature.** Every animation and every image is weighed against
the load-time budget above. The hero section is almost always what breaks it.

## What this site deliberately does not have

Each of these was considered and dropped, so nobody has to re-litigate them
later.

- **No contact form.** A `mailto:` link opens the visitor's own mail app with
  your address prefilled. It costs nothing to run, cannot break, and gets no
  spam. A form needs a backend, a rate limiter, and a spam filter to do the same
  job slightly better.
- **No database.** Nothing on this site changes at runtime. All content is files
  in the repo.
- **No CMS.** Blog posts are Markdown files. Writing a post is writing a file and
  pushing it.
- **No login, no comments, no analytics dashboard.** None of them help a
  recruiter decide anything.
- **No second animation library.** One motion system for the whole site. Two
  reads as indecision and doubles the download size.
