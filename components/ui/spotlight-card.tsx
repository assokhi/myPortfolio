"use client";

import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Aceternity's "Card Spotlight": a radial highlight that follows the
 *  pointer. Plain CSS driven by mousemove — no extra animation library, and
 *  the reveal's fade already inherits the site's global
 *  prefers-reduced-motion rule (every transition-duration in app/globals.css
 *  zeroes under it, so a motion-sensitive visitor still sees the highlight,
 *  it just stops tracking the cursor smoothly).
 *
 *  Renders as the interactive element itself (an <a>), not a wrapper around
 *  one — one focusable target, one thing for a screen reader to announce.
 *  Named group (`group/spot`) matches the convention already in
 *  components/ui/tech-icon.tsx, so nested hover effects elsewhere on the page
 *  can't cross-trigger this one. */
export default function SpotlightCard({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  function onMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group/spot relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/5 p-5 transition-colors duration-200 hover:border-white/20",
        className,
      )}
    >
      {/* pointer-events-none: it must never intercept the mousemove it's
          painted from. Invisible until hovered, so a static screenshot of the
          section shows the plain card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--color-accent-2) 35%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative flex items-center gap-4">{children}</div>
    </a>
  );
}
