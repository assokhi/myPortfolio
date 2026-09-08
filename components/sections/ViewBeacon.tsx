"use client";

import { useEffect } from "react";

/** Records one read of a post. Renders nothing.
 *
 *  Fire-and-forget: no state, no error path, no UI. If the endpoint is down the
 *  visitor never finds out, which is correct — a view counter must never be
 *  able to affect the page it is counting.
 *
 *  Deduplication is the Worker's job, not this component's: it keys on a hash
 *  of IP, slug and date with a 24-hour TTL, so a refresh does not inflate the
 *  number and no identifier is stored against a person. Doing it here in
 *  localStorage instead would be trivially defeated by a hard reload. */
export default function ViewBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    // A relative URL, so this is same-origin by construction.
    fetch(`/api/blog-views/${encodeURIComponent(slug)}`, {
      method: "POST",
      // The request should not hold up anything, and its answer is not needed.
      keepalive: true,
    }).catch(() => {});
  }, [slug]);

  return null;
}
