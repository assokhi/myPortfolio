import * as simpleIcons from "simple-icons";
import {
  Database,
  Network,
  Orbit,
  FlaskConical,
  Workflow,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Brand marks from simple-icons (CC0-1.0 — public domain, no attribution
 *  required, which is why it passes the licence rule in CLAUDE.md).
 *
 *  These render on the server, so not one byte of the 3,453-icon package
 *  reaches the browser — only the single <path> for each icon actually used. */

type Icon = { title: string; hex: string; path: string };

const byTitle = new Map<string, Icon>();
for (const value of Object.values(simpleIcons)) {
  const icon = value as Partial<Icon>;
  if (icon?.title && icon.path) {
    byTitle.set(icon.title.toLowerCase(), icon as Icon);
  }
}

/** Names in content/skills.ts that don't match a brand title exactly. */
const ALIASES: Record<string, string> = {
  html: "html5",
  "github actions": "githubactions",
  postgres: "postgresql",
  // Java itself has no mark in the set (Oracle trademark); OpenJDK is the
  // standard stand-in. SeaTunnel has none either, so it borrows the Apache
  // feather it ships under.
  java: "openjdk",
  "apache seatunnel": "apache",
  seatunnel: "apache",
  junit: "junit5",
};

/** Things with no brand mark anywhere — they are practices or standards, not
 *  products. A generic Lucide glyph keeps the grid uniform; the real name is
 *  still the accessible label and still text in the DOM. */
const GENERIC: Record<string, LucideIcon> = {
  sql: Database,
  rest: Network,
  "rest apis": Network,
  "rest api": Network,
  motion: Orbit,
  "e2e testing": FlaskConical,
  e2e: FlaskConical,
  "ci/cd": Workflow,
  cicd: Workflow,
  cli: Terminal,
};

function resolve(name: string): Icon | null {
  const key = name.toLowerCase();
  return byTitle.get(ALIASES[key] ?? key) ?? byTitle.get(key) ?? null;
}

/** Brand colours are chosen for white backgrounds. On this page a dark mark
 *  disappears: Next.js, Vercel and Express are pure black, and CSS's
 *  rebeccapurple or a dark green sit barely above the background.
 *
 *  Near-black falls back to the foreground colour — there is no brand hue left
 *  to keep. Everything else merely dark keeps its hue and gets mixed toward
 *  white until it reads. */
function readableColor(hex: string): string {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const channel = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const luminance =
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  if (luminance < 0.02) return "var(--color-fg)";
  if (luminance < 0.16) return `color-mix(in srgb, #${hex} 55%, white)`;
  return `#${hex}`;
}

/** The brand's own colour, when it has one. Used to tint intro panels. */
export function brandHex(name: string): string | null {
  const icon = resolve(name);
  return icon ? `#${icon.hex}` : null;
}

/** Short label for a brand with no icon: initials for multi-word names,
 *  otherwise the name itself when it is short enough to read. */
function monogram(name: string): string {
  // Keep the separators that carry meaning — "CI/CD" and "Node.js" read wrong
  // once you strip them.
  const clean = name.replace(/[^A-Za-z0-9/+.# ]/g, "").trim();
  const [first, ...rest] = clean.split(/\s+/);
  // A short leading word is almost always the real name: "REST APIs" -> REST,
  // "E2E Testing" -> E2E. Initials are a last resort, not the default.
  if (first && first.length <= 5) return first;
  if (rest.length) {
    return [first, ...rest].map((w) => w[0]).join("").toUpperCase();
  }
  return clean.length <= 7 ? clean : clean.slice(0, 6);
}

/** Just the mark. Falls back to a monogram when a brand has no icon
 *  (SQL, REST, Motion, SeaTunnel, and any small company). */
export function BrandMark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const icon = resolve(name);

  if (!icon) {
    const Generic = GENERIC[name.toLowerCase()];
    if (Generic) {
      return (
        <Generic
          role="img"
          aria-label={name}
          className={cn("text-muted", className)}
          strokeWidth={1.75}
        />
      );
    }
    return (
      <span
        role="img"
        aria-label={name}
        className={cn(
          "px-1 text-center font-mono text-[0.6rem] font-semibold leading-tight text-muted",
          className,
        )}
      >
        {monogram(name)}
      </span>
    );
  }
  return (
    <svg
      role="img"
      aria-label={name}
      viewBox="0 0 24 24"
      className={className}
      fill={readableColor(icon.hex)}
    >
      <path d={icon.path} />
    </svg>
  );
}

/** One tech: its brand mark, or a monogram when no mark exists. The name is
 *  real text in the DOM either way — icons alone are invisible to the ATS
 *  scrapers this site has to survive. */
export default function TechIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <li className={cn("group/tech relative flex justify-center", className)}>
      {/* A real surface, not a hairline: the tile needs to read as an object
          against the page. It scales on hover because hovering it does
          something — the name appears above it. The global
          prefers-reduced-motion rule zeroes the duration. */}
      <div className="flex size-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/5 transition-all duration-200 group-hover/tech:scale-105 group-hover/tech:border-white/20 group-hover/tech:shadow-lg group-hover/tech:shadow-black/40 sm:size-14">
        <BrandMark name={name} className="size-6 sm:size-7" />
      </div>

      {/* Sits ABOVE the tile: below would fall outside the bento cell, which
          is overflow-hidden, and get clipped. Both call sites reserve the
          headroom this needs. Real text, so scrapers still read the skill
          list; aria-hidden stops a screen reader announcing it twice. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-xs font-medium text-fg opacity-0 shadow-lg transition-opacity duration-150 group-hover/tech:opacity-100"
      >
        {name}
      </span>
    </li>
  );
}
