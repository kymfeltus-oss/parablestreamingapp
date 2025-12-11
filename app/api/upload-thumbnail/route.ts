import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const supabase = createClient();
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file)
    return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `thumbnails/${fileName}`;

  const { error } = await supabase.storage
    .from("thumbnails")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error)
    return NextResponse.json({ ok: false, error: error.message });

  const {
    data: { publicUrl },
  } = supabase.storage.from("thumbnails").getPublicUrl(filePath);

  return NextResponse.json({ ok: true, url: publicUrl });
}
