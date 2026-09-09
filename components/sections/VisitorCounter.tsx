"use client";

import { useEffect, useState } from "react";

/** Set once this browser has counted itself, so refreshes and repeat visits
 *  read the total instead of incrementing it again — an approximation of
 *  unique visitors with no cookies, IPs, or tracking involved. */
const VISITED_KEY = "portfolio-visitor-counted";

/** 1st, 2nd, 3rd, 4th — and the 11/12/13 exceptions that a naive rule gets
 *  wrong. Worth the four lines: "1,011st Visitor" is the kind of detail a
 *  visitor notices only when it is broken. */
function ordinal(n: number) {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n.toLocaleString()}th`;
  const suffix = { 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th";
  return `${n.toLocaleString()}${suffix}`;
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alreadyCounted = false;
    try {
      alreadyCounted = localStorage.getItem(VISITED_KEY) === "1";
    } catch {
      // Storage blocked (private mode, locked-down browser) — just don't
      // increment on every load; still show the count itself if it loads.
      alreadyCounted = true;
    }

    fetch("/api/visitors", { method: alreadyCounted ? "GET" : "POST" })
      .then((res) => res.json() as Promise<{ ok: boolean; data?: { count: number } }>)
      .then((result) => {
        if (!result.ok || !result.data) return;
        setCount(result.data.count);
        if (!alreadyCounted) {
          try {
            localStorage.setItem(VISITED_KEY, "1");
          } catch {
            // Nothing to do — worst case this browser gets counted twice.
          }
        }
      })
      .catch(() => {});
  }, []);

  // Counter storage not configured, or the request failed: render nothing
  // rather than a badge reading "0" or "—". This is why the badge is missing
  // from the live site today.
  if (count === null) return null;

  return (
    <p className="flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted">
      <span className="relative flex size-2">
        {/* Two stacked dots: a solid core and a ping ring behind it. The ring
            is motion-safe only — a permanent pulse is exactly the kind of
            idle animation reduced-motion exists to stop. */}
        <span className="absolute inline-flex size-full rounded-full bg-mint-ink opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-mint-ink" />
      </span>
      <span>
        You are the <span className="font-medium text-fg">{ordinal(count)}</span>{" "}
        visitor
      </span>
    </p>
  );
}
