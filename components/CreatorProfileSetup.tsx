"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function CreatorProfileSetup() {
  const supabase = createClient();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      let avatarUrl = "";

      // Upload avatar if selected
      if (avatar) {
        const form = new FormData();
        form.append("file", avatar);

        const uploadRes = await fetch(
          "https://api.parablestreaming.com/api/upload-thumbnail",
          { method: "POST", body: form }
        );

        const uploadJson = await uploadRes.json();
        if (!uploadJson.ok) throw new Error("Avatar upload failed");

        avatarUrl = uploadJson.url;
      }

      // Update profile fields
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          bio: bio,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (updateError) throw new Error(updateError.message);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    }

    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Finish Setting Up Your Creator Profile</h1>

      {error && (
        <div className="bg-red-900 text-red-300 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <label className="block mb-2">Display Name</label>
      <input
        className="w-full p-2 mb-4 bg-[#111] border border-white/20 rounded"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <label className="block mb-2">Bio</label>
      <textarea
        className="w-full p-2 mb-4 bg-[#111] border border-white/20 rounded"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <label className="block mb-2">Profile Picture</label>
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setAvatar(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-3 bg-[#53fc18] text-black font-bold rounded"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
