import { NextResponse } from "next/server";
import { readStreams } from "@/lib/streams";

export async function GET() {
  const streams = readStreams();
  return NextResponse.json({ streams });
}
