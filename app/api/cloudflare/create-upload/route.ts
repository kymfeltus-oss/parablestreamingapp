import { NextResponse } from "next/server";

export async function POST() {
  const token = process.env.CLOUDFLARE_STREAM_TOKEN;
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${account}/stream/live_inputs`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meta: { name: "parable_live_input" },
        recording: { mode: "automatic" },
      }),
    }
  );

  const json = await res.json();
  return NextResponse.json(json);
}
