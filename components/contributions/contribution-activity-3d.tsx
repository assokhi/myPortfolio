"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn, cardSurface } from "@/lib/utils";

/** A true isometric projection (parallel, not perspective) of the
 *  contribution calendar into a small 3D voxel landscape — each day is a box
 *  with its own top/right/front face, extruded by contribution count. This is
 *  real coordinate geometry (not a flat 2D grid with one CSS rotation slapped
 *  on it), rendered as SVG polygons rather than a Three.js scene: isometric
 *  projection is itself an affine transform, so plain trigonometry reproduces
 *  it exactly without pulling in a 3D engine for a below-the-fold widget. */
const TILE = 10;
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);
const HEIGHTS = [1.5, 6, 12, 20, 32];
const FACES = [
  { top: "#1c2942", right: "#161f34", front: "#111827" },
  { top: "#1d4ed8", right: "#1841ae", front: "#123285" },
  { top: "#2563eb", right: "#1f52c1", front: "#183e93" },
  { top: "#3b82f6", right: "#2f68c9", front: "#25519c" },
  { top: "#38bdf8", right: "#2b96c4", front: "#1f759c" },
];

function level(count: number, busiest: number): number {
  if (count === 0) return 0;
  const step = Math.max(1, Math.ceil(busiest / 4));
  return Math.min(4, Math.ceil(count / step));
}

function project(col: number, row: number, z: number) {
  return {
    x: (col - row) * COS30 * TILE,
    y: (col + row) * SIN30 * TILE - z,
  };
}

function pts(corners: { x: number; y: number }[]) {
  return corners.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short" });

type Day = { date: string; count: number };
type Tooltip = { x: number; y: number; count: number; date: string };

export function ContributionActivity3D({
  weeks,
  total,
}: {
  weeks: Day[][];
  total: number;
}) {
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Small range: a hint of parallax toward the cursor, never a spin.
    tiltY.set(px * 10);
    tiltX.set(-py * 8);
  }
  function onLeave() {
    tiltX.set(0);
    tiltY.set(0);
    setTooltip(null);
    setHovered(null);
  }

  const busiest = Math.max(...weeks.flat().map((d) => d.count), 1);

  const { cubes, viewBox, monthLabels } = useMemo(() => {
    const cubes = weeks.flatMap((week, col) =>
      week.map((day, row) => {
        const lvl = level(day.count, busiest);
        const h = HEIGHTS[lvl];
        const top = [
          project(col, row, h),
          project(col + 1, row, h),
          project(col + 1, row + 1, h),
          project(col, row + 1, h),
        ];
        const right = [
          project(col + 1, row, 0),
          project(col + 1, row + 1, 0),
          project(col + 1, row + 1, h),
          project(col + 1, row, h),
        ];
        const front = [
          project(col, row + 1, 0),
          project(col + 1, row + 1, 0),
          project(col + 1, row + 1, h),
          project(col, row + 1, h),
        ];
        return { key: day.date, col, row, day, lvl, top, right, front };
      }),
    );
    // Back-to-front paint order so a tall cube never gets occluded by a
    // shorter one that happens to sit in front of it in the projection.
    cubes.sort((a, b) => a.col + a.row - (b.col + b.row));

    const allPoints = cubes.flatMap((c) => [...c.top, ...c.right, ...c.front]);
    const xs = allPoints.map((p) => p.x);
    const ys = allPoints.map((p) => p.y);
    const pad = TILE;
    const minX = Math.min(...xs) - pad;
    const maxX = Math.max(...xs) + pad;
    const minY = Math.min(...ys) - pad;
    const maxY = Math.max(...ys) + pad;
    const viewBox = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

    // One label per month, placed at that month's first week column.
    const seen = new Set<string>();
    const monthLabels: { col: number; label: string }[] = [];
    weeks.forEach((week, col) => {
      const d = week.find((day) => day.count >= 0);
      if (!d) return;
      const key = d.date.slice(0, 7);
      if (seen.has(key)) return;
      seen.add(key);
      monthLabels.push({ col, label: monthFmt.format(new Date(d.date)) });
    });

    return { cubes, viewBox, monthLabels };
  }, [weeks, busiest]);

  return (
    <div className={cn(cardSurface, "relative overflow-hidden p-6 sm:p-8")}>
      {/* Atmospheric, not glowing: one soft dark-blue field behind the scene,
          well short of a spotlight beam. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,theme(colors.blue.500/12%),transparent)]"
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

      {/* Month row: a plain flat strip, deliberately outside the 3D scene so
          it never gets caught in the isometric skew. */}
      <div
        className="relative mt-6 grid text-xs text-muted"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
        aria-hidden="true"
      >
        {monthLabels.map(({ col, label }) => (
          <span key={col} style={{ gridColumnStart: col + 1 }}>
            {label}
          </span>
        ))}
      </div>

      <div
        ref={sceneRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative mt-2 flex justify-center overflow-x-auto py-4"
        style={{ perspective: 1400 }}
      >
        <motion.svg
          viewBox={viewBox}
          className="w-full max-w-3xl"
          style={{ rotateX: springX, rotateY: springY }}
          role="img"
          aria-label={`Isometric map of ${total} GitHub contributions over the last year`}
        >
          {cubes.map((c) => {
            const isHovered = hovered === c.key;
            return (
              <g
                key={c.key}
                className="cursor-default transition-[filter] duration-150"
                style={{ filter: isHovered ? "brightness(1.35)" : undefined }}
                onMouseEnter={(e) => {
                  setHovered(c.key);
                  const rect = sceneRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    count: c.day.count,
                    date: c.day.date,
                  });
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  setTooltip(null);
                }}
              >
                <polygon points={pts(c.front)} fill={FACES[c.lvl].front} />
                <polygon points={pts(c.right)} fill={FACES[c.lvl].right} />
                <polygon points={pts(c.top)} fill={FACES[c.lvl].top} />
              </g>
            );
          })}
        </motion.svg>

        {tooltip ? (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-surface px-2.5 py-1.5 text-xs shadow-xl shadow-black/40"
            style={{ left: tooltip.x, top: tooltip.y - 10 }}
          >
            <p className="font-semibold text-fg">
              {tooltip.count} {tooltip.count === 1 ? "contribution" : "contributions"}
            </p>
            <p className="text-muted">{dateFmt.format(new Date(tooltip.date))}</p>
          </div>
        ) : null}
      </div>

      <div className="relative mt-2 flex items-center gap-2 text-xs text-muted">
        <span>Less</span>
        {FACES.map((f, i) => (
          <span
            key={i}
            className="size-[11px] rounded-[2px] border border-white/5"
            style={{ backgroundColor: f.top }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
