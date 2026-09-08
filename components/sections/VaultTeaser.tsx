import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

/** The one link to /vault. That page is not in the nav on purpose — it is the
 *  reward for reading to the bottom, not a claim on a recruiter's first
 *  thirty seconds. */
export default function VaultTeaser() {
  return (
    <section className="reveal mx-auto w-full max-w-4xl px-5 py-14">
      <Link
        href="/vault"
        className="group flex items-center gap-4 rounded-2xl border border-dashed border-border p-5 transition-colors hover:border-accent-2"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ink/5">
          <BookOpen size={18} aria-hidden="true" className="text-accent-2" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-fg">
            Books, Shows, Movies &amp; More!
          </span>
          <span className="block text-sm text-muted">
            The non-work half — what I read and watch when I am not shipping.
          </span>
        </span>

        <ChevronRight
          size={20}
          aria-hidden="true"
          className="shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </section>
  );
}
