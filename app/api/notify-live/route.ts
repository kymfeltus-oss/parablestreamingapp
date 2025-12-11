import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";
import { resend, EMAIL_FROM } from "@/lib/emailClient";

export async function POST(req: Request) {
  const supabase = createClient();
  const { creatorId, streamTitle, streamUrl } = await req.json();

  const { data: followers } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("creator_id", creatorId);

  if (!followers) return NextResponse.json({ ok: true });

  for (const f of followers) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", f.follower_id)
      .maybeSingle();

    if (!profile?.email) continue;

    await resend.emails.send({
      from: EMAIL_FROM,
      to: profile.email,
      subject: `🔴 ${streamTitle} is LIVE on Parable`,
      html: `<p>Your followed creator is live now:</p>
             <p><a href="${streamUrl}">${streamTitle}</a></p>`,
    });
  }

  return NextResponse.json({ ok: true });
}
