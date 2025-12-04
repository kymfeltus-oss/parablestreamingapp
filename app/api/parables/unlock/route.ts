import { NextResponse } from "next/server";
import { isUnlocked, addUnlock } from "@/lib/episodeUnlocks";
import { readMicrodramas } from "@/lib/microdramas";

export async function POST(req: Request) {
  try {
    const { userId = "user123", episodeId } = await req.json();

    if (!episodeId) {
      return NextResponse.json({ ok: false, error: "No episode ID provided" });
    }

    // Already unlocked?
    if (isUnlocked(userId, episodeId)) {
      return NextResponse.json({ ok: true, unlocked: true });
    }

    // Check episode exists
    const eps = readMicrodramas();
    const ep = eps.find((e: any) => e.id === episodeId);
    if (!ep) {
      return NextResponse.json({ ok: false, error: "Episode not found" });
    }

    // TODO: deduct seeds — future upgrade
    // For now, unlock automatically

    addUnlock(userId, episodeId);

    return NextResponse.json({ ok: true, unlocked: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Unlock failed" });
  }
}
