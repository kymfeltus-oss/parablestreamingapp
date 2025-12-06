import { NextResponse } from "next/server";

export async function POST() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_STREAM_TOKEN;

  if (!accountId || !token) {
    return NextResponse.json(
      { error: "Cloudflare credentials not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requireSignedURLs: false,
        maxDurationSeconds: 3600,
        metadata: {},
      }),
    }
  );

  const json = await res.json();

  if (!json.success) {
    return NextResponse.json(
      { error: "Failed to create direct upload", detail: json },
      { status: 500 }
    );
  }

  const { uploadURL, uid } = json.result;

  return NextResponse.json({ uploadURL, uid });
}
