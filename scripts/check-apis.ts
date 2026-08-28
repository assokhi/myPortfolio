/**
 * Calls all five endpoints against a running server and validates each
 * response with the same schemas the routes use.
 *
 *   npm run dev            # in one terminal
 *   npm run check:apis     # in another
 *
 * This is the project's one automated check. Everything else in the portfolio
 * fails visually and cannot be asserted in a test.
 */
import { z } from "zod";
import {
  apiResult,
  githubStats,
  leetcodeStats,
  codeforcesStats,
  verifications,
  visitorCount,
} from "../lib/schemas.ts";

const BASE = process.env.CHECK_BASE_URL ?? "http://localhost:3000";

const endpoints = [
  { path: "/api/github", schema: githubStats },
  { path: "/api/leetcode", schema: leetcodeStats },
  { path: "/api/codeforces", schema: codeforcesStats },
  { path: "/api/verifications", schema: verifications },
  { path: "/api/visitors", schema: visitorCount },
] as const;

let failed = 0;

for (const { path, schema } of endpoints) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });

    // A degraded endpoint must still answer 200 — the page never sees an error.
    if (res.status !== 200) {
      console.error(`FAIL ${path} — expected HTTP 200, got ${res.status}`);
      failed++;
      continue;
    }

    const parsed = apiResult(schema as z.ZodType).safeParse(await res.json());
    if (!parsed.success) {
      console.error(`FAIL ${path} — response did not match its schema`);
      console.error(z.prettifyError(parsed.error));
      failed++;
      continue;
    }

    console.log(
      parsed.data.ok
        ? `PASS ${path} — live data`
        : `PASS ${path} — fallback (${parsed.data.error})`,
    );
  } catch (error) {
    console.error(
      `FAIL ${path} — ${error instanceof Error ? error.message : error}`,
    );
    failed++;
  }
}

console.log(failed === 0 ? "\nAll five endpoints OK." : `\n${failed} failed.`);
process.exit(failed === 0 ? 0 : 1);
