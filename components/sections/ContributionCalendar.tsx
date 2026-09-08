import { getGithub } from "@/lib/stats";

/** Level 0 (no contributions) is the neutral border tone; levels 1-5 mix
 *  --color-accent-2 into --color-bg at rising percentages. Mixing toward the
 *  page background rather than using alpha keeps every step a genuinely
 *  distinct, saturated purple instead of alpha-over-black going muddy at the
 *  low end — the failure mode a flat opacity ramp had here before. */
const LEVEL_MIX_PCT = [62, 78, 90, 97, 100];

function levelOf(count: number, max: number) {
  if (count <= 0 || max <= 0) return 0;
  const ratio = count / max;
  if (ratio > 0.8) return 5;
  if (ratio > 0.6) return 4;
  if (ratio > 0.4) return 3;
  if (ratio > 0.2) return 2;
  return 1;
}

function cellStyle(level: number) {
  if (level === 0) return undefined;
  const color = `color-mix(in oklab, var(--color-accent-2) ${LEVEL_MIX_PCT[level - 1]}%, var(--color-bg))`;
  return {
    backgroundColor: color,
    // The top two tiers get a soft glow — the "most active" cells should
    // read as lit up, not just as a slightly darker flat swatch.
    boxShadow: level >= 4 ? `0 0 6px 0 ${color}` : undefined,
  };
}

const monthFmt = new Intl.DateTimeFormat("en", { month: "short" });

/** A native GitHub-style contribution heatmap, built from `lib/stats.ts`'s
 *  own `getGithub()` — the daily calendar it already fetches (GraphQL,
 *  token-gated) for a total nobody was rendering. Replaces the old 3D
 *  skyline/radar/donut composite from the `yoshi389111` GitHub Action: this
 *  reads the site's own colour tokens instead of shipping a themed image
 *  pair, needs no daily cron committing SVGs back into the repo, and costs
 *  the visitor nothing extra since the data was already part of the build.
 *
 *  No token (e.g. local dev without GITHUB_TOKEN) means an empty calendar —
 *  not a failed section, same posture as every other card here: it just
 *  renders nothing. */
export default async function ContributionCalendar() {
  const res = await getGithub();
  if (!res.ok) return null;

  const { calendar, contributionsLastYear, profileUrl } = res.data;
  if (calendar.length === 0) return null;

  const max = calendar.reduce(
    (m, week) => Math.max(m, ...week.map((d) => d.count)),
    0,
  );

  // One label per week column: a column only gets a label when its month
  // differs from the previous column's — a pure comparison against the
  // neighbouring element, so nothing needs to be tracked across iterations.
  const monthOfWeek = (week: typeof calendar[number]) => {
    const first = week[0];
    return first ? new Date(first.date).getUTCMonth() : -1;
  };
  const monthLabels = calendar.map((week, i) => {
    const month = monthOfWeek(week);
    if (month === -1) return "";
    if (i > 0 && monthOfWeek(calendar[i - 1]) === month) return "";
    return monthFmt.format(new Date(week[0].date));
  });

  return (
    <section aria-label="Contribution activity" className="mt-2">
      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        className="mx-auto block max-w-2xl"
      >
        {/* Right-anchored and clipped, not scrolled: on a narrow viewport the
            oldest weeks run off the left edge instead of demanding a
            horizontal scrollbar. `justify-end` keeps the newest week — the
            one anyone actually cares about — pinned to the right no matter
            how many weeks get clipped. The mask fades that clipped edge
            instead of hard-cutting a week down the middle of its cells,
            which read as a rendering glitch rather than an intentional crop.
            Decorative grid: the paragraph below already states the number
            that matters, so this is aria-hidden rather than making a screen
            reader step through 365 day cells. */}
        <div
          className="overflow-hidden"
          aria-hidden="true"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 24px)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 24px)",
          }}
        >
          <div className="flex justify-end gap-[5px] text-xs text-muted">
            {monthLabels.map((label, i) => (
              <span key={i} className="w-[18px] shrink-0 overflow-visible whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>

          <div className="mt-2 flex justify-end gap-[5px]">
            {calendar.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[5px]">
                {week.map((day, di) => {
                  const level = levelOf(day.count, max);
                  return (
                    <span
                      key={di}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      style={cellStyle(level)}
                      className={`size-[18px] rounded-[5px] ${level === 0 ? "bg-border" : ""}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted" aria-hidden="true">
          Less
          <span className="size-[18px] rounded-[5px] bg-border" />
          {LEVEL_MIX_PCT.map((_, i) => (
            <span
              key={i}
              className="size-[18px] rounded-[5px]"
              style={cellStyle(i + 1)}
            />
          ))}
          More
        </div>

        {contributionsLastYear !== null ? (
          <p className="mt-3 text-sm text-muted">
            <span className="font-semibold text-fg">
              {contributionsLastYear.toLocaleString("en-GB")}
            </span>{" "}
            contributions in the last year
          </p>
        ) : null}
      </a>
    </section>
  );
}
