import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const supabase = await supabaseServer();

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const fileName = `${user.id}-${Date.now()}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError || !uploadData) {
    return NextResponse.json(
      { error: uploadError?.message ?? "Upload failed" },
      { status: 400 }
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);

  await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  return NextResponse.json({ avatarUrl: publicUrl });
}
