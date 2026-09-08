import { cn } from "@/lib/utils";

/** Decorative line-art beside the hero copy — fills the dead space to the
 *  right of the intro on wide screens without competing with it for
 *  attention. Inline SVG for the same reasons as the old mascot (see
 *  `.mascot-*` in globals.css): sharp at any size, inherits the palette
 *  through `var(--color-*)`, and stops cleanly under reduced motion instead
 *  of looping regardless like a GIF would.
 *
 *  Decorative only, so aria-hidden — a screen reader gains nothing from
 *  "branching line sways". */
export default function HeroDoodle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      aria-hidden="true"
      focusable="false"
      // The width is load-bearing, not decoration: an SVG with no intrinsic
      // size stretches to its containing block, and this one was resolving to
      // 896x1493 and landing off-screen once the caller's -translate-x-[140%]
      // was measured against that width. 132px puts it in the gutter beside
      // the hero, which is where the comment above always said it went.
      className={cn("hero-doodle hidden w-[132px] 2xl:block", className)}
    >
      <g className="hero-doodle-sway">
        <path
          d="M60 190 C58 140 62 120 54 90 C48 66 34 54 26 34"
          fill="none"
          stroke="var(--color-muted)"
          strokeOpacity="0.4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M56 120 C70 108 82 104 96 92"
          fill="none"
          stroke="var(--color-muted)"
          strokeOpacity="0.4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M52 76 C40 68 32 62 22 50"
          fill="none"
          stroke="var(--color-muted)"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle className="hero-doodle-bud" cx="26" cy="34" r="5" fill="var(--color-accent-2)" />
        <circle className="hero-doodle-bud" cx="96" cy="92" r="4" fill="var(--color-accent-2)" />
        <circle className="hero-doodle-bud" cx="22" cy="50" r="3" fill="var(--color-accent-2)" />
      </g>
    </svg>
  );
}
