import { cn } from "@/lib/utils";

/* Idle mascot for the gap at the bottom of the About column.
 *
 * Inline SVG rather than a GIF: it is ~1KB against a GIF's hundreds, it stays
 * sharp on every display, it inherits the site palette, and — the part a GIF
 * cannot do — it stops when the visitor asks for reduced motion. A GIF loops
 * forever regardless, which is the exact thing motion sensitivity struggles
 * with. Keyframes live in globals.css next to the scroll cue.
 *
 * Decorative, so aria-hidden: a screen reader gains nothing from "purple blob
 * blinks". Nothing here is anyone else's character — see the note in the
 * commit if you are tempted to swap in a copyrighted one.
 */
export default function Mascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 100"
      aria-hidden="true"
      focusable="false"
      className={cn("mascot size-28 shrink-0", className)}
    >
      {/* Ground shadow. Shrinks as the body rises, which is what sells the hop
          more than the movement itself does. */}
      <ellipse
        className="mascot-shadow"
        cx="48"
        cy="93"
        rx="20"
        ry="3.5"
        fill="var(--color-border)"
      />

      <g className="mascot-bob">
        {/* Antenna, drawn before the body so the stalk tucks behind it. */}
        <path
          d="M48 30 C48 20 52 16 56 12"
          fill="none"
          stroke="var(--color-accent-2)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          className="mascot-spark"
          cx="57"
          cy="11"
          r="4.5"
          fill="var(--color-accent)"
        />

        <rect
          x="18"
          y="28"
          width="60"
          height="58"
          rx="27"
          fill="var(--color-accent-2)"
        />

        {/* Eyes and mouth are the background colour, so the face is a hole in
            the body rather than a second colour to keep in sync. */}
        <g className="mascot-blink" fill="var(--color-bg)">
          <circle cx="37" cy="53" r="4.5" />
          <circle cx="59" cy="53" r="4.5" />
        </g>
        <path
          d="M42 65 Q48 70 54 65"
          fill="none"
          stroke="var(--color-bg)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Feet. Two rounded stubs are the whole trick — without them the body
            reads as a floating pill. */}
        <rect x="30" y="82" width="14" height="7" rx="3.5" fill="var(--color-accent-2)" />
        <rect x="52" y="82" width="14" height="7" rx="3.5" fill="var(--color-accent-2)" />
      </g>
    </svg>
  );
}
