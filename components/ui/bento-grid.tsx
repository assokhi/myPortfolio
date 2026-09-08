import type { ReactNode } from "react";
import { cn, cardSurface } from "@/lib/utils";

/** Bento grid in the Aceternity mould (ui.aceternity.com/components/bento-grid)
 *  — a uniform grid whose tiles opt into a wider column span — but tiled on
 *  THIS repo's six-column rhythm from lib/bento.ts rather than the registry's
 *  three, so Projects lines up with the rest of the site and inherits the
 *  guarantee that `npm run check:bento` already enforces: every row fills, so
 *  the grid never shows a hole.
 *
 *  Tailwind cannot see a class name built by string interpolation, so the spans
 *  bentoSpans() returns are mapped to literal classes here. This is the class
 *  map its doc comment points at. */
const COL_SPAN: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
};

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-6", className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  span = 6,
  className,
  children,
}: {
  /** Out of six. Comes from bentoSpans(); anything else falls back to a full row. */
  span?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article
      className={cn(
        cardSurface,
        COL_SPAN[span] ?? COL_SPAN[6],
        // `relative` is load-bearing: the title carries a stretched-link
        // pseudo-element so the whole tile is one click target, rather than the
        // cover and the title being two adjacent links to the same URL.
        "group/bento relative flex h-full flex-col overflow-hidden p-0",
        "transition-[transform,border-color] duration-200 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </article>
  );
}
