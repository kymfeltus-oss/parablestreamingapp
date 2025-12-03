import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Expected: { creatorId }
  console.log("STOP STREAM", body);

  // TODO: update backend to mark stream as offline.
  return NextResponse.json({
    ok: true,
    status: "offline",
    received: body,
  });
}
