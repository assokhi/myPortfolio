import { NextResponse } from "next/server";
import { getGithub } from "@/lib/stats";

// Node, not Edge: this route reads a secret token.
export const runtime = "nodejs";
export const revalidate = 3600; // 1 hour

export async function GET() {
  // getGithub() never throws: on failure it returns { ok: false, stale: true },
  // so the visitor never sees an error page. See prd/03-api.md.
  return NextResponse.json(await getGithub());
}
