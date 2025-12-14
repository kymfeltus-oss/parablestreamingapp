"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreatorProfileSetup() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        router.replace("/login");
        return;
      }

      setUserId(sessionData.session.user.id);
      setLoading(false);
    };

    init();
  }, [router]);

  const handleImageUpload = async () => {
    if (!profileImage || !userId) return null;

    const fileExt = profileImage.name.split(".").pop();
    const filePath = `avatars/${userId}.${fileExt}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, profileImage, {
        upsert: true
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let avatarUrl = null;

      if (profileImage) {
        avatarUrl = await handleImageUpload();
      }

      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        display_name: displayName,
        username,
        avatar_url: avatarUrl,
        onboarding_complete: true,
        updated_at: new Date().toISOString()
      });

      if (error) throw error;

      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white p-6">Loading…</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-semibold mb-2">
        Set up your creator profile
      </h1>

      <p className="text-gray-400 mb-4">
        This is what viewers will see across Parable.
      </p>

      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          className="w-full p-2 rounded bg-black border border-gray-700"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 rounded bg-black border border-gray-700"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
          className="w-full"
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-green-600 py-2 rounded"
        >
          {saving ? "Saving…" : "Complete Profile"}
        </button>
      </form>
    </div>
  );
}
