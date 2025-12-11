import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = process.env.CLOUDFLARE_STREAM_TOKEN;
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;

  const { streamKey, inputId } = await req.json();

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${account}/stream/live_inputs/${inputId}/outputs`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `rtmp://live.cloudflare.com:1935/live/${streamKey}`,
      }),
    }
  );

  const json = await res.json();
  return NextResponse.json(json);
}
