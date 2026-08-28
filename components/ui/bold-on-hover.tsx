"use client";

import { useCallback, useRef, useState } from "react";
import { useAnimate, stagger, useReducedMotion } from "motion/react";

/* 21st.dev "Bold on hover" by @gurvinder-singh02, rebuilt from the published
 * preview bundle (the source itself is behind a 21st.dev login).
 *
 * Each character animates its font-variation-settings independently, on a
 * stagger, so the weight sweeps across the word rather than snapping.
 *
 * Two changes for this repo:
 * 1. The original also animates `'slnt' -10`. Geist has no slant axis —
 *    measured: 'slnt' 0 and 'slnt' -10 both render at 303.09px — so that half
 *    was doing nothing. Dropped rather than left in as decoration.
 * 2. prefers-reduced-motion short-circuits the animation. The hook resolves
 *    client-side only, so it must not change what RENDERS — the characters are
 *    always split the same way, only the animate() call is skipped.
 */

type Props = {
  text: string;
  /** Weight at rest. Match the element's own font-weight or it jumps on load. */
  from?: number;
  /** Weight on hover. Geist tops out at 900. */
  to?: number;
  staggerTiming?: number;
  staggerOrigin?: "first" | "last" | "center";
  className?: string;
};

export default function BoldOnHover({
  text,
  from = 600,
  to = 800,
  staggerTiming = 0.03,
  staggerOrigin = "first",
  className,
}: Props) {
  const [scope, animate] = useAnimate();
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = useCallback(
    (weight: number) => {
      if (reduce) return;
      animate(
        ".char",
        { fontVariationSettings: `'wght' ${weight}` },
        {
          type: "spring",
          duration: 0.7,
          delay: stagger(staggerTiming, { from: staggerOrigin }),
        },
      );
    },
    [animate, reduce, staggerTiming, staggerOrigin],
  );

  // Debounced, so sweeping the cursor across a list doesn't fire a storm of
  // overlapping animations.
  const schedule = useCallback(
    (fn: () => void) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(fn, 100);
    },
    [],
  );

  return (
    <span
      ref={scope}
      className={className}
      onMouseEnter={() =>
        schedule(() => {
          if (hovered) return;
          setHovered(true);
          run(to);
        })
      }
      onMouseLeave={() =>
        schedule(() => {
          setHovered(false);
          run(from);
        })
      }
    >
      {/* The word once, for assistive tech; the characters are decoration. */}
      <span className="sr-only">{text}</span>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="char inline-block whitespace-pre"
          style={{ fontVariationSettings: `'wght' ${from}` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
