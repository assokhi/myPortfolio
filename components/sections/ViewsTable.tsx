"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Row = { slug: string; title: string };

/** The counts half of /views.
 *
 *  The post list is server-rendered and passed in; only the numbers are
 *  fetched. So a backend that is missing, rate-limited or not yet deployed
 *  costs you the counts, not the page — every post is still listed and still
 *  linked. */
export default function ViewsTable({ posts }: { posts: Row[] }) {
  const [views, setViews] = useState<Record<string, number> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/blog-views")
      .then((res) => res.json() as Promise<{ ok: boolean; data?: Record<string, number> }>)
      .then((result) => {
        if (result.ok && result.data) setViews(result.data);
        else setFailed(true);
      })
      .catch(() => setFailed(true));
  }, []);

  // Unknown counts sort as -1 so they sit below zero-view posts rather than
  // above them — an unmeasured post is not a popular one.
  const ranked = [...posts].sort(
    (a, b) => (views?.[b.slug] ?? -1) - (views?.[a.slug] ?? -1),
  );

  return (
    <>
      {failed ? (
        <p className="mt-6 text-sm text-muted">
          Counts are unavailable right now. The list below is every post.
        </p>
      ) : null}

      <ol className="mt-8 divide-y divide-border">
        {ranked.map((post) => (
          <li key={post.slug} className="flex items-center gap-4 py-3">
            <Link
              href={`/blog/${post.slug}`}
              className="min-w-0 flex-1 truncate text-fg hover:text-accent-2"
            >
              {post.title}
            </Link>
            <span className="shrink-0 text-sm tabular-nums text-muted">
              {views?.[post.slug] === undefined
                ? "—"
                : `${views[post.slug].toLocaleString()} views`}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
