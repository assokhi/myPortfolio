/** One helper for every outbound call: timeout, caching, and errors that never
 *  reach the visitor. See prd/03-api.md. */

export const TIMEOUT_MS = 5_000;

export class FetchJsonError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "FetchJsonError";
  }
}

export async function fetchJson<T = unknown>(
  url: string,
  init: RequestInit & { revalidate?: number } = {},
): Promise<T> {
  const { revalidate, ...rest } = init;
  // A hang is worse than a failure: a failure shows the fallback immediately.
  const timeout = AbortSignal.timeout(TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      ...rest,
      signal: timeout,
      headers: { Accept: "application/json", ...rest.headers },
      ...(revalidate === undefined ? {} : { next: { revalidate } }),
    });
  } catch (cause) {
    throw new FetchJsonError(`Request to ${url} failed or timed out`, cause);
  }

  if (!res.ok) {
    throw new FetchJsonError(`Request to ${url} returned ${res.status}`);
  }

  try {
    return (await res.json()) as T;
  } catch (cause) {
    throw new FetchJsonError(`Response from ${url} was not JSON`, cause);
  }
}

/** Every route returns this shape, success or failure. The page never sees an
 *  error — at worst it sees `ok: false` and renders its fallback. */
export type ApiResult<T> =
  | { ok: true; data: T; stale?: false }
  | { ok: false; error: string; stale: true };

export function fail(error: unknown): ApiResult<never> {
  return {
    ok: false,
    error: error instanceof Error ? error.message : "Unknown error",
    stale: true,
  };
}
