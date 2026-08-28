import { getGithub, getLeetcode, getCodeforces, getVerifications } from "@/lib/stats";
import { StatCard, HeroStat, StatRow, StatUnavailable } from "./StatCard";
import CountUp from "@/components/ui/count-up";
import { formatDate } from "@/lib/dates";
import { profile } from "@/content/profile";
import { certifications } from "@/content/certifications";

/* Profile links, built from the same usernames the fetchers use. The card links
 * out even when its API is down — an offline tile that cannot be clicked
 * through is a dead end. */
const PROFILE_URL = {
  github: `https://github.com/${profile.githubUsername}`,
  leetcode: `https://leetcode.com/u/${profile.leetcodeUsername}/`,
  codeforces: `https://codeforces.com/profile/${profile.codeforcesHandle}`,
} as const;

/** Third-party evidence, not self-reported claims. Every card renders in three
 *  states — loading, success, fallback — and all three are the same size.
 *
 *  Each tile leads with ONE number, big. The supporting figures sit under it in
 *  a small row: a recruiter takes the headline in at a glance and only reads
 *  the rest if the headline earned it.
 *
 *  `compact` is the home-page bento: headline numbers only, with the detail
 *  (top repos, the full certificate list, the easy/medium/hard split) held back
 *  for /experience. */

const nf = new Intl.NumberFormat("en-GB");

type CardProps = { compact?: boolean; className?: string };

export async function GithubCard({ compact, className }: CardProps = {}) {
  const res = await getGithub();
  if (!res.ok) {
    return (
      <StatCard title="GitHub" href={PROFILE_URL.github} stale className={className}>
        <StatUnavailable what="Repo and commit counts" />
      </StatCard>
    );
  }
  const g = res.data;
  return (
    <StatCard
      title="GitHub"
      href={g.profileUrl}
      className={className}
      footerLeft={
        /* Badges ride the footer line so the chip centres against them rather
           than hanging below. Plain <img>: 64px assets straight off GitHub's
           CDN, already optimised, and routing them through next/image would
           mean a remotePatterns entry for no saved bytes. */
        g.achievements.length ? (
          <ul className="flex flex-wrap items-center gap-1.5">
            {g.achievements.map((a) => (
              <li
                key={a.image}
                className="inline-flex size-14 items-center justify-center rounded-full bg-bg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.image}
                  alt={a.name}
                  title={a.name}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="size-11"
                />
              </li>
            ))}
          </ul>
        ) : null
      }
    >
      {/* Headline is a year of commits where the token allows it, repos where
          it does not. Star count is not the metric — an unstarred repo is not
          an unwritten one. */}
      {g.contributionsLastYear !== null ? (
        <HeroStat
          value={<CountUp value={g.contributionsLastYear} />}
          label="Commits (last year)"
        />
      ) : (
        <HeroStat
          value={<CountUp value={g.publicRepos} />}
          label="Public repos"
        />
      )}
      <div className="mt-3">
        <StatRow
          items={[
            ...(g.contributionsLastYear !== null
              ? [{ label: "repos", value: nf.format(g.publicRepos) }]
              : []),
            { label: "followers", value: nf.format(g.followers) },
          ]}
        />
      </div>

      {!compact && g.topRepos.length ? (
        <ul className="mt-4 space-y-1 text-sm">
          {g.topRepos.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline-offset-4 hover:underline"
              >
                {r.name}
              </a>
              <span className="opacity-70"> · ★ {nf.format(r.stars)}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </StatCard>
  );
}

export async function LeetcodeCard({ className }: CardProps = {}) {
  const res = await getLeetcode();
  if (!res.ok) {
    return (
      <StatCard title="LeetCode" href={PROFILE_URL.leetcode} stale className={className}>
        <StatUnavailable what="Solved-problem counts" />
      </StatCard>
    );
  }
  const l = res.data;
  return (
    <StatCard
      title="LeetCode"
      href={l.profileUrl}
      className={className}
    >
      <HeroStat value={<CountUp value={l.total} />} label="Problems solved" />
      <div className="mt-3">
        <StatRow
          items={[
            { label: "easy", value: l.easy },
            { label: "medium", value: l.medium },
            { label: "hard", value: l.hard },
          ]}
        />
      </div>
    </StatCard>
  );
}

export async function CodeforcesCard({ className }: CardProps = {}) {
  const res = await getCodeforces();
  if (!res.ok) {
    return (
      <StatCard title="Codeforces" href={PROFILE_URL.codeforces} stale className={className}>
        <StatUnavailable what="Contest rating" />
      </StatCard>
    );
  }
  const c = res.data;
  return (
    <StatCard
      title="Codeforces"
      href={c.profileUrl}
      className={className}
    >
      <HeroStat
        value={c.rating === null ? "—" : <CountUp value={c.rating} />}
        label="Contest rating"
      />
      <div className="mt-3">
        <StatRow
          items={[
            {
              label: "peak",
              value: c.maxRating === null ? "—" : nf.format(c.maxRating),
            },
            ...(c.rank ? [{ label: "rank", value: c.rank }] : []),
          ]}
        />
      </div>
    </StatCard>
  );
}

export async function CertificationsCard({ compact, className }: CardProps = {}) {
  const res = await getVerifications();
  if (!res.ok || res.data.items.length === 0) {
    return (
      <StatCard title="Certifications" href={certifications[0]?.verifyUrl} stale={!res.ok} className={className}>
        <StatUnavailable what="Verified certificates" />
      </StatCard>
    );
  }
  const items = res.data.items;
  return (
    <StatCard
      title="Certifications"
      href={items[0]?.verifyUrl}
      className={className}
    >
      <HeroStat value={<CountUp value={items.length} />} label="Verified" />
      {/* Three at most, whatever the page: a fourth line makes this tile a head
          taller than the three beside it and the row goes lopsided. The rest
          are one click away through the card's own link. */}
      <ul className="mt-4 space-y-3">
        {items.slice(0, 3).map((c) => (
          <li key={c.verifyUrl + c.name} className="text-xs leading-relaxed">
            <a
              href={c.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline-offset-4 hover:underline"
            >
              {c.name}
            </a>
            <span className="block opacity-75">
              {c.issuer}
              {compact ? "" : ` · ${formatDate(c.issuedOn)}`}
            </span>
          </li>
        ))}
        {items.length > 3 ? (
          <li className="text-xs opacity-75">
            +{items.length - 3} more
          </li>
        ) : null}
      </ul>
    </StatCard>
  );
}
