"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

/* Word-by-word fade-in entrance.
 *
 * The text is split on spaces and each word gets its own motion.span, so the
 * words arrive as a wave rather than the block fading as one. Real space text
 * nodes sit BETWEEN the spans (not inside them): a space inside an inline-block
 * is collapsed away, and pinning it with `whitespace-pre` would stop the line
 * wrapping. Keeping the spaces outside also means the accessible name and any
 * ATS scrape read as one ordinary sentence.
 *
 * `as` exists so the animation never costs the page its semantics — a heading
 * stays an <h1>, a paragraph stays a <p>.
 */

type Props = {
  text: string;
  /** Element that wraps the words. Keep it semantic: "h1", "h2", "p". */
  as?: React.ElementType;
  className?: string;
  /** Seconds before the first word starts. Chain elements by increasing it. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
  /** Animate once instead of replaying each time it re-enters the viewport. */
  once?: boolean;
  id?: string;
};

export default function FadeInText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.02,
  once = false,
  id,
}: Props) {
  // Client-only, so it must not change what is RENDERED — only how long the
  // transition takes. Reduced motion snaps every word straight to its end
  // state; a fade-in that never runs would leave the text invisible.
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag id={id} className={className}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <motion.span
            data-fade-in
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.45, delay: delay + i * stagger, ease: "easeOut" }
            }
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}
