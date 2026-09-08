import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** The class merger every 21st.dev / Aceternity component imports from
 *  "@/lib/utils". twMerge lets a caller's className override the component's
 *  own defaults instead of both landing in the class list. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Every page and section heading. A connected script — legible at display
 *  size and not below it, so the size is part of the class, not a caller's
 *  choice. Card titles (h3/h4) stay on the sans stack. */
export const displayHeading =
  "font-script text-5xl leading-[1.1] text-fg sm:text-6xl";

/** One card surface for the whole site — experience tiles, live-stat cards and
 *  the contact links. Kept here so a change to the card look is one edit, not
 *  four copies of the same class string drifting apart.
 *
 *  The shadow is the same glass recipe as the nav pill (site-nav.tsx): an
 *  inset top highlight plus a soft outer drop, both driven by the
 *  --glass-highlight/--glass-drop tokens so day/night each get their own
 *  values. Without it a card is just a flat rectangle a shade lighter than
 *  the page — technically a boundary, not a surface with any lift to it. */
export const cardSurface =
  "rounded-2xl border border-border bg-surface/60 shadow-[inset_0_1px_0_0_var(--glass-highlight),0_16px_40px_-12px_var(--glass-drop)] backdrop-blur-sm transition-colors duration-200 hover:border-accent-2/50";

/** Every section heading — "Experience", "Projects", "Tech stack". Real
 *  heading weight (not a tiny tracked-caps label standing in for one): the
 *  hero h1 is the only thing bigger, so this is the next rung down a type
 *  scale that used to jump straight from a 4xl/6xl h1 to 12px uppercase text
 *  with nothing between. The script face stays reserved for pure display
 *  moments (the footer signature) rather than every heading — eight sections
 *  in Great Vibes would be a novelty, not a hierarchy. */
export const sectionLabel =
  "text-2xl font-semibold tracking-tight text-fg sm:text-3xl";
