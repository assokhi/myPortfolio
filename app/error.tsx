"use client";

import Link from "next/link";
import { displayHeading } from "@/lib/utils";

// Never a stack trace in front of a recruiter.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24">
      <h1 className={displayHeading}>
        Something went wrong
      </h1>
      <p className="mt-2 text-muted">
        This one is on me, not on you. Try again, or head back to the home page.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-fg"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
