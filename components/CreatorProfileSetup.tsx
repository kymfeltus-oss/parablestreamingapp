"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function CreatorProfileSetup() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    setProfile(data);

    // Pre-fill from profile (no duplicate work)
    if (data?.display_name) setDisplayName(data.display_name);
    if (data?.bio) setBio(data.bio);
  }

  async function save() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let avatarUrl = profile?.avatar_url;

    if (avatar) {
      const form = new FormData();
      form.append("file", avatar);

      const res = await fetch(
        "https://api.parablestreaming.com/api/upload-thumbnail",
        {
          method: "POST",
          body: form,
        }
      );

      const json = await res.json();
      avatarUrl = json.url;
    }

    await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        bio,
        avatar_url: avatarUrl,
      })
      .eq("id", user!.id);

    window.location.href = "/dashboard";
  }

  return (
    <div className="bg-black text-white p-8 max-w-lg mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Finish Your Creator Profile</h1>

      <label>Display Name</label>
      <input
        className="w-full p-3 bg-[#111] rounded mb-4"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <label>Bio</label>
      <textarea
        className="w-full p-3 bg-[#111] rounded mb-4"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <label>Avatar</label>
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
      />

      <button
        onClick={save}
        className="px-6 py-3 bg-[#53fc18] text-black font-bold rounded"
      >
        Save Profile
      </button>
    </div>
  );
}
