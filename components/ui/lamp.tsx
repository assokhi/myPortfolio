"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* Aceternity "Lamp", pasted in and then edited in place. Four changes from the
 * published source, each one required here:
 *
 * 1. Imports from "motion/react", not "framer-motion". They are the same
 *    library — `motion` is the successor package and is already installed.
 *    Adding framer-motion would ship both copies (CLAUDE.md: one motion system).
 * 2. `bg-gradient-conic` does not exist in Tailwind v4 (it was a v3 config
 *    addition), and v4 composes `--tw-gradient-stops` differently. The beams
 *    now carry their whole conic-gradient inline, so they cannot silently
 *    render as flat boxes — the documented failure mode for pasted Aceternity.
 * 3. prefers-reduced-motion: every animated element renders at its FINAL state
 *    when motion is reduced, so nothing is left invisible or half-width.
 * 4. slate-950/cyan swapped for the site's own tokens, so the section reads as
 *    part of the page rather than a component someone dropped in.
 *
 * Height and the beam-to-content gap are both tunable from the caller:
 *   <LampContainer className="min-h-[34rem] [--lamp-offset:9rem]">
 */

/** Colour of the beam and the glows. --color-accent-2 (violet), not
 *  --color-accent (white) — the heading sitting under the beam is set in
 *  --color-accent, and a white beam behind white text washes the text out
 *  instead of lighting it. Any Tailwind/CSS colour works here. */
const LAMP_COLOR = "var(--color-accent-2)";

/** Zero-duration when the visitor asks for reduced motion: every element still
 *  reaches its end state, it just gets there instantly. Nothing is left
 *  invisible or half-width, which is the failure a naive `animation: none`
 *  would cause here. */
function useLampTransition() {
  const reduce = useReducedMotion();
  return reduce
    ? { duration: 0 }
    : { delay: 0.3, duration: 0.8, ease: "easeInOut" as const };
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // useReducedMotion resolves on the client only, so it must never change what
  // is RENDERED — that would be a hydration mismatch. It only changes how long
  // the transition takes: reduced motion snaps straight to the end state.
  const transition = useLampTransition();

  const grow = (from: string, to: string) => ({
    initial: { opacity: 0.5, width: from },
    whileInView: { opacity: 1, width: to },
    transition,
  });

  return (
    <div
      className={cn(
        "relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-bg [--lamp-offset:20rem]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center"
      >
        <motion.div
          {...grow("15rem", "30rem")}
          style={{
            backgroundImage:
              `conic-gradient(var(--conic-position), ${LAMP_COLOR} 0%, transparent 50%, transparent 100%)`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-bg [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-bg [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          {...grow("15rem", "30rem")}
          style={{
            backgroundImage:
              `conic-gradient(var(--conic-position), transparent 0%, transparent 50%, ${LAMP_COLOR} 100%)`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-bg [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-bg [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-bg blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        {/* z-30, not z-50: this ambient blob sits taller than the visible bar (its
            box runs from the bar down to the beam base) and its blur bleeds
            past its own top edge. At z-50 it painted in front of the ceiling
            mask below, which is the one thing meant to keep glow from rising
            above the bar — the fix is putting it back underneath that mask. */}
        <div className="absolute inset-auto z-30 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-accent opacity-50 blur-3xl" />

        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={transition}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-accent blur-2xl"
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={transition}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-accent"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-bg" />
      </div>

      <div className="relative z-50 flex -translate-y-[var(--lamp-offset)] flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

/** Reference usage. Not rendered anywhere — see components/sections/Contact.tsx
 *  for how the container is actually used. */
export function LampDemo() {
  const transition = useLampTransition();
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={transition}
        className="mt-8 bg-gradient-to-br from-fg to-muted bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}
