"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

/** Set once this browser has counted itself, so refreshes and repeat visits
 *  read the total instead of incrementing it again — an approximation of
 *  unique visitors with no cookies, IPs, or tracking involved. */
const VISITED_KEY = "portfolio-visitor-counted";

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
      .then((res) => res.json())
      .then((result: { ok: boolean; data?: { count: number } }) => {
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

  // No Upstash env vars configured yet, or the request failed: show nothing
  // rather than a broken counter.
  if (count === null) return null;

  return (
    <p className="mt-8 flex items-center gap-2 text-sm text-muted">
      <Users className="size-4 text-accent" aria-hidden="true" />
      {count.toLocaleString()} visitors
    </p>
  );
}
