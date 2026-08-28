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
 *  four copies of the same class string drifting apart. */
export const cardSurface =
  "rounded-2xl border border-border bg-surface/60 backdrop-blur-sm transition-colors duration-200 hover:border-accent-2/50";
