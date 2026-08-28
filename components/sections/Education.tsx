import { education } from "@/content/education";
import Section from "./Section";
import { formatRange } from "@/lib/dates";

export function EducationList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="space-y-6">
      {education.map((e) => (
        <li
          key={`${e.institution}-${e.start}`}
          className="rounded-xl border border-border bg-surface/60 p-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-semibold text-fg">{e.qualification}</h3>
            <p className="font-mono text-xs text-muted">
              {formatRange(e.start, e.end)}
            </p>
          </div>
          <p className="mt-1 text-sm text-accent">
            {e.institution}
            {e.location ? ` — ${e.location}` : ""}
          </p>
          {detailed && e.notes?.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 font-serif text-sm leading-relaxed text-muted">
              {e.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function Education() {
  return (
    <Section id="education" title="Education" href="/education">
      <EducationList />
    </Section>
  );
}
