"use client";

import { useState } from "react";
import type { PostMeta } from "@/content/types";
import { PostList } from "@/components/sections/Blog";

const ALL = "All";

/** Tag chips with live counts, filtering the list below them.
 *
 *  Client-side and URL-less on purpose: the whole post list is already in the
 *  HTML the server sent, so filtering is a `filter()` over an array that is
 *  present — no request, no route change, nothing to wait for. The cost is
 *  that a filtered view has no shareable URL, which for a blog with a handful
 *  of tags is not worth a router round trip.
 *
 *  ponytail: move to a `?tag=` search param if the list ever grows past a
 *  screenful, where deep-linking a tag starts to matter. */
export default function BlogFilter({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState(ALL);

  // Counted from the posts themselves rather than authored anywhere, so a chip
  // can never claim a count the list does not have.
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const chips = [
    { label: ALL, count: posts.length },
    ...[...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([label, count]) => ({ label, count })),
  ];

  const shown =
    active === ALL ? posts : posts.filter((p) => p.tags.includes(active));

  return (
    <>
      {/* A group of toggles, not links: aria-pressed is what tells a screen
          reader which filter is on. role="group" gives the set a name so it is
          announced as one control rather than six loose buttons. */}
      <div role="group" aria-label="Filter posts by tag" className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const isActive = chip.label === active;
          return (
            <button
              key={chip.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(chip.label)}
              className={
                isActive
                  ? "rounded-full bg-accent px-3 py-1 font-mono text-xs text-bg"
                  : "rounded-full border border-border px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent-2 hover:text-fg"
              }
            >
              {chip.label}{" "}
              <span className={isActive ? "opacity-70" : "opacity-60"}>
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {shown.length ? (
          <PostList posts={shown} />
        ) : (
          <p className="text-muted">Nothing tagged {active} yet.</p>
        )}
      </div>
    </>
  );
}
