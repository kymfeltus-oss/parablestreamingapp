import { NextResponse } from "next/server";
// Correct relative path:
import { readMicrodramas } from "../../../../../lib/microdramas";

export async function GET() {
  const episodes = readMicrodramas();
  return NextResponse.json({ ok: true, episodes });
}
