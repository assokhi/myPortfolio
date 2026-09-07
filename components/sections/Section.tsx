import Link from "next/link";
import type { ReactNode } from "react";
import { cn, displayHeading } from "@/lib/utils";

/** Shared wrapper for every home-page section: anchor id, heading, optional
 *  "see all" link to the section's own page. */
export default function Section({
  id,
  title,
  intro,
  href,
  hrefLabel = "See more",
  action,
  titleClassName,
  introClassName,
  headerClassName,
  className,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  href?: string;
  hrefLabel?: string;
  /** Replaces the default text link in the header slot. About uses it for the
   *  gradient button; every other section keeps the plain link. */
  action?: ReactNode;
  /** Overrides for one section's title/intro font — every other section keeps
   *  the shared script/serif look. */
  titleClassName?: string;
  introClassName?: string;
  /** Overrides the header's bottom margin (default `mb-8`). Skills uses a
   *  tighter gap to keep the whole section on one screen. */
  headerClassName?: string;
  /** Overrides the outer section's vertical padding (default `py-16
   *  lg:py-20`). Skills uses a tighter pad to keep the whole section on one
   *  screen. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("reveal mx-auto max-w-7xl px-4 md:px-12 lg:px-24", className ?? "py-16 lg:py-20")}
    >
      <div className={cn("flex flex-wrap items-end justify-between gap-4", headerClassName ?? "mb-8")}>
        <div>
          <h2 id={`${id}-heading`} className={cn(displayHeading, titleClassName)}>
            {title}
          </h2>
          {intro ? (
            <p className={cn("mt-2 max-w-2xl font-serif text-muted", introClassName)}>
              {intro}
            </p>
          ) : null}
        </div>
        {action ?? (href ? (
          <Link
            href={href}
            className="shrink-0 rounded-md text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {hrefLabel} <span aria-hidden="true">→</span>
          </Link>
        ) : null)}
      </div>
      {children}
    </section>
  );
}
