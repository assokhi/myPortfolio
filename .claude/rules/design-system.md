# Design system — marcushutchins.com direction

Reskin target (2026-09-09): one typeface, white page, navy text, no borders,
no shadows, no cards, generous rhythm, single left-aligned column. Reference
measured directly via devtools computed styles at 1443px and 390px — see the
build plan at `~/.claude/plans/this-is-not-looking-mellow-scone.md` for the
full reasoning and before/after tables. This file is the token reference that
survives after that plan is executed.

## Typography

Single family: **Jost** (400/500/700/900), fallback
`"Helvetica Neue", Helvetica, Arial, sans-serif`. Loaded via `next/font/google`
in `app/layout.tsx`. Code/`<pre>` uses the system mono stack
(`ui-monospace, SFMono-Regular, Menlo, monospace`) — no webfont for code.

| Role | Mobile → desktop | Classes |
|---|---|---|
| h1 | 32 → 55px | `text-[2rem] sm:text-[3.4375rem] font-black leading-[1.3] tracking-[-0.02em]` |
| h2 section | 24px, flat (does not scale) | `text-2xl font-bold leading-[1.3] tracking-[-0.02em]` |
| h3 card title | 20px | `text-xl font-bold tracking-[-0.01em]` |
| body | 18 → 20px | `text-[1.125rem] sm:text-xl leading-[1.5]` |
| meta/label | 14px | `text-sm font-medium tracking-wide` |

h2 stays flat across breakpoints deliberately — copied from the reference.
Only h1 and body scale.

## Color

Three-state, system-driven, resolved in CSS with no JS default:

1. `:root` = light palette (the floor, applies with no `data-theme` and no JS).
2. `@media (prefers-color-scheme: dark)` + `:root:not([data-theme="light"])` = dark palette.
3. `:root[data-theme="dark"]` / `:root[data-theme="light"]` = explicit toggle override, wins both directions.

Dark is a hand-designed palette, never a computed inversion — hue does not
survive inversion (see the plan's naive-inversion table).

| Token | Light | Dark | Contrast |
|---|---|---|---|
| `--color-bg` | `#fdfdfd` | `#101219` | — |
| `--color-surface` | `#F4F4F7` | `#1A1D26` | hairline separation |
| `--color-fg` | `#1E2740` | `#E9EAF0` | 14.5:1 / 15.6:1 |
| `--color-muted` | `#565571` | `#A2A1B5` | 7.0:1 / 7.4:1 |
| `--color-accent-2` (links) | `#2545C4` | `#9DB2F5` | 7.6:1 / 9.0:1 |
| `--color-border` | `#E6E6EC` | `#252833` | hairlines only |

Rules that keep dark from being a flip:

1. Dark tops out below maximum contrast (15.6:1, not 21:1) — max contrast on
   a dark ground haloes.
2. Links stay blue in both themes, lightened/desaturated for dark, never hue-shifted.
3. Surface moves in opposite directions: darker than page in light, lighter
   than page in dark — elevation always reads as "closer to the light".

`--color-beam` and `--sheet-shadow` are deleted (zero consumers). Lime/mint
fills and their `-ink` variants stay, muted to sit inside the new palette.

## Spacing

Two widths only:

- `--w-page` / `pageShell`: `max-w-[71.25rem]` (1140px) — outer container, grids, nav.
- `--w-prose` / `proseMeasure`: `max-w-[38rem]` (608px, ≈68ch at 20px) — running text.

One rhythm: `py-15 sm:py-20` (60px mobile, 80px desktop) replaces every prior
`py-12/14/16/20/24` mix. Gutter: `px-5` (20px) everywhere. Heading-to-body
gap: `mb-8` everywhere.

Defined in `lib/utils.ts` as `pageShell`, `proseMeasure`, `heading1`, `heading2`
— same file/pattern as before (`cardSurface`), no new abstraction layer.

## De-carded surfaces

No cards, no shadows, no rounded containers. `cardSurface` is a hairline top
rule: `border-t border-border pt-6 transition-colors`. Nav is a static
transparent text menu, no scroll-collapse glass pill.

## Mobile is a first-class reference, not derived

Measured independently at 390px, not shrunk from desktop:

| Rule | Value |
|---|---|
| Gutter | `px-5` (20px), every section/page |
| Section rhythm | `py-15` (60px) |
| h1 | 32px (deliberate mobile size, not scaled-down 55px) |
| h2 | 24px, unchanged from desktop |
| Body | 18px / lh 1.5 |
| Content cap | `max-w-[30rem]` (480px) |
| Overflow | `document.scrollWidth === innerWidth`, always — any horizontal scroll is a defect |
