import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** The "there is more of this on its own page" button. One component so the
 *  home page's sections all end the same way.
 *
 *  `group` drives the chevron; the pill itself flips to the site's foreground
 *  on hover so the whole shape reads as the target, not just the words. The
 *  global prefers-reduced-motion rule zeroes these durations, which leaves the
 *  colour change and no movement. */
export default function ShowMore({
  href,
  label = "Show more",
  className,
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-6 py-3 text-sm font-semibold text-fg shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:border-fg hover:bg-fg hover:text-bg hover:shadow-xl active:translate-y-0 active:scale-[0.98]",
        className,
      )}
    >
      {label}
      <ChevronRight
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
