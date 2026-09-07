import { NextResponse } from "next/server";
import { getVerifications } from "@/lib/stats";

export const runtime = "nodejs";
export const dynamic = "force-static";

// ponytail: pass-through — the page imports lib/stats directly and skips this
// hop. The route exists so the data shape matches the other three and so
// scripts/check-apis.ts can validate it. Collapse it if it never gains a real
// external check.
export async function GET() {
  return NextResponse.json(await getVerifications());
}
