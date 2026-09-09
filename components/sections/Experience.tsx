import { ExternalLink } from "lucide-react";
import { experience } from "@/content/experience";
import { formatRange } from "@/lib/dates";
import { cn, cardSurface, heading2, pageShell } from "@/lib/utils";
import { TechPill } from "@/components/ui/tech-icon";
import CardLogo from "@/components/ui/card-logo";

/** The work history, as a vertical timeline of flat rows.
 *
 *  Nothing collapses. The highlights ARE the reason a recruiter opened this
 *  page, and a chevron is a click they will not spend — so they are in the
 *  initial HTML, where an ATS scraper reads them too. Dropping the accordion
 *  also took this whole subtree off the client: there is no `"use client"`
 *  anywhere under it now.
 *
 *  `limit` is what makes this one component serve both the home page (two rows,
 *  then a link to the full list) and /work (everything). A second component
 *  that differed only in `.slice()` would be two files drifting apart. */
export default function Experience({
  limit,
  headingLevel = "h2",
  id = "experience",
}: {
  limit?: number;
  headingLevel?: "h1" | "h2";
  id?: string;
}) {
  const Heading = headingLevel;
  const roles = limit ? experience.slice(0, limit) : experience;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("reveal", pageShell)}
    >
      <Heading id={`${id}-heading`} className={cn(heading2, "mb-8 block")}>
        Experience
      </Heading>

      {/* No gap between rows: each carries pt-6 above its own hairline and
          pb-6 below its content, so the rule lands centred in 48px of air
          instead of a rule-plus-gap that reads as uneven. */}
      <div>
        {roles.map((role) => (
          // Each row fades and rises into place on its own scroll timeline
          // (.reveal, globals.css) — a staggered entrance with no JS and no
          // per-row delay to hand-tune. No horizontal padding: cardSurface is
          // a hairline top rule, not a box, so the content sits on the
          // section's own left edge in line with the h2 above it.
          <div
            key={`${role.company}-${role.role}`}
            className={cn(cardSurface, "reveal pb-6")}
          >
            <div className="flex items-center gap-4">
              <CardLogo
                image={role.image}
                imageLight={role.imageLight}
                brand={role.logo ?? role.company}
                fit={role.imageFit}
                shape="circle"
                className="size-[42px]"
              />

              <div className="min-w-0">
                <p className="font-semibold text-fg">{role.role}</p>
                <p className="truncate text-sm text-muted">
                  {role.company}
                  {role.location ? ` · ${role.location}` : ""}
                </p>
              </div>

              <time className="ml-auto shrink-0 text-sm text-muted">
                {formatRange(role.start, role.end)}
              </time>
            </div>

            {role.stack.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {role.stack.map((tech) => (
                  <TechPill key={tech} name={tech} />
                ))}
              </ul>
            ) : null}

            <ul className="mt-5 space-y-3">
              {role.highlights.map((point) => (
                <li key={point} className="relative pl-6 text-sm leading-relaxed text-muted">
                  {/* The timeline: a dot per bullet, and a rule running down
                      between them. Both decorative, so both aria-hidden. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.45rem] left-0 size-2 rounded-full bg-accent-2"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.95rem] bottom-[-0.75rem] left-[0.19rem] w-px bg-border last:hidden"
                  />
                  {point}
                </li>
              ))}
            </ul>

            {role.href ? (
              <a
                href={role.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 underline underline-offset-4 hover:text-fg"
              >
                {role.company}
                <ExternalLink size={14} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
