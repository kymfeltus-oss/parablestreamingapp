import { NextResponse } from "next/server";
import { readMicrodramas } from "../../../../lib/microdramas"; // FIXED PATH

export async function GET() {
  const episodes = readMicrodramas();
  return NextResponse.json({ ok: true, episodes });
}
