"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn, cardSurface } from "@/lib/utils";

export type RouteToastProps = {
  /** Route key for the dismissal record. sessionStorage, not localStorage: a
   *  dismissed toast stays gone while the visitor is still browsing, and comes
   *  back on a fresh visit. */
  storageKey: string;
  /** Small all-caps line above the title, e.g. "NEW BLOG POST". */
  badge: string;
  title: string;
  description: string;
  href: string;
  /** Link text, e.g. "Read article". */
  cta: string;
  /** Optional image revealed when the card is expanded on hover or focus. */
  cover?: string;
  /** How long to wait before showing. Long enough that it never competes with
   *  the page's own first paint. */
  delayMs?: number;
};

export default function RouteToast({
  storageKey,
  badge,
  title,
  description,
  href,
  cta,
  cover,
  delayMs = 2500,
}: RouteToastProps) {
  // Three states rather than two: "not yet decided" is what renders on the
  // server and on the first client paint, so nothing can flash in before the
  // dismissal record has been read.
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const key = `toast_dismissed_${storageKey}`;

  useEffect(() => {
    let already = false;
    // Private browsing and storage-blocked contexts throw on read. A toast is
    // not worth an uncaught error, so failure means "show it".
    try {
      already = sessionStorage.getItem(key) === "1";
    } catch {}
    if (already) return;

    const timer = setTimeout(() => setShown(true), delayMs);
    return () => clearTimeout(timer);
  }, [key, delayMs]);

  if (!shown || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(key, "1");
    } catch {}
  };

  return (
    <div
      // aria-live, not role="dialog": this appears unprompted and must never
      // steal focus from whatever the visitor is reading or typing in.
      role="status"
      aria-live="polite"
      className={cn(
        "group fixed right-4 bottom-4 z-50 w-[min(22rem,calc(100vw-2rem))]",
        cardSurface,
        // bg-surface/60 from cardSurface is see-through; over page content a
        // toast needs its own opaque ground or the text behind it shows.
        // An unprompted card floating over the page needs to read as its own
        // object at rest, not just on hover — cardSurface's default
        // border-border is too close to bg-surface to do that alone.
        "border-accent-2/40 bg-surface p-4 shadow-[0_16px_40px_-12px_var(--glass-drop)]",
        "motion-safe:animate-[toast-in_220ms_ease-out]",
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss this notification"
        className="absolute top-2 right-2 rounded-full p-1 text-muted transition-colors hover:bg-bg hover:text-fg"
      >
        <X size={16} aria-hidden="true" />
      </button>

      <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-widest text-muted uppercase">
        <span
          aria-hidden="true"
          className="inline-block size-2 rounded-full bg-mint-ink motion-safe:animate-pulse"
        />
        {badge}
      </p>

      {/* Revealed on hover or keyboard focus anywhere in the card. grid-rows
          0fr -> 1fr animates a height the browser can actually interpolate,
          which `height: auto` is not. */}
      {cover ? (
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            {/* Images are unoptimized on Workers anyway (see next.config.ts),
                so next/image would add a client component for no gain. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt=""
              width={320}
              height={160}
              loading="lazy"
              className="mt-3 h-32 w-full rounded-lg object-cover"
            />
          </div>
        </div>
      ) : null}

      <p className="mt-2 pr-5 font-semibold text-fg">{title}</p>
      <p className="mt-1 text-sm text-muted">{description}</p>

      <Link
        href={href}
        className="mt-3 inline-block text-sm font-medium text-accent-2 underline underline-offset-4 hover:text-fg"
      >
        {cta} &rarr;
      </Link>
    </div>
  );
}
