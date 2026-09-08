import { skills } from "@/content/skills";
import { cn, sectionLabel } from "@/lib/utils";
import { TechPill } from "@/components/ui/tech-icon";

/** The tech stack: a wrapped grid of labelled pills, grouped by kind.
 *
 *  Entirely static, entirely server-rendered. Every technology is real text in
 *  the DOM, which is the only form an ATS keyword scanner can read — an icon
 *  grid with hover labels scores zero on the thing this section exists for. */
export default function Skills({ id = "skills" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="reveal mx-auto w-full max-w-4xl px-5 py-14"
    >
      <h2 id={`${id}-heading`} className={cn(sectionLabel, "mb-6 block")}>
        Tech stack
      </h2>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {Object.entries(skills.technologies).map(([group, items]) => (
          <div key={group}>
            <p className="mb-3 text-sm font-medium text-fg">{group}</p>
            <ul className="flex flex-wrap gap-2">
              {items.map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
