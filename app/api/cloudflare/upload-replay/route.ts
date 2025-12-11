import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = process.env.CLOUDFLARE_STREAM_TOKEN;
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;

  const formData = await req.formData();
  const file = formData.get("file") as File;

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${account}/stream`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: file,
    }
  );

  const json = await res.json();
  return NextResponse.json(json);
}
