import { cn, heading2, pageShell } from "@/lib/utils";
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
      className={cn("reveal", pageShell)}
    >
      <h2 id={`${id}-heading`} className={cn(heading2, "mb-8 block")}>
        Activity
      </h2>

      <div className="grid gap-8 sm:grid-cols-3">
        {/* tone="dark" rather than StatCard's default inverted tile: three
            white slabs in a row read as three loud tiles against the
            reference's flat page. Same component, same contrast rules,
            quieter treatment. */}
        <GithubCard compact tone="dark" />
        <LeetcodeCard tone="dark" />
        <CodeforcesCard tone="dark" />
      </div>

      <ContributionCalendar />
    </section>
  );
}
