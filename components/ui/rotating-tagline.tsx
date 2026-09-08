"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 3200;

/** Cycles short phrases under the hero name.
 *
 *  Under reduced motion it stops cycling entirely rather than cycling without
 *  a transition. WCAG 2.2.2 is about auto-updating content, not just movement:
 *  text that swaps itself every three seconds is a problem for anyone who
 *  reads slowly, and "reduce motion" is the closest signal a browser gives us
 *  that this visitor means it. The first phrase is the one that stays, so
 *  write it as the one that must be read. */
export default function RotatingTagline({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || phrases.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [reduce, phrases.length]);

  return (
    // The live region is off: this is decorative repetition of what the page
    // already says, and announcing a new phrase every three seconds would talk
    // over whatever the visitor is actually reading.
    <span aria-live="off" className={cn("relative block", className)}>
      {/* An invisible copy of the longest phrase reserves the line's width and
          height, so the box never resizes as phrases swap. Without it every
          rotation is a layout shift, and CLS is a budget item here. */}
      <span aria-hidden="true" className="invisible block">
        {phrases.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>

      <span
        // The key change is what restarts the animation: React replaces the
        // node, so the entrance runs again on every phrase.
        key={index}
        className="absolute inset-0 block motion-safe:animate-[tagline-in_320ms_ease-out]"
      >
        {phrases[index]}
      </span>
    </span>
  );
}
