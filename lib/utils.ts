import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** The class merger every 21st.dev / Aceternity component imports from
 *  "@/lib/utils". twMerge lets a caller's className override the component's
 *  own defaults instead of both landing in the class list. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Outer container for every section, grid and nav — the marcushutchins.com
 *  reference measured at 1140px, with the one section rhythm (60px mobile,
 *  80px desktop) and gutter (20px) baked in so no page repeats the numbers. */
export const pageShell = "mx-auto w-full max-w-[71.25rem] px-5 py-15 sm:py-20";

/** Cap for any block of running text — ~68ch at 20px, the width past which a
 *  line gets hard to track back to its start. */
export const proseMeasure = "max-w-[38rem]";

/** Page h1. 32px on mobile (a deliberate size, not a shrunk 55px) up to 55px
 *  on desktop — both measured off the reference. */
export const heading1 =
  "text-[2rem] font-black leading-[1.3] tracking-[-0.02em] text-fg sm:text-[3.4375rem]";

/** Section h2 — "Experience", "Projects", "Tech stack". Flat at 24px across
 *  every breakpoint: holding the size is what stops the mobile layout
 *  reading as a squashed desktop. */
export const heading2 =
  "text-2xl font-bold leading-[1.3] tracking-[-0.02em] text-fg";

/** One card surface for the whole site — experience tiles, live-stat cards and
 *  the contact links. The reference has no cards, no shadows, no rounded
 *  surfaces: the divider *is* the boundary. */
export const cardSurface = "border-t border-border pt-6 transition-colors";
