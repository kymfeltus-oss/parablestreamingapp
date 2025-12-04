import { NextResponse } from "next/server";
import { readStreams } from "@/lib/streams";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const streams = readStreams();
  const stream = streams.find((s: any) => s.id === params.id);

  if (!stream) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, stream });
}
