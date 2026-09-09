import { skills } from "@/content/skills";
import { cn, heading2, pageShell } from "@/lib/utils";
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
      className={cn("reveal", pageShell)}
    >
      <h2 id={`${id}-heading`} className={cn(heading2, "mb-8 block")}>
        Tech stack
      </h2>

      {/* Three columns at lg: five groups fill 3+2 across the 1140px shell,
          where two columns left each one ~550px of mostly trailing whitespace. */}
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
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
