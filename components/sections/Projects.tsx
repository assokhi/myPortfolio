import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
// lucide-react v1 dropped brand marks; this repo keeps its own.
import { Github } from "@/components/ui/BrandIcons";
import { projects } from "@/content/projects";
import { bentoSpans } from "@/lib/bento";
import { cn, sectionLabel } from "@/lib/utils";
import { TechPill } from "@/components/ui/tech-icon";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

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
  const spans = bentoSpans(shown.length);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="reveal mx-auto w-full max-w-4xl px-5 py-14"
    >
      <Heading id={`${id}-heading`} className={cn(sectionLabel, "mb-6 block")}>
        Projects
      </Heading>

      <BentoGrid>
        {shown.map((project, i) => {
          const span = spans[i];
          // A tile that owns a whole row gets the cover beside the copy rather
          // than above it: a 16:9 cover across the full width would be 500px
          // tall and push everything that matters below the fold. The half-row
          // tiles keep the familiar cover-on-top card.
          const wide = span === 6;
          const cover = project.shots?.[0] ?? project.image;
          const live = project.repo ? project.href : null;
          const code = project.repo ?? project.href;

          return (
            <BentoGridItem
              key={project.name}
              span={span}
              className={wide ? "md:flex-row" : undefined}
            >
              <div
                className={cn(
                  "relative shrink-0 overflow-hidden bg-ink/5",
                  wide ? "aspect-video md:aspect-auto md:w-[42%]" : "aspect-video w-full",
                )}
              >
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover}
                    alt=""
                    width={800}
                    height={450}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover/bento:scale-[1.03]"
                  />
                ) : null}
              </div>

              <div className={cn("flex flex-1 flex-col gap-3 p-5", wide && "md:p-6")}>
                <div className="flex items-center gap-2">
                  <h3 className="min-w-0 text-base font-semibold tracking-tight text-fg">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      // Stretched link: one tab stop, whole tile clickable.
                      className="after:absolute after:inset-0 after:content-[''] hover:text-accent-2"
                    >
                      {project.name}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </h3>
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-transform duration-200 group-hover/bento:-translate-y-0.5 group-hover/bento:translate-x-0.5 group-hover/bento:text-accent-2"
                  />
                  {project.status === "wip" ? (
                    <span className="ml-auto shrink-0 rounded-full border border-border px-2 py-0.5 text-[0.65rem] font-medium text-muted">
                      In progress
                    </span>
                  ) : null}
                </div>

                <p className={cn("text-sm leading-relaxed text-muted", wide ? "line-clamp-3" : "line-clamp-4")}>
                  {project.description}
                </p>

                {/* Highlights only where there is room for them. A half-row tile
                    that tried to carry three bullets is what was clipping. */}
                {wide && project.highlights.length ? (
                  <ul className="space-y-1.5">
                    {project.highlights.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-xs leading-snug text-muted"
                      >
                        <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-muted/60" />
                        <span>{emphasise(point)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-1">
                  {project.tech.length ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, wide ? 5 : 3).map((tech) => (
                        <TechPill
                          key={tech}
                          name={tech}
                          className="gap-1.5 px-2 py-1 text-[0.7rem]"
                        />
                      ))}
                    </ul>
                  ) : null}

                  <div className="relative z-10 ml-auto flex items-center gap-3 text-xs font-medium">
                    {live ? (
                      <a
                        href={live}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-fg transition-colors hover:text-accent-2"
                      >
                        Live
                        <span className="sr-only"> demo of {project.name} (opens in a new tab)</span>
                      </a>
                    ) : null}
                    <a
                      href={code}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
                    >
                      <Github aria-hidden="true" className="size-4" />
                      Code
                      <span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </div>
            </BentoGridItem>
          );
        })}
      </BentoGrid>

      {limit && projects.length > limit ? (
        <Link
          href="/projects"
          className="mt-8 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          View all projects <span aria-hidden="true">&rarr;</span>
        </Link>
      ) : null}
    </section>
  );
}
