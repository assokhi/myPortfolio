import { NextResponse } from "next/server";
import { getCodeforces } from "@/lib/stats";

export const runtime = "nodejs";
export const revalidate = 21600; // 6 hours

export async function GET() {
  return NextResponse.json(await getCodeforces());
}
