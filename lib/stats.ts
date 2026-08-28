import { profile } from "@/content/profile";
import { certifications } from "@/content/certifications";
import { fetchJson, fail, TIMEOUT_MS, type ApiResult } from "./fetch-json";
import {
  githubUserRaw,
  githubRepoRaw,
  githubGraphqlRaw,
  githubStats,
  leetcodeRaw,
  leetcodeStats,
  codeforcesRaw,
  codeforcesStats,
  verifications,
  type GithubStats,
  type LeetcodeStats,
  type CodeforcesStats,
  type Verifications,
} from "./schemas";

/** The data layer behind the four routes in app/api/.
 *
 *  The route handlers and the server components both call these functions
 *  directly. A server component fetching its own /api URL would mean an extra
 *  HTTP hop and an absolute-URL problem at build time, for no gain — the routes
 *  still exist as real endpoints so scripts/check-apis.ts can hit them. */

const HOUR = 3600;

/* ---------- GitHub ---------- */

const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }`;

type Calendar = {
  total: number;
  weeks: { date: string; count: number }[][];
};

/** The contribution calendar is only reachable through GraphQL, and only with a
 *  token. No token means no calendar — not a failed section. */
async function contributions(login: string): Promise<Calendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const raw = await fetchJson("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login } }),
      revalidate: HOUR,
    });
    const cal =
      githubGraphqlRaw.parse(raw).data.user.contributionsCollection
        .contributionCalendar;
    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
        })),
      ),
    };
  } catch {
    return null;
  }
}

/** Achievement badges (Pull Shark, Pair Extraordinaire, ...). GitHub exposes
 *  these nowhere in the REST or GraphQL API — the profile page is the only
 *  source, so this reads the HTML.
 *
 *  ponytail: regex over markup, ceiling is GitHub changing the badge class or
 *  the alt-text prefix. It fails to an empty list, never to a broken card;
 *  upgrade path is hardcoding the badges in content/ if it ever goes quiet. */
async function achievements(
  login: string,
): Promise<{ name: string; image: string }[]> {
  try {
    const res = await fetch(`https://github.com/${login}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: HOUR },
    });
    if (!res.ok) return [];
    const html = await res.text();

    const found = new Map<string, string>();
    const badge =
      /<img\s+src="([^"]+)"[^>]*alt="Achievement:\s*([^"]+)"[^>]*class="achievement-badge/g;
    // The same badges are rendered twice, once per responsive sidebar, so the
    // image URL is the dedupe key.
    for (const m of html.matchAll(badge)) found.set(m[1], m[2].trim());
    return [...found].map(([image, name]) => ({ name, image })).slice(0, 6);
  } catch {
    return [];
  }
}

export async function getGithub(): Promise<ApiResult<GithubStats>> {
  const login = profile.githubUsername;
  const token = process.env.GITHUB_TOKEN;
  // Without a token GitHub allows 60 req/hour per IP, and Vercel shares IPs.
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const [userRaw, reposRaw, calendar, badges] = await Promise.all([
      fetchJson(`https://api.github.com/users/${login}`, {
        headers,
        revalidate: HOUR,
      }),
      fetchJson(
        `https://api.github.com/users/${login}/repos?per_page=100&sort=updated`,
        { headers, revalidate: HOUR },
      ),
      contributions(login),
      achievements(login),
    ]);

    const user = githubUserRaw.parse(userRaw);
    const owned = githubRepoRaw.array().parse(reposRaw).filter((r) => !r.fork);

    return {
      ok: true,
      data: githubStats.parse({
        followers: user.followers,
        publicRepos: user.public_repos,
        totalStars: owned.reduce((n, r) => n + r.stargazers_count, 0),
        contributionsLastYear: calendar?.total ?? null,
        calendar: calendar?.weeks ?? [],
        profileUrl: user.html_url,
        achievements: badges,
        topRepos: owned
          .toSorted((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 4)
          .map((r) => ({
            name: r.name,
            url: r.html_url,
            description: r.description,
            stars: r.stargazers_count,
            language: r.language,
          })),
      }),
    };
  } catch (error) {
    return fail(error);
  }
}

/* ---------- LeetCode ---------- */

// LeetCode has no official public API. This is the internal GraphQL endpoint
// their own site uses — it can change or vanish without warning, which is why
// the response is validated and the widget always has a fallback.
const LEETCODE_QUERY = `
  query($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats { acSubmissionNum { difficulty count } }
    }
    userContestRanking(username: $username) { globalRanking }
  }`;

const pick = (rows: { difficulty: string; count: number }[], key: string) =>
  rows.find((r) => r.difficulty.toLowerCase() === key)?.count ?? 0;

export async function getLeetcode(): Promise<ApiResult<LeetcodeStats>> {
  const username = profile.leetcodeUsername;
  try {
    const raw = await fetchJson("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Without this header LeetCode intermittently refuses the request.
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query: LEETCODE_QUERY, variables: { username } }),
      revalidate: 6 * HOUR,
    });

    const parsed = leetcodeRaw.parse(raw);
    const user = parsed.data.matchedUser;
    if (!user) throw new Error(`LeetCode user "${username}" not found`);

    const rows = user.submitStats.acSubmissionNum;
    return {
      ok: true,
      data: leetcodeStats.parse({
        username: user.username,
        total: pick(rows, "all"),
        easy: pick(rows, "easy"),
        medium: pick(rows, "medium"),
        hard: pick(rows, "hard"),
        globalRanking: parsed.data.userContestRanking?.globalRanking ?? null,
        profileUrl: `https://leetcode.com/u/${user.username}/`,
      }),
    };
  } catch (error) {
    return fail(error);
  }
}

/* ---------- Codeforces ---------- */

export async function getCodeforces(): Promise<ApiResult<CodeforcesStats>> {
  const handle = profile.codeforcesHandle;
  try {
    const raw = await fetchJson(
      `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`,
      { revalidate: 6 * HOUR },
    );

    // A Codeforces failure arrives as a normal-looking 200 with
    // status: "FAILED". The literal("OK") in the schema is what catches it.
    const user = codeforcesRaw.parse(raw).result[0];

    return {
      ok: true,
      data: codeforcesStats.parse({
        handle: user.handle,
        rating: user.rating ?? null,
        maxRating: user.maxRating ?? null,
        rank: user.rank ?? null,
        maxRank: user.maxRank ?? null,
        profileUrl: `https://codeforces.com/profile/${user.handle}`,
      }),
    };
  } catch (error) {
    return fail(error);
  }
}

/* ---------- Verifications (local file) ---------- */

export async function getVerifications(): Promise<ApiResult<Verifications>> {
  try {
    return { ok: true, data: verifications.parse({ items: certifications }) };
  } catch (error) {
    return fail(error);
  }
}
