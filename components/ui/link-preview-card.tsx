"use client";

import { cn, cardSurface } from "@/lib/utils";

export type LinkMeta = {
  title: string;
  /** One line. This is a pitch, not a paragraph. */
  pitch: string;
  /** Path under public/, or an absolute URL. Optional — without it the card is
   *  just text, which is still useful. */
  image?: string;
  /** Shown at the bottom of the card, e.g. "Visit site". */
  cta?: string;
};

/** Wraps an inline link so hovering or focusing it unfurls a small preview,
 *  the way a Notion or Slack link unfurl does.
 *
 *  Deliberately CSS-only: `group-hover` and `group-focus-within` do the work,
 *  which means no positioning maths, no portal, no state, and no JavaScript
 *  cost on a page whose LCP budget is the thing being protected. The trade is
 *  that the card cannot escape a clipping ancestor — fine in body copy, which
 *  is the only place this is used.
 *
 *  The card is `aria-hidden`: everything in it is decoration around a link
 *  whose own text already says where it goes. A screen reader announcing the
 *  pitch twice would be noise, not help. */
export default function LinkPreviewCard({
  href,
  meta,
  children,
  className,
}: {
  href: string;
  meta: LinkMeta;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");

  return (
    <span className="group relative inline-block">
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
        className={cn(
          "font-semibold text-fg underline decoration-accent-2 decoration-2 underline-offset-4 transition-colors hover:text-accent-2",
          className,
        )}
      >
        {children}
      </a>

      <span
        aria-hidden="true"
        className={cn(
          // pointer-events-none so the card can never sit between the cursor
          // and the link that summoned it.
          "pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-64 -translate-x-1/2",
          "invisible opacity-0 transition-[opacity,visibility,transform] duration-200",
          "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
          "motion-safe:translate-y-1 motion-safe:group-hover:translate-y-0 motion-safe:group-focus-within:translate-y-0",
          cardSurface,
          "block bg-surface p-3 shadow-[0_16px_40px_-12px_var(--glass-drop)]",
        )}
      >
        {meta.image ? (
          // Images are unoptimized on Workers; next/image buys nothing and
          // costs a client component inside one that is already client-side.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={meta.image}
            alt=""
            width={240}
            height={120}
            loading="lazy"
            className="mb-2 h-24 w-full rounded-lg object-cover"
          />
        ) : null}
        <span className="block text-sm font-semibold text-fg">
          {meta.title}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted">
          {meta.pitch}
        </span>
        {meta.cta ? (
          <span className="mt-2 block text-xs font-medium text-accent-2">
            {meta.cta} &rarr;
          </span>
        ) : null}
      </span>
    </span>
  );
}
