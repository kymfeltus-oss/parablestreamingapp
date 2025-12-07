import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get authenticated user from request cookies
    const {
      data: { user },
      error: userError
    } = await supabaseServer.auth.getUser();

    if (!user || userError) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const fileName = `${user.id}-${Date.now()}`;

    // Upload to avatars bucket
    const { data: uploadData, error: uploadError } =
      await supabaseServer.storage.from("avatars").upload(fileName, file, {
        upsert: false
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 400 }
      );
    }

    // Get public URL
    const {
      data: { publicUrl }
    } = supabaseServer.storage.from("avatars").getPublicUrl(uploadData.path);

    // Update profile
    await supabaseServer
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    return NextResponse.json({ avatarUrl: publicUrl });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
