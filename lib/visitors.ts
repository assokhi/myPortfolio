import { fetchJson, fail, type ApiResult } from "./fetch-json";

/** Upstash Redis over its REST API — a plain fetch, no client library needed.
 *  One key, incremented once per browser (see components/sections/VisitorCounter.tsx
 *  for the localStorage dedupe) and read on every other visit. */
const KEY = "portfolio_visitor_count";

async function call(command: "get" | "incr"): Promise<ApiResult<{ count: number }>> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return fail(new Error("UPSTASH_REDIS_REST_URL/TOKEN not set"));
  }
  try {
    const { result } = await fetchJson<{ result: number | string | null }>(
      `${url}/${command}/${KEY}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return { ok: true, data: { count: Number(result ?? 0) } };
  } catch (error) {
    return fail(error);
  }
}

export const getVisitorCount = () => call("get");
export const incrementVisitorCount = () => call("incr");
