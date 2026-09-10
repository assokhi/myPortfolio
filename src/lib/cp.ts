export type LeetCodeStats = { solved: number; rating: number | null };
export type CodeforcesStats = { solved: number; rating: number | null; rank: string | null };

// revalidate hourly — these are third-party/unofficial APIs, no need to hit them on every request
const REVALIDATE_SECONDS = 3600;

export async function getLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query u($username: String!) {
          matchedUser(username: $username) {
            submitStatsGlobal { acSubmissionNum { difficulty count } }
          }
          userContestRanking(username: $username) { rating }
        }`,
        variables: { username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const solved = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(
      (entry: { difficulty: string; count: number }) => entry.difficulty === "All"
    )?.count;
    if (typeof solved !== "number") return null;
    const rating = json?.data?.userContestRanking?.rating ?? null;
    return { solved, rating: typeof rating === "number" ? Math.round(rating) : null };
  } catch {
    return null;
  }
}

export async function getCodeforcesStats(handle: string): Promise<CodeforcesStats | null> {
  try {
    const [infoRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
    ]);
    if (!infoRes.ok || !statusRes.ok) return null;

    const infoJson = await infoRes.json();
    if (infoJson.status !== "OK") return null;
    const user = infoJson.result?.[0];

    const statusJson = await statusRes.json();
    const solvedSet = new Set<string>();
    if (statusJson.status === "OK") {
      for (const sub of statusJson.result) {
        if (sub.verdict === "OK") solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    }

    return {
      solved: solvedSet.size,
      rating: typeof user?.rating === "number" ? user.rating : null,
      rank: user?.rank ?? null,
    };
  } catch {
    return null;
  }
}
