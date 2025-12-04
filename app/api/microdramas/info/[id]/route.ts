import { NextResponse } from "next/server";
import { readMicrodramas } from "@/lib/microdramas";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const episodes = readMicrodramas();
  const ep = episodes.find((e: any) => e.id === params.id || e.videoId === params.id);

  if (!ep) {
    return NextResponse.json(
      { ok: false, error: "Episode not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, episode: ep });
}
