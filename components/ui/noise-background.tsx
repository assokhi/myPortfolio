import { cn } from "@/lib/utils";

/* Aceternity "Hero section with noise background", rebuilt from the live demo.
 * Two changes, both for reasons this repo already committed to:
 *
 * 1. The demo tiles a 732 KB /noise.webp at 5% opacity. On the hero — the
 *    element CLAUDE.md names as the usual LCP offender — that is a lot of
 *    bytes for a texture nobody consciously sees. An inline SVG feTurbulence
 *    is the same fractal grain in ~400 bytes and costs zero requests.
 * 2. The demo renders 18 sibling <div>s to draw the vertical bars. One
 *    repeating-linear-gradient draws the identical pattern in one element and
 *    fills any viewport width without counting children.
 *
 * Colours come from this repo's tokens, which are near-identical to the
 * neutral-900/950/800 the demo uses.
 */

// feTurbulence grain. stitchTiles keeps the tile seams invisible when it repeats.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

// 80px band: a left-to-right wash, then a 2px divider — the demo's bar, tiled.
const BARS =
  "repeating-linear-gradient(to right, var(--color-surface) 0px, var(--color-bg) 78px, var(--color-border) 78px, var(--color-border) 80px)";

export default function NoiseBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,white_0%,white_30%,transparent_70%)]",
        className,
      )}
    >
      <div className="absolute inset-0" style={{ background: BARS }} />
      <div
        className="absolute inset-0 scale-[1.2] opacity-[0.05] [mask-image:radial-gradient(#fff,transparent,75%)]"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px" }}
      />
    </div>
  );
}
