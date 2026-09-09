"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type RouteToastProps = {
  /** Route key for the dismissal record. sessionStorage, not localStorage: a
   *  dismissed toast stays gone while the visitor is still browsing, and comes
   *  back on a fresh visit. */
  storageKey: string;
  /** Small line above the title, e.g. "New blog post". */
  badge: string;
  title: string;
  description: string;
  href: string;
  /** Link text, e.g. "Read article". */
  cta: string;
  /** How long to wait before showing. Long enough that it never competes with
   *  the page's own first paint. */
  delayMs?: number;
};

/** A flat notice, not a card: bottom-anchored, one soft shadow, no backdrop
 *  blur and no hover-expanding cover image — the reference has no cards at
 *  all, and a toast is the one floating element the site still needs. */
export default function RouteToast({
  storageKey,
  badge,
  title,
  description,
  href,
  cta,
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
        "fixed inset-x-4 bottom-4 z-50 rounded-xl border border-border bg-surface p-4 shadow-lg",
        "sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-full sm:max-w-sm",
        "motion-safe:animate-[toast-in_220ms_ease-out]",
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute top-1 right-1 flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg hover:text-fg"
      >
        <X size={18} aria-hidden="true" />
      </button>

      <p className="pr-8 text-sm font-medium tracking-wide text-muted">{badge}</p>
      <p className="mt-1 pr-5 text-sm font-medium text-fg">{title}</p>
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
