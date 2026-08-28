import { getGithub } from "@/lib/stats";
import { ContributionActivity3D } from "./contribution-activity-3d";
import { LanguageDistribution } from "./language-distribution";
import { GithubActivity } from "./github-activity";

/** A year of GitHub activity, broken into three independent cards instead of
 *  one crowded visualization: the heatmap carries the most weight, the
 *  language and activity breakdowns sit underneath it as equal, simpler
 *  supporting cards. */
export default async function ContributionsSection() {
  const res = await getGithub();
  // No token, no calendar: GitHub serves it through GraphQL only. Rendering
  // nothing beats rendering an empty grid that reads as a year off.
  if (!res.ok || res.data.calendar.length === 0) return null;

  const { calendar, contributionsLastYear, languages, activity } = res.data;

  return (
    <section aria-labelledby="contributions-heading" className="mt-16">
      <h3
        id="contributions-heading"
        className="text-sm font-semibold uppercase tracking-[0.1em] text-muted"
      >
        Contributions
      </h3>
      <p className="mt-1 font-serif text-muted">
        A snapshot of my development activity and open-source work.
      </p>

      <div className="mt-6">
        <ContributionActivity3D weeks={calendar} total={contributionsLastYear ?? 0} />
      </div>

      {(languages.length > 0 || activity) && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {languages.length > 0 ? <LanguageDistribution languages={languages} /> : null}
          {activity ? <GithubActivity activity={activity} /> : null}
        </div>
      )}
    </section>
  );
}
