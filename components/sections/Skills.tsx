import { skills } from "@/content/skills";
import Section from "./Section";
import { BrandMark } from "@/components/ui/tech-icon";
import ShowMore from "@/components/ui/show-more";
import ContributionCalendar from "./ContributionCalendar";
import BoldOnHover from "@/components/ui/bold-on-hover";

export function StacksList() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.stacks.map((s) => (
        <li
          key={s.name}
          className="rounded-2xl border border-border bg-surface/50 p-5"
        >
          <h3 className="font-semibold text-fg">
            <BoldOnHover text={s.name} />
          </h3>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted">
            {s.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {s.tech.map((t) => (
              <li
                key={t}
                className="rounded-md bg-bg px-2 py-1 font-mono text-xs text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/** Pill badges: brand mark + name, both always visible (no hover-to-reveal
 *  tooltip) so the list reads at a glance like a skill chip row. One flat,
 *  top-aligned wrap across every category — no group headers. */
export function TechnologiesList() {
  const items = Object.values(skills.technologies).flat();
  return (
    <ul className="flex flex-wrap items-start gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-1.5 rounded-lg border border-ink/[0.08] bg-ink/5 px-3 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-ink/20 hover:bg-ink/10 hover:shadow-lg hover:shadow-black/40"
        >
          <BrandMark name={t} className="size-4 shrink-0" />
          <span className="text-sm font-medium text-fg">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  return (
    <Section id="skills" title="Skills" headerClassName="mb-4" className="py-6 lg:py-8">
      <TechnologiesList />

      <ContributionCalendar />

      <div className="-mt-16 flex justify-end">
        <ShowMore href="/skills" />
      </div>
    </Section>
  );
}
