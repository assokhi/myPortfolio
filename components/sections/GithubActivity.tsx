import { cn, sectionLabel } from "@/lib/utils";
import ContributionCalendar from "@/components/sections/ContributionCalendar";
import {
  GithubCard,
  LeetcodeCard,
  CodeforcesCard,
} from "@/components/sections/LiveStats";

/** Proof that updates itself.
 *
 *  The three cards are baked at build time (see lib/stats.ts and the
 *  force-static routes under app/api), so this whole section costs the visitor
 *  zero runtime requests. The skyline below them is the one exception: it is
 *  lazy, below the fold, and served from GitHub's own CDN, so it refreshes
 *  daily without a redeploy.
 *
 *  Each card renders its own fallback when the API is unreachable — nothing
 *  here can throw a section off the page. */
export default async function GithubActivity({ id = "activity" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="reveal mx-auto w-full max-w-4xl px-5 py-14"
    >
      <h2 id={`${id}-heading`} className={cn(sectionLabel, "mb-6 block")}>
        Activity
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {/* tone="dark" rather than StatCard's default inverted tile: three
            white slabs in a row dominated a page whose whole backdrop is grid
            paper. Same component, same contrast rules, quieter treatment. */}
        <GithubCard compact tone="dark" />
        <LeetcodeCard tone="dark" />
        <CodeforcesCard tone="dark" />
      </div>

      <ContributionCalendar />
    </section>
  );
}
