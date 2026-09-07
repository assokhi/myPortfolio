import { NextResponse } from "next/server";
import { getGithub } from "@/lib/stats";

// Node, not Edge: this route reads a secret token.
export const runtime = "nodejs";
// Static export: fetched once at build time and written to out/api/github.
// Freshness comes from rebuilding, not from ISR.
export const dynamic = "force-static";

export async function GET() {
  // getGithub() never throws: on failure it returns { ok: false, stale: true },
  // so the visitor never sees an error page. See prd/03-api.md.
  return NextResponse.json(await getGithub());
}
