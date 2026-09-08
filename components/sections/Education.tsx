import { GraduationCap, School } from "lucide-react";
import { education } from "@/content/education";
import { formatRange } from "@/lib/dates";
import { cn, sectionLabel } from "@/lib/utils";
import Accordion from "@/components/ui/accordion";
import CardLogo from "@/components/ui/card-logo";

/** Same accordion pattern as Experience, on purpose: two sections that behave
 *  differently for no reason is a thing a reader has to learn twice. */
export default function Education({ id = "education" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="reveal mx-auto w-full max-w-4xl px-5 py-14"
    >
      <h2 id={`${id}-heading`} className={cn(sectionLabel, "mb-6 block")}>
        Education
      </h2>

      <div className="space-y-3">
        {education.map((entry) => {
          const Icon = entry.kind === "school" ? School : GraduationCap;
          // A row with nothing to reveal must not pretend it expands. The
          // chevron would be a promise the row cannot keep.
          const hasDetail = Boolean(entry.notes?.length);

          const summary = (
            <div className="flex items-center gap-4">
              {entry.logo ? (
                <CardLogo image={entry.logo} />
              ) : (
                // No logo file: the same 48px box with a Lucide glyph at the
                // brand-mark size, so a row without a crest lines up with the
                // rows that have one.
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-ink/[0.08] bg-ink/5">
                  <Icon size={26} aria-hidden="true" className="text-muted" />
                </span>
              )}

              <div className="min-w-0">
                <p className="font-semibold text-fg">{entry.institution}</p>
                <p className="text-sm text-muted">
                  {entry.qualification}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
              </div>

              <time className="ml-auto hidden shrink-0 text-sm text-muted sm:block">
                {formatRange(entry.start, entry.end)}
              </time>
            </div>
          );

          if (!hasDetail) {
            return (
              <div
                key={`${entry.institution}-${entry.qualification}`}
                className="reveal rounded-2xl border border-border bg-surface/60 px-5 py-5 backdrop-blur-sm transition-colors duration-200 hover:border-accent-2/50 sm:px-6"
              >
                {summary}
              </div>
            );
          }

          return (
            <Accordion
              key={`${entry.institution}-${entry.qualification}`}
              className="reveal"
              summary={summary}
            >
              <ul className="space-y-3">
                {entry.notes?.map((note) => (
                  <li
                    key={note}
                    className="relative pl-6 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.45rem] left-0 size-2 rounded-full bg-accent-2"
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </Accordion>
          );
        })}
      </div>
    </section>
  );
}
