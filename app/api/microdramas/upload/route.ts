import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fileName } = await req.json();

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const token = process.env.CLOUDFLARE_STREAM_TOKEN;

    if (!accountId || !token) {
      return NextResponse.json(
        { ok: false, error: "Cloudflare Stream not configured" },
        { status: 500 }
      );
    }

    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/direct_upload`;

    const cfRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maxDurationSeconds: 300, // 5 minutes max per episode
        meta: {
          fileName,
          uploadedBy: "parable-creator",
        },
      }),
    });

    const data = await cfRes.json();

    if (!data.success) {
      console.error("Cloudflare Stream error:", data.errors);
      return NextResponse.json(
        { ok: false, error: "Cloudflare Stream API error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      uploadURL: data.result.uploadURL,
      videoId: data.result.uid,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Upload init failed" },
      { status: 500 }
    );
  }
}
