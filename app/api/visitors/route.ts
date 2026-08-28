import { NextResponse } from "next/server";
import { getVisitorCount, incrementVisitorCount } from "@/lib/visitors";

// Node, not Edge: reads the Upstash secret token.
export const runtime = "nodejs";
// Every request must hit Redis fresh — never cache a visitor count.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getVisitorCount());
}

export async function POST() {
  return NextResponse.json(await incrementVisitorCount());
}
