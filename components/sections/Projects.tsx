import Link from "next/link";
import { projects } from "@/content/projects";
import { cn, heading2, pageShell } from "@/lib/utils";
import { TechPill } from "@/components/ui/tech-icon";
import CoverImage from "@/components/ui/cover-image";

/** Flat cover grounds for projects with no image file, in the manner of the
 *  case-study grids this section is modelled on: a wordmark on a solid brand
 *  ground, not an empty grey box. Every tile gets one, image or not — it is
 *  what shows through when a cover fails to load. Cycled by position so two
 *  neighbouring coverless cards never land on the same colour. Dark enough that
 *  white type on them clears 4.5:1 in either theme — fixed, they do not flip. */
const TINTS = ["#123d38", "#1b2a5e", "#3b1030", "#2a2410"];

/** Renders `**wrapped**` runs bold and leaves everything else alone.
 *
 *  Not a Markdown parser and not trying to be: the only emphasis a project
 *  bullet needs is the number in it, and pulling in a renderer to bold one
 *  substring would be a dependency for a `split()`. The data decides what is
 *  emphasised, which is the point — no per-bullet styling in the component. */
function emphasise(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    // Odd indices are the captured groups, i.e. what was inside the asterisks.
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-fg">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function Projects({
  limit,
  headingLevel = "h2",
  id = "projects",
}: {
  limit?: number;
  headingLevel?: "h1" | "h2";
  id?: string;
}) {
  const Heading = headingLevel;
  const shown = limit ? projects.slice(0, limit) : projects;
  // The full page has the room for outcomes; the home teaser is a three-card
  // row that has to stay scannable. Same component, no extra prop — the
  // caller that omits `limit` is by definition the page that shows everything.
  const detailed = !limit;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("reveal", pageShell)}
    >
      <Heading id={`${id}-heading`} className={cn(heading2, "mb-8 block")}>
        Projects
      </Heading>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project, i) => {
          const cover = project.image;

          return (
            // `relative` is load-bearing: the title carries a stretched-link
            // pseudo-element so the whole card is one click target rather than
            // the cover, the title and the call to action being three adjacent
            // links to the same URL.
            <article key={project.name} className="group relative flex flex-col">
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-xl"
                style={{ backgroundColor: TINTS[i % TINTS.length] }}
              >
                {/* The name is already the <h3> below, so this is decoration.
                    It is painted for every card and the cover sits on top of
                    it: a cover that fails removes itself and this is what is
                    left, rather than a broken-image icon. */}
                <span
                  aria-hidden="true"
                  className="flex size-full items-center justify-center px-6 text-center text-3xl font-semibold tracking-tight text-white"
                >
                  {project.name}
                </span>
                {cover ? <CoverImage src={cover} /> : null}
              </div>

              <div className="mt-4 flex flex-1 flex-col gap-2">
                <div className="flex items-start gap-2">
                  <h3 className="min-w-0 text-lg font-semibold leading-snug tracking-tight text-fg">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent-2"
                    >
                      {project.name}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </h3>
                  {project.status === "wip" ? (
                    <span className="mt-1 ml-auto shrink-0 rounded-full border border-border px-2 py-0.5 text-[0.65rem] font-medium text-muted">
                      In progress
                    </span>
                  ) : null}
                </div>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                {detailed && project.highlights.length ? (
                  <ul className="mt-1 space-y-1.5">
                    {project.highlights.slice(0, 2).map((point) => (
                      <li key={point} className="flex gap-2 text-xs leading-snug text-muted">
                        <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-muted/60" />
                        <span>{emphasise(point)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {project.tech.length ? (
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <TechPill key={tech} name={tech} className="gap-1.5 px-2 py-1 text-[0.7rem]" />
                    ))}
                  </ul>
                ) : null}

                {/* Not a link: the card already is one, and a second anchor to
                    the same URL is a second tab stop for no second destination. */}
                <span className="mt-auto pt-3 text-sm font-medium text-muted transition-colors group-hover:text-fg">
                  View project{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {limit && projects.length > limit ? (
        <Link
          href="/projects"
          className="mt-12 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          View all projects <span aria-hidden="true">&rarr;</span>
        </Link>
      ) : null}
    </section>
  );
}
