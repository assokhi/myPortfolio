import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn, cardSurface } from "@/lib/utils";

/** Bento tile for the live-stat widgets.
 *
 *  Three states — loading, success, fallback — at one height, so nothing
 *  shifts when the numbers land (CLS). Layout is fixed: pill label and a
 *  corner link on top, the headline number in the middle, a caption and the
 *  live/offline badge on the floor. Every tile reads the same way at a glance,
 *  which is the whole point of the grid.
 *
 *  A tone is a card FILL, never a text colour: type on the tinted tiles is
 *  --color-bg, which clears 12:1. */
const TONES = {
  /** The default. A white tile in a dark grid is the loudest thing on the page
   *  without adding a colour to the palette; ink is --color-bg, 19:1. */
  white: {
    card: "rounded-3xl border border-white bg-white text-bg",
    pill: "border-bg bg-bg text-white",
    link: "border-bg bg-bg text-white hover:bg-bg/80",
    chip: "bg-bg text-white",
  },
  dark: {
    card: cn(cardSurface, "rounded-3xl"),
    pill: "border-border text-muted",
    link: "border-bg bg-bg text-fg hover:border-fg/40",
    chip: "bg-fg/10 text-fg",
  },
} as const;

export type Tone = keyof typeof TONES;

export function StatCard({
  title,
  href,
  stale,
  tone = "white",
  footerLeft,
  className,
  children,
}: {
  title: string;
  href?: string;
  stale?: boolean;
  /** Sits on the footer line, left of the status chip. The GitHub card puts its
   *  achievement badges here so the chip lines up with them instead of hanging
   *  below. */
  footerLeft?: ReactNode;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  const t = TONES[tone];

  return (
    <article
      className={cn(
        "flex min-h-32 flex-col px-5 pb-3 pt-5 transition-colors duration-200",
        t.card,
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h4
          className={cn(
            "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]",
            t.pill,
          )}
        >
          {title}
        </h4>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${title} profile`}
            className={cn(
              "inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
              t.link,
            )}
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <div className="mt-4 flex-1">{children}</div>

      {/* Quiet status, never a stack trace: a recruiter who sees an error page
          concludes you cannot ship reliable software. Same capsule as the
          syncing chip — one shape for every state of the card. */}
      {/* Footer line: anything the card wants on the left, the status chip on
          the right, centred against each other. */}
      <div className="-mt-[10px] flex items-center justify-between gap-3 pt-3">
        {footerLeft ?? <span />}
        <StatusChip stale={stale} className={t.chip} />
      </div>
    </article>
  );
}

/** Whether this card's API answered. "Live"/"Offline" read as a claim about the
 *  platform, or about whether the person is at their desk — neither is what the
 *  chip means. The `title` spells out the rest; colour is never the only
 *  carrier, the word next to the dot says it too. */
function StatusChip({ stale, className }: { stale?: boolean; className: string }) {
  return (
    <span
      title={
        stale
          ? "This platform's API did not answer on the last refresh."
          : "Fetched from this platform's API on the last refresh."
      }
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full",
          stale ? "bg-current opacity-40" : "animate-pulse bg-emerald-500",
        )}
      />
      {stale ? "Disconnected" : "Connected"}
    </span>
  );
}

/** The one number the card exists to show. Tight tracking and tabular figures
 *  so it reads as a display figure, not as body text that grew. */
export function HeroStat({
  value,
  label,
}: {
  value: ReactNode;
  label: string;
}) {
  return (
    <div>
      <p className="font-mono text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-[0.85] tracking-[-0.05em] tabular-nums">
        {value}
      </p>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.08em] opacity-80">
        {label}
      </p>
    </div>
  );
}

/** The supporting figures, on one line instead of a grid of stacked pairs.
 *  Four narrow cards in a row have no width for a 3-column dl — the labels
 *  wrap, the card grows a head taller, and the number stops being the thing
 *  you see first.
 *
 *  `flex-row-reverse` is what puts the value before its label without
 *  reversing the DOM: a screen reader still reads "public repos, 25". */
export function StatRow({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex flex-row-reverse items-baseline gap-1"
        >
          <dt className="opacity-75">{it.label}</dt>
          <dd className="font-semibold tabular-nums">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The empty state. Not an error page and not a dash: a faded ghost of the
 *  figure that belongs here, plus a plain sentence. The card keeps its shape,
 *  so a row of four does not lurch when one platform is down. */
export function StatUnavailable({ what }: { what: string }) {
  return (
    <div>
      <div aria-hidden="true" className="space-y-2">
        <div className="h-9 w-24 rounded-lg bg-current opacity-[0.08]" />
        <div className="h-3 w-16 rounded bg-current opacity-[0.08]" />
      </div>
      <p className="mt-4 max-w-[26ch] text-xs leading-relaxed opacity-75">
        {what} will show here as soon as the API answers.
      </p>
    </div>
  );
}

/** Shown while the data streams in. Same height and same span as the real
 *  card, so the grid does not reflow when it arrives. */
export function StatCardSkeleton({
  title,
  tone = "white",
  className,
}: {
  title: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <StatCard title={title} tone={tone} className={className}>
      {/* Three pulsing dots and a word, on the card's own ink so it reads on the
          dark tile and on the lime/mint ones alike. The global
          prefers-reduced-motion rule freezes the pulse; the chip still says
          what is happening. */}
      <div
        className="flex h-full items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex items-center gap-3 rounded-full bg-current/10 px-5 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 animate-pulse rounded-full bg-current opacity-40" />
            <span className="size-2 animate-pulse rounded-full bg-current opacity-40 [animation-delay:200ms]" />
            <span className="size-2 animate-pulse rounded-full bg-current opacity-40 [animation-delay:400ms]" />
          </span>
          <span className="text-sm font-semibold">Syncing…</span>
          <span className="sr-only">{title} stats</span>
        </span>
      </div>
    </StatCard>
  );
}
