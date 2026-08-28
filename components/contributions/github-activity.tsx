import { cn, cardSurface } from "@/lib/utils";

type Activity = {
  commits: number;
  issues: number;
  pullRequests: number;
  reviews: number;
  repositories: number;
};

/** Rough scale references, not exact stats — a radar chart with five very
 *  different-sized metrics on one linear scale would flatten the small ones
 *  to nothing. Ceilings just keep every axis legible; the real numbers live
 *  in the list next to it. */
const CEILINGS: Record<keyof Activity, number> = {
  commits: 150,
  issues: 20,
  pullRequests: 30,
  reviews: 30,
  repositories: 30,
};

const AXES: { key: keyof Activity; label: string }[] = [
  { key: "commits", label: "Commits" },
  { key: "issues", label: "Issues" },
  { key: "pullRequests", label: "PullReq" },
  { key: "reviews", label: "Review" },
  { key: "repositories", label: "Repo" },
];

const SIZE = 160;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 24;

function point(index: number, fraction: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / AXES.length;
  return {
    x: CENTER + RADIUS * fraction * Math.cos(angle),
    y: CENTER + RADIUS * fraction * Math.sin(angle),
  };
}

function polygon(fraction: number) {
  return AXES.map((_, i) => {
    const p = point(i, fraction);
    return `${p.x},${p.y}`;
  }).join(" ");
}

export function GithubActivity({ activity }: { activity: Activity }) {
  const dataPoints = AXES.map(({ key }, i) => {
    const fraction = Math.min(1, activity[key] / CEILINGS[key]);
    return point(i, fraction);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className={cn(cardSurface, "p-6")}>
      <h3 className="text-base font-semibold text-fg">GitHub Activity</h3>
      <p className="mt-1 text-sm text-muted">Development activity breakdown</p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:justify-between">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label="Radar chart of commit, issue, pull request, review and repository activity"
          className="shrink-0"
        >
          {[0.33, 0.66, 1].map((f) => (
            <polygon
              key={f}
              points={polygon(f)}
              fill="none"
              stroke="currentColor"
              className="text-white/10"
            />
          ))}
          {AXES.map((_, i) => {
            const p = point(i, 1);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                className="text-white/10"
              />
            );
          })}
          <polygon
            points={dataPolygon}
            fill="var(--color-accent-2)"
            fillOpacity={0.25}
            stroke="var(--color-accent-2)"
            strokeWidth={1.5}
          />
          {AXES.map(({ label }, i) => {
            const p = point(i, 1.22);
            return (
              <text
                key={label}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted text-[9px] font-medium uppercase tracking-wide"
              >
                {label}
              </text>
            );
          })}
        </svg>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {[
            { label: "Commits", value: activity.commits },
            { label: "Pull Requests", value: activity.pullRequests },
            { label: "Reviews", value: activity.reviews },
            { label: "Issues", value: activity.issues },
          ].map((m) => (
            <div key={m.label}>
              <dt className="text-xs text-muted">{m.label}</dt>
              <dd className="font-mono text-lg font-semibold tabular-nums text-fg">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
