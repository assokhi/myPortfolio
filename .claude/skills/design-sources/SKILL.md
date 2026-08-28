---
name: design-sources
description: >
  The approved design reference pack for this portfolio — component registries,
  animation libraries, background generators, icon sets and fonts, plus the
  licensing and accessibility rules that apply to each. Use before choosing any
  visual direction, hero treatment, animation, icon, background, or typeface,
  and whenever asked for design inspiration or a component to copy.
---

Consult these before inventing visual direction. Pick from the pack; do not
freestyle a look and then retrofit references to it.

## Components — start here

| Source | What it is | Use for |
|---|---|---|
| [21st.dev](https://21st.dev/) | Community React + Tailwind registry, shadcn-compatible | Heroes, bento grids, marquees, pricing/feature blocks |
| [Aceternity UI](https://ui.aceternity.com/) | Framer Motion + Tailwind animated components | Spotlight, aurora background, 3D card, text-generate, sticky scroll |

Both presuppose **React + Tailwind CSS**. Choosing either effectively fixes the
stack — decide that consciously rather than discovering it halfway through.

## Animation direction

- [Awwwards — animation libraries collection](https://www.awwwards.com/awwwards/collections/animation-libraries-examples-inspiration/)

Use it to choose *which* library and *how much* motion, not to clone a site. Pick
one motion system and stay in it; two animation libraries in one portfolio reads
as indecision and doubles the bundle.

## Backgrounds & imagery

- [Awwwards — big background images](https://www.awwwards.com/websites/big-background-images/) — full-bleed hero patterns
- [coolbackgrounds.io](https://coolbackgrounds.io/) — generated gradient / particle / geometric assets, SVG and PNG export

Prefer the SVG or a CSS gradient over a large PNG. A 3 MB hero image undoes every
other performance decision on the page.

## Icons & type

- [The Noun Project](https://thenounproject.com/) — broad icon search. **Free tier requires attribution** — check the licence per icon before shipping, or buy the icon.
- [Font Awesome](https://fontawesome.com/) — free tier covers most portfolio needs. Import only the icons used; the full kit is megabytes.

## Rules that apply to everything above

- **Honour `prefers-reduced-motion`.** Every Aceternity-style effect needs a
  reduced-motion fallback. This is an accessibility requirement, not a nicety.
- **Contrast survives the background.** Text over an aurora or image hero still
  needs 4.5:1 — add a scrim rather than lowering the type contrast.
- **Copy-paste is the point** for 21st.dev and Aceternity — they are copy-in
  registries, not npm dependencies. Paste the component in and own it; do not
  build an abstraction layer over it (see the `ponytail` skill, rung 1).
- **Check the licence before shipping**, not after — Noun Project especially.
- **Motion has a budget.** Measure LCP and CLS once the hero is real.

## Gotchas

- Aceternity components frequently assume specific Tailwind config (custom
  keyframes, `tailwindcss-animate`) — copying the JSX alone silently gives a
  static component. Copy the config block too.
- Many 21st.dev blocks ship with `"use client"` and hooks; in a server-component
  framework they must land in a client boundary or the build fails at runtime.
- Awwwards sites are built by studios over months. They are a direction reference,
  not a scope estimate.

## Paste recipe for this repo (verified 2026-08-23 on the Lamp component)

Every 21st.dev / Aceternity paste hits the same four things here. Fix them in
this order and the component works first try.

1. **`framer-motion` → `motion/react`.** Same library; `motion` is the successor
   package and is already installed. Installing framer-motion alongside it ships
   two copies of the same code.
2. **`@/lib/utils` must exist.** Registry components import `cn` from there.
   It is `twMerge(clsx(inputs))` — needs `clsx` and `tailwind-merge` **v3+**
   (v2 does not understand Tailwind v4 class names). Both installed.
3. **Tailwind v4 killed the v3 gradient config.** `bg-gradient-conic` does not
   exist (v4 calls it `bg-conic`), and `--tw-gradient-stops` is composed
   differently, so `from-*/via-*/to-*` feeding an inline `conic-gradient(...)`
   silently renders a flat box. Write the whole gradient inline instead of
   relying on the stops variable. This is the "copies the JSX, forgets the
   config" failure in concrete form.
4. **`useReducedMotion()` must not change what renders.** It resolves on the
   client only, so branching `initial` on it is a hydration mismatch — Next's
   dev overlay flags it as an issue. Branch the **transition** instead
   (`{ duration: 0 }` when reduced): every element still reaches its end state,
   just instantly. See `components/ui/lamp.tsx`.

Not a shadcn project — there is no `components.json`, and `npx shadcn init`
would overwrite `app/globals.css` and the design tokens in it. Do not run it.
Paste files into `components/ui/` by hand; the `@/*` alias already resolves.
