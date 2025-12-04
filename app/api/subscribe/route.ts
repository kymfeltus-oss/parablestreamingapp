import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  console.log("NEW PARABLE EARLY ACCESS EMAIL:", email);

  // TODO: connect to Mailchimp, Brevo, SES, etc.

  return NextResponse.json({ ok: true });
}
