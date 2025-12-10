import { NextResponse } from "next/server";
import { resend, EMAIL_FROM } from "@/lib/emailClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      to,
      creatorName,
      streamTitle,
      streamUrl,
      streamId,
    } = body as {
      to: string;
      creatorName: string;
      streamTitle: string;
      streamUrl: string;
      streamId?: string;
    };

    if (!to || !streamTitle || !streamUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subject = `You are now LIVE on Parable: ${streamTitle}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:40px;background:#000;color:white;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:480px;margin:0 auto;background:#111;border:1px solid #53fc18;padding:32px;border-radius:16px;box-shadow:0 0 16px rgba(83,252,24,0.3);">
          <h1 style="font-size:24px;font-weight:900;color:#53fc18;margin-bottom:10px;">
            You're live on Parable 🔴
          </h1>
          <p style="font-size:14px;color:#ccc;line-height:1.6;margin-bottom:22px;">
            ${creatorName || "Your stream"} is now broadcasting:<br/>
            <strong>${streamTitle}</strong>
          </p>
          <a href="${streamUrl}"
            style="display:inline-block;background:#53fc18;color:#000;font-weight:700;
                   padding:12px 20px;border-radius:10px;text-decoration:none;font-size:14px;
                   box-shadow:0 0 12px #53fc18;">
            Open live dashboard
          </a>
          ${
            streamId
              ? `<p style="color:#777;font-size:12px;margin-top:24px;">Stream ID: ${streamId}</p>`
              : ""
          }
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message || "Failed to send live email" },
      { status: 500 }
    );
  }
}
