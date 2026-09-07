import { NextResponse } from "next/server";
import { getLeetcode } from "@/lib/stats";

export const runtime = "nodejs";
// Static export: fetched once at build time. See app/api/github/route.ts.
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(await getLeetcode());
}
