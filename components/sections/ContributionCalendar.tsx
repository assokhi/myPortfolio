import { getGithub } from "@/lib/stats";
import { cn } from "@/lib/utils";
import CountUp from "@/components/ui/count-up";
import SpotlightCard from "@/components/ui/spotlight-card";

/** A year of commits, in the site's own accent rather than GitHub's green.
 *
 *  Five steps of one hue: an empty day is the card surface, and each level
 *  above it raises the accent's opacity. Colour is never the only carrier —
 *  every square keeps a title with the date and the count, which is also what
 *  a screen reader reads from the table cell. */
const LEVELS = [
  "bg-white/[0.04]",
  "bg-accent-2/25",
  "bg-accent-2/45",
  "bg-accent-2/70",
  "bg-accent-2",
];

function level(count: number, busiest: number): number {
  if (count === 0) return 0;
  // Quartiles of the year's own busiest day, so a quiet year still shows shape.
  const step = Math.max(1, Math.ceil(busiest / 4));
  return Math.min(4, Math.ceil(count / step));
}

export default async function ContributionCalendar() {
  const res = await getGithub();
  // No token, no calendar: GitHub serves it through GraphQL only. Rendering
  // nothing beats rendering an empty grid that reads as a year off.
  if (!res.ok || res.data.calendar.length === 0) return null;

  const weeks = res.data.calendar;
  const busiest = Math.max(
    ...weeks.flat().map((d) => d.count),
    1,
  );
  const total = res.data.contributionsLastYear ?? 0;

  return (
    <section aria-labelledby="contributions-heading" className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3
          id="contributions-heading"
          className="text-sm font-semibold uppercase tracking-[0.1em] text-muted"
        >
          Contributions
        </h3>

        {/* The one number this section exists to show, in the same glass-card
            language as the rest of the page — not a stray line of text. */}
        <SpotlightCard
          href={res.data.profileUrl}
          external
          className="gap-3 px-4 py-2.5"
        >
          <p className="font-mono text-2xl font-semibold leading-none tracking-[-0.02em] text-fg tabular-nums">
            <CountUp value={total} />
          </p>
          <span className="text-xs text-muted">in the last year</span>
        </SpotlightCard>
      </div>

      {/* Horizontal scroll on a phone rather than squares too small to read.
          The grid is columns of weeks, which is how GitHub returns them. Every
          cell keeps a hairline border so a zero-contribution day still reads
          as a grid square instead of a gap in the layout. */}
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-[3px]">
          {weeks.map((week) => (
            <div key={week[0]?.date} className="grid grid-rows-7 gap-[3px]">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} on ${day.date}`}
                  className={cn(
                    "size-[11px] rounded-[3px] border border-white/5",
                    LEVELS[level(day.count, busiest)],
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-muted">
        <span>Less</span>
        {LEVELS.map((c) => (
          <span key={c} className={cn("size-[11px] rounded-[3px] border border-white/5", c)} />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
