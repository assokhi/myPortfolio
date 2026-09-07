"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Aceternity's "Tracing Beam": a hairline SVG path down the left of a block
 *  with a gradient beam that fills as the block scrolls past. Pasted from
 *  ui.aceternity.com/registry/tracing-beam.json and owned here.
 *
 *  Changes from the published version, all four from the paste recipe in
 *  .claude/skills/design-sources:
 *
 *  - `useVelocity` was imported and never used. Dropped.
 *  - The published dot animates its colour off `scrollYProgress.get()` read
 *    during render, which is 0 on the server and whatever scroll happens to be
 *    on the client — a hydration mismatch by construction. The dot is static
 *    here; it was a flourish, not the effect.
 *  - Hardcoded #18CCFC/#6344F5/#AE48FF swapped for the site's accent tokens so
 *    the beam belongs to this palette rather than Aceternity's.
 *  - `border-netural-200` (their typo, so a no-op class) removed.
 *
 *  `motion-reduce:hidden` on the beam path is the reduced-motion fallback: the
 *  static rail stays, the moving gradient does not. */
export function TracingBeam({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight);
  }, []);

  const spring = { stiffness: 500, damping: 90 } as const;
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    spring,
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    spring,
  );

  // The path kinks out and back so the beam reads as drawn rather than as a
  // plain border. Both paths share it: one static hairline, one gradient.
  const d = `M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`;

  return (
    <motion.div ref={ref} className={cn("relative w-full", className)}>
      <div className="absolute top-3 -left-4 md:-left-12">
        <div className="ml-[27px] flex size-4 items-center justify-center rounded-full border border-ink/20 shadow-sm">
          <div className="size-2 rounded-full bg-accent-2" />
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <path d={d} fill="none" stroke="var(--color-border)" />
          <path
            d={d}
            fill="none"
            stroke="url(#tracing-beam-gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id="tracing-beam-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="var(--color-accent-2)" stopOpacity="0" />
              <stop stopColor="var(--color-accent-2)" />
              <stop offset="0.325" stopColor="var(--color-beam)" />
              <stop offset="1" stopColor="var(--color-accent-2)" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
