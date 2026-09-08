import Link from "next/link";
import { ExternalLink } from "lucide-react";
// lucide-react v1 dropped brand marks; this repo keeps its own.
import { Github } from "@/components/ui/BrandIcons";
import { projects } from "@/content/projects";
import { cn, cardSurface, sectionLabel } from "@/lib/utils";
import { TechPill } from "@/components/ui/tech-icon";
import CardLogo from "@/components/ui/card-logo";

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

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="reveal mx-auto w-full max-w-4xl px-5 py-14"
    >
      <Heading id={`${id}-heading`} className={cn(sectionLabel, "mb-6 block")}>
        Projects
      </Heading>

      <div className="space-y-10">
        {shown.map((project) => (
          <article key={project.name} className={cn(cardSurface, "p-5 sm:p-6")}>
            <div className="flex items-center gap-3">
              <CardLogo brand={project.logo ?? project.name} />

              <h3 className="text-lg font-semibold text-fg">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 hover:text-accent-2"
                >
                  {project.name}
                  <ExternalLink size={15} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </h3>

              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.name} source on GitHub`}
                  className="ml-auto text-muted transition-colors hover:text-fg"
                >
                  <Github aria-hidden="true" className="size-[18px]" />
                </a>
              ) : null}
            </div>

            {project.shots?.length ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.shots.map((shot) => (
                  // see
                  // next.config.ts: no image optimizer exists on Workers.
                  // width/height and lazy loading are the two things that
                  // actually matter here, and both are set.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={shot}
                    src={shot}
                    alt={`${project.name} screenshot`}
                    width={640}
                    height={400}
                    loading="lazy"
                    className="w-full rounded-lg border border-border object-cover"
                  />
                ))}
              </div>
            ) : null}

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            {project.highlights.length ? (
              <ul className="mt-4 space-y-2">
                {project.highlights.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.5rem] left-0 size-1.5 rounded-full bg-accent-2"
                    />
                    {emphasise(point)}
                  </li>
                ))}
              </ul>
            ) : null}

            {project.tech.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <TechPill key={tech} name={tech} />
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

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
