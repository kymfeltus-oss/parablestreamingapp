import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Expected: { creatorId, title, thumbnail }
  console.log("START STREAM", body);

  // TODO: call real backend or external streaming service here.
  // For now, just return success so UI can update.

  return NextResponse.json({
    ok: true,
    status: "live",
    received: body,
  });
}
