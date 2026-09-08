import { ExternalLink } from "lucide-react";
import { experience } from "@/content/experience";
import { formatRange } from "@/lib/dates";
import { cn, sectionLabel } from "@/lib/utils";
import Accordion from "@/components/ui/accordion";
import { TechPill } from "@/components/ui/tech-icon";
import CardLogo from "@/components/ui/card-logo";

/** The work history, as a vertical timeline of expandable rows.
 *
 *  `limit` is what makes this one component serve both the home page (one row,
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
      className="reveal mx-auto w-full max-w-4xl px-5 py-14"
    >
      <Heading id={`${id}-heading`} className={cn(sectionLabel, "mb-6 block")}>
        Experience
      </Heading>

      <div className="space-y-3">
        {roles.map((role) => (
          <Accordion
            key={`${role.company}-${role.role}`}
            // Each card fades and rises into place on its own scroll timeline
            // (.reveal, globals.css) — a staggered entrance with no JS and no
            // per-row delay to hand-tune.
            className="reveal"
            // The most recent role is open on arrival. A recruiter who reads
            // nothing else reads this one, and making them click for it is a
            // click they will not spend.
            defaultOpen={role === roles[0]}
            summary={
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
                  <p className="flex flex-wrap items-center gap-x-2 font-semibold text-fg">
                    {role.role}
                    {role.href ? (
                      // Inside <summary>, so it must not be focusable: a link
                      // in a summary is a keyboard trap and swallows the
                      // toggle's own Enter key. The company row on the
                      // expanded panel carries the real link instead.
                      <ExternalLink
                        size={14}
                        aria-hidden="true"
                        className="text-muted"
                      />
                    ) : null}
                  </p>
                  <p className="truncate text-sm text-muted">
                    {role.company}
                    {role.location ? ` · ${role.location}` : ""}
                  </p>
                </div>

                <time className="ml-auto shrink-0 text-sm text-muted">
                  {formatRange(role.start, role.end)}
                </time>
              </div>
            }
          >
            {role.stack.length ? (
              <ul className="mb-5 flex flex-wrap gap-2">
                {role.stack.map((tech) => (
                  <TechPill key={tech} name={tech} />
                ))}
              </ul>
            ) : null}

            <ul className="space-y-3">
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
          </Accordion>
        ))}
      </div>
    </section>
  );
}
