import { NextResponse } from "next/server";
import { readStreams, writeStreams } from "@/lib/streams";

export async function POST(req: Request) {
  const { creatorId } = await req.json();

  const streams = readStreams();
  const updated = streams.filter((s: any) => s.creatorId !== creatorId);

  writeStreams(updated);

  return NextResponse.json({ ok: true });
}
