"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const nf = new Intl.NumberFormat("en-GB");

/** Counts from 0 to `value` the first time the number scrolls into view.
 *
 *  The server already rendered the final figure inside this span, so the number
 *  is in the HTML for a crawler, an ATS scraper and anyone without JavaScript —
 *  the animation only replaces it once React takes over. Under
 *  prefers-reduced-motion nothing moves: the final value renders and stays. */
export default function CountUp({
  value,
  duration = 1.1,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    // No setShown(0) here: motion writes the first frame itself, and seeding
    // the state from inside the effect is an extra render for one frame.
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {nf.format(shown)}
    </span>
  );
}
