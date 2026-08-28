import { cn, cardSurface } from "@/lib/utils";

/** Five steps of one hue: an empty day is barely there, each level above it
 *  raises the fill. Colour is never the only carrier — every cell keeps a
 *  hover tooltip with the exact count and date, which is also what a screen
 *  reader gets from the title text. */
const LEVELS = [
  "bg-white/[0.04]",
  "bg-blue-500/25",
  "bg-blue-500/45",
  "bg-blue-500/70",
  "bg-blue-400",
];

function level(count: number, busiest: number): number {
  if (count === 0) return 0;
  // Quartiles of the year's own busiest day, so a quiet year still shows shape.
  const step = Math.max(1, Math.ceil(busiest / 4));
  return Math.min(4, Math.ceil(count / step));
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function ContributionHeatmap({
  weeks,
  total,
}: {
  weeks: { date: string; count: number }[][];
  total: number;
}) {
  const busiest = Math.max(...weeks.flat().map((d) => d.count), 1);

  return (
    <div
      className={cn(
        cardSurface,
        "relative overflow-hidden p-6 sm:p-8",
      )}
    >
      {/* Very subtle depth, not a spotlight: a soft glow tucked in one
          corner, well under the "excessive gradient" line. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-fg">Contribution Activity</h3>
          <p className="mt-1 text-sm text-muted">GitHub activity over the last year</p>
        </div>
        <p className="font-mono text-lg font-semibold tabular-nums text-fg">
          {total.toLocaleString("en-GB")}{" "}
          <span className="font-sans text-sm font-normal text-muted">contributions</span>
        </p>
      </div>

      <div className="relative mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-[3px]">
          {weeks.map((week) => (
            <div key={week[0]?.date} className="grid grid-rows-7 gap-[3px]">
              {week.map((day) => (
                <div key={day.date} className="group/cell relative">
                  <span
                    className={cn(
                      "block size-[11px] rounded-[3px] border border-white/5 transition-transform duration-150 group-hover/cell:scale-125",
                      LEVELS[level(day.count, busiest)],
                    )}
                  />
                  {/* Linear/Vercel-style floating tooltip, CSS-only: no JS
                      needed for a hover reveal that already has the final
                      content server-rendered. */}
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-surface px-2.5 py-1.5 text-xs opacity-0 shadow-xl shadow-black/40 transition-opacity duration-150 group-hover/cell:opacity-100"
                  >
                    <p className="font-semibold text-fg">
                      {day.count} {day.count === 1 ? "contribution" : "contributions"}
                    </p>
                    <p className="text-muted">{dateFmt.format(new Date(day.date))}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-3 flex items-center gap-2 text-xs text-muted">
        <span>Less</span>
        {LEVELS.map((c) => (
          <span key={c} className={cn("size-[11px] rounded-[3px] border border-white/5", c)} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
