import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/content/experience";
import { formatRange } from "@/lib/dates";
import Section from "./Section";
import NumberedList from "@/components/ui/numbered-list";
import IntroPanel from "@/components/ui/intro-panel";
import TechIcon from "@/components/ui/tech-icon";
import ShowMore from "@/components/ui/show-more";
import BoldOnHover from "@/components/ui/bold-on-hover";
import { cn } from "@/lib/utils";
import {
  GithubCard,
  LeetcodeCard,
  CodeforcesCard,
} from "./LiveStats";
import { StatCardSkeleton } from "./StatCard";

/** Bento cell. Same radius, padding and floor as StatCard — the grid only
 *  reads as one object if every tile is cut from the same shape. */
export function BentoCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      // No card chrome at all: no border, no fill, no blur. The logo panel and
      // the gap between tiles are what separate one role from the next, so the
      // bento reads as content on the page rather than as a row of boxes.
      className={cn(
        "isolate flex min-h-56 flex-col overflow-hidden rounded-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

function JobCell({
  job,
  compact,
  className,
}: {
  job: (typeof experience)[number];
  compact?: boolean;
  className?: string;
}) {
  return (
    <BentoCell className={className}>
      {/* Intro panel, with the location capsule riding on top of it. */}
      <div className="relative">
        <IntroPanel
          brand={job.logo ?? job.company}
          src={job.image}
          fit={job.imageFit}
          alt={`${job.company} — ${job.role}`}
        />
        {job.location ? (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs text-muted backdrop-blur-sm">
            {job.location}
          </span>
        ) : null}
      </div>

      {/* px-1 on the whole text block, not on one line: the tile lost its
          padding when it went borderless, and type sitting flush against an
          overflow-hidden edge clips the left stem of the first glyph. One
          indent keeps role, company and dates on the same axis. */}
      <div className="mt-5 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] text-fg">
            <BoldOnHover text={job.role} />
          </h3>
          <p className="mt-2 text-sm font-medium text-fg">{job.company}</p>
          {/* The range gets its own line. Trailing the company name, it wrapped
              mid-month on a narrow tile — "FEB" on one line, "2026" on the
              next. */}
          {/* Sans, like the two lines above it, and pushed a further 3px right
              so the first letter clears the tile's clipping edge. */}
          <p className="mt-1 pl-[6px] text-xs tabular-nums text-muted">
            <time dateTime={job.start}>{formatRange(job.start, job.end)}</time>
          </p>
        </div>
        {job.href ? (
          <a
            href={job.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${job.company} — ${job.role}`}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-bg bg-bg text-fg transition-colors duration-200 hover:border-fg/40"
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      {/* The home card stops at the header — outcomes and stack live on
          /experience, behind "Show more". */}
      {compact ? null : (
        <>
          <NumberedList items={job.highlights} className="mt-5" />

          {/* Identical treatment to the Skills grid — same tile, same size,
              same hover. One shape across the whole site. */}
          <ul className="mt-auto flex flex-wrap gap-3 pt-9">
            {job.stack.map((t) => (
              <TechIcon key={t} name={t} />
            ))}
          </ul>
        </>
      )}
    </BentoCell>
  );
}

/** The role tiles, drifting left to right instead of sitting still. Same
 *  tiles as the grid below — this is the bento's top row, not a second
 *  component repeating it.
 *
 *  The tile widths are load-bearing: three roles at 26rem plus the gaps make
 *  one copy 1320px, wider than the 1280px the section can ever be, so the same
 *  role can never appear twice on screen. Widen the tiles again if a fourth
 *  role arrives and you want them narrower — do not narrow them below this.
 *
 *  Three copies of the list; only the first is in the accessibility tree, and
 *  the clones are `inert` so nothing in them can take focus. See `.marquee` in
 *  globals.css for the loop and the reduced-motion fallback. */
function JobMarquee() {
  return (
    <div className="marquee -mx-5 overflow-hidden">
      {/* The gap lives INSIDE each copy, as a trailing pr-*, and the track
          itself has neither gap nor padding. A gap on the track would make the
          track 3 copies + 2 gaps wide, so a 33.3333% travel would fall one
          third of a gap short and the loop would visibly jump on every wrap. */}
      <div className="marquee-track">
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0 || undefined}
            inert={copy > 0 || undefined}
            className="flex shrink-0 gap-4 pr-4 lg:gap-6 lg:pr-6"
          >
            {experience.map((job) => (
              <JobCell
                key={`${job.company}-${job.start}`}
                job={job}
                compact
                className="w-[19rem] sm:w-[22rem] lg:w-[26rem]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** The bento: the role tiles on their own grid, then the self-updating numbers
 *  on a single row beneath them, so the stats cost the page one row of height
 *  no matter how many roles there are. Each stat streams independently — a slow
 *  LeetCode cannot hold up GitHub, and none of them hold up the page paint. */
export function ExperienceBento({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-4">
      {/* Moving tiles are for the glance; /experience holds still so the
          outcomes underneath them can actually be read. */}
      {compact ? (
        <JobMarquee />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {experience.map((job) => (
            <JobCell key={`${job.company}-${job.start}`} job={job} />
          ))}
        </div>
      )}

      {/* Three stat cards on one centred row: they cost the page a single row
          of height, whatever the job count is. Capped and centred so three
          cards do not stretch to the width of a four-card grid. */}
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<StatCardSkeleton title="GitHub" />}>
          <GithubCard compact={compact} />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton title="LeetCode" />}>
          <LeetcodeCard compact={compact} />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton title="Codeforces" />}>
          <CodeforcesCard compact={compact} />
        </Suspense>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ExperienceBento compact />

      {/* The home page shows headline numbers only; the full profiles, the
          easy/medium/hard split, the top repos and every certificate live on
          /experience. */}
      <div className="mt-6 flex justify-center">
        <ShowMore href="/experience" />
      </div>
    </Section>
  );
}
