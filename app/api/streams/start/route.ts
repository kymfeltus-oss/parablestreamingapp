import { NextResponse } from "next/server";
import { readStreams, writeStreams } from "@/lib/streams";

export async function POST(req: Request) {
  const { creatorId, title, thumbnail } = await req.json();

  const streams = readStreams();

  const newStream = {
    id: Date.now().toString(),
    creatorId,
    title,
    thumbnail,
    isLive: true,
    viewers: Math.floor(Math.random() * 1000) + 100,
    startedAt: new Date().toISOString()
  };

  writeStreams([...streams, newStream]);

  return NextResponse.json({ ok: true, stream: newStream });
}
