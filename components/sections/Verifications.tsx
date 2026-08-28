import { Suspense } from "react";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { experience } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { getLeetcode } from "@/lib/stats";
import { formatRange } from "@/lib/dates";
import { cn } from "@/lib/utils";

/** The right-hand column of the Skills section: proof that the stack on the
 *  left has been used somewhere real. Every card points at something a stranger
 *  can check — a merged contribution, a solved-problem count read live from
 *  LeetCode, a certificate with an issuer's verification page.
 *
 *  Glass rather than a solid tile: translucent fill over the page with a
 *  hairline edge, so the column reads as raised without adding a third surface
 *  colour to the palette. */
const card =
  "rounded-2xl border border-white/[0.08] bg-white/5 p-5 backdrop-blur-md";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-md border border-white/[0.08] bg-white/5 px-2 py-1 text-[0.6875rem] font-medium text-muted">
      {children}
    </li>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-2 text-sm font-semibold text-fg">
      <BadgeCheck className="size-4 shrink-0 text-accent-2" aria-hidden="true" />
      {children}
    </h4>
  );
}

/** Open-source work, read straight off the experience data so it cannot drift
 *  from the Experience section. */
function OpenSourceCard() {
  const roles = experience.filter((r) => /apache|open source/i.test(r.company + r.role));
  if (!roles.length) return null;

  return (
    <article className={card}>
      <CardTitle>Open source contributor</CardTitle>
      <ul className="mt-3 space-y-3">
        {roles.map((r) => (
          <li key={r.company + r.start}>
            <p className="text-sm font-medium text-fg">{r.company}</p>
            <p className="mt-0.5 text-xs text-muted">
              <time dateTime={r.start}>{formatRange(r.start, r.end)}</time>
            </p>
          </li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {[...new Set(roles.flatMap((r) => r.stack))].slice(0, 5).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </ul>
    </article>
  );
}

const DSA_TARGET = 600;

/** Live from LeetCode. The bar is a ratio against a target the visitor can see,
 *  which is more use than a bare count. */
async function DsaCard() {
  const res = await getLeetcode();
  if (!res.ok) return null;
  const l = res.data;
  const pct = Math.min(100, Math.round((l.total / DSA_TARGET) * 100));

  return (
    <article className={card}>
      <div className="flex items-start justify-between gap-3">
        <CardTitle>DSA tracker</CardTitle>
        <a
          href={l.profileUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="LeetCode profile"
          className="shrink-0 rounded-md text-muted transition-colors hover:text-fg"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>

      <p className="mt-3 text-2xl font-bold tabular-nums text-fg">
        {l.total}
        <span className="text-base font-medium text-muted"> / {DSA_TARGET}</span>
      </p>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
        role="img"
        aria-label={`${l.total} of ${DSA_TARGET} problems solved`}
      >
        <div
          className="h-full rounded-full bg-accent-2"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        <Tag>{l.easy} easy</Tag>
        <Tag>{l.medium} medium</Tag>
        <Tag>{l.hard} hard</Tag>
      </ul>
    </article>
  );
}

function CertificationsCard() {
  if (!certifications.length) return null;
  return (
    <article className={card}>
      <CardTitle>Verified certificates</CardTitle>
      <ul className="mt-3 space-y-3">
        {certifications.map((c) => (
          <li key={c.verifyUrl + c.name}>
            <a
              href={c.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-fg underline-offset-4 hover:underline"
            >
              {c.name}
            </a>
            <p className="mt-0.5 text-xs text-muted">{c.issuer}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Skeleton for the one card that waits on a network call. Same box, same
 *  height, so the column does not reflow when the numbers land. */
function DsaSkeleton() {
  return (
    <article className={cn(card, "h-[168px]")} aria-hidden="true">
      <div className="h-4 w-32 rounded bg-white/10" />
      <div className="mt-4 h-7 w-24 rounded bg-white/10" />
      <div className="mt-3 h-1.5 rounded-full bg-white/10" />
    </article>
  );
}

export default function Verifications({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <OpenSourceCard />
      <Suspense fallback={<DsaSkeleton />}>
        <DsaCard />
      </Suspense>
      <CertificationsCard />
    </div>
  );
}
