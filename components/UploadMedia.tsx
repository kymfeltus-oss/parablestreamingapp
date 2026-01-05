"use client";

import { createClient } from "@/lib/supabaseClient";

export default function UploadMedia({ onUpload }: any) {
  const supabase = createClient();

  async function upload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const path = `${user.id}/${Date.now()}-${file.name}`;

    await supabase.storage.from("media").upload(path, file);

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onUpload(data.publicUrl);
  }

  return <input type="file" onChange={upload} />;
}
