import { z } from "zod";

/** Validation rules for everything that comes from outside this repo.
 *  Data from another company's server is untrusted input — see prd/03-api.md. */

/* ---------- GitHub ---------- */

export const githubUserRaw = z.object({
  followers: z.number(),
  public_repos: z.number(),
  html_url: z.string(),
  name: z.string().nullable().optional(),
});

export const githubRepoRaw = z.object({
  name: z.string(),
  html_url: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  fork: z.boolean(),
});

export const githubGraphqlRaw = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          totalContributions: z.number(),
          weeks: z.array(
            z.object({
              contributionDays: z.array(
                z.object({ date: z.string(), contributionCount: z.number() }),
              ),
            }),
          ),
        }),
      }),
    }),
  }),
});

export const githubStats = z.object({
  followers: z.number(),
  publicRepos: z.number(),
  totalStars: z.number(),
  contributionsLastYear: z.number().nullable(),
  profileUrl: z.string(),
  topRepos: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      description: z.string().nullable(),
      stars: z.number(),
      language: z.string().nullable(),
    }),
  ),
  achievements: z.array(z.object({ name: z.string(), image: z.string() })),
  /** One entry per week, each a run of days. Empty without a GITHUB_TOKEN —
   *  the calendar is GraphQL-only and GraphQL is token-only. */
  calendar: z.array(
    z.array(z.object({ date: z.string(), count: z.number() })),
  ),
});
export type GithubStats = z.infer<typeof githubStats>;

/* ---------- LeetCode ---------- */

const leetcodeCount = z.object({ difficulty: z.string(), count: z.number() });

export const leetcodeRaw = z.object({
  data: z.object({
    matchedUser: z
      .object({
        username: z.string(),
        submitStats: z.object({
          acSubmissionNum: z.array(leetcodeCount),
        }),
      })
      .nullable(),
    userContestRanking: z
      .object({ globalRanking: z.number().nullable() })
      .nullable()
      .optional(),
  }),
});

export const leetcodeStats = z.object({
  username: z.string(),
  total: z.number(),
  easy: z.number(),
  medium: z.number(),
  hard: z.number(),
  globalRanking: z.number().nullable(),
  profileUrl: z.string(),
});
export type LeetcodeStats = z.infer<typeof leetcodeStats>;

/* ---------- Codeforces ---------- */

// Codeforces answers failures with a normal-looking 200. Check `status` first.
export const codeforcesRaw = z.object({
  status: z.literal("OK"),
  result: z
    .array(
      z.object({
        handle: z.string(),
        rating: z.number().optional(),
        maxRating: z.number().optional(),
        rank: z.string().optional(),
        maxRank: z.string().optional(),
      }),
    )
    .nonempty(),
});

export const codeforcesStats = z.object({
  handle: z.string(),
  rating: z.number().nullable(),
  maxRating: z.number().nullable(),
  rank: z.string().nullable(),
  maxRank: z.string().nullable(),
  profileUrl: z.string(),
});
export type CodeforcesStats = z.infer<typeof codeforcesStats>;

/* ---------- Verifications (local file) ---------- */

export const verification = z.object({
  name: z.string(),
  issuer: z.string(),
  issuedOn: z.string(),
  credentialId: z.string().optional(),
  verifyUrl: z.string(),
});

export const verifications = z.object({ items: z.array(verification) });
export type Verifications = z.infer<typeof verifications>;

/* ---------- Visitor counter (Upstash Redis) ---------- */

export const visitorCount = z.object({ count: z.number() });
export type VisitorCount = z.infer<typeof visitorCount>;

/** The envelope every route returns. */
export const apiResult = <T extends z.ZodType>(data: T) =>
  z.union([
    z.object({ ok: z.literal(true), data, stale: z.literal(false).optional() }),
    z.object({ ok: z.literal(false), error: z.string(), stale: z.literal(true) }),
  ]);
