import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Route group: shared layout for the five detail pages, and "(sections)"
 *  never appears in a URL. */
export default function SectionLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Link>
      <div className="mt-8">{children}</div>
    </div>
  );
}
