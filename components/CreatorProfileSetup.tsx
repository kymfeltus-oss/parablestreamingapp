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
  const [ministryName, setMinistryName] = useState("");
  const [creatorType, setCreatorType] = useState("");
  const [socialLinksInput, setSocialLinksInput] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setUserId(data.session.user.id);
      setLoading(false);
    };
    init();
  }, [router]);

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !userId) return null;

    const ext = avatarFile.name.split(".").pop();
    const path = `avatars/${userId}.${ext}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(path, avatarFile, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(path);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const avatarUrl = await uploadAvatar();

      // ✅ Convert social links to a REAL array
      const socialLinks =
        socialLinksInput.trim() === ""
          ? []
          : socialLinksInput
              .split(",")
              .map(link => link.trim())
              .filter(Boolean);

      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        display_name: displayName,
        ministry_name: ministryName,
        creator_type: creatorType,
        social_links: socialLinks, // ✅ ARRAY NOT STRING
        avatar_url: avatarUrl,
        onboarding_complete: true,
        updated_at: new Date().toISOString()
      });

      if (error) throw error;

      router.replace("/creator/ministry");
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
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder="Display name"
          required
          className="w-full p-2 rounded bg-black border border-gray-700"
        />

        <input
          value={ministryName}
          onChange={e => setMinistryName(e.target.value)}
          placeholder="Ministry or brand name"
          required
          className="w-full p-2 rounded bg-black border border-gray-700"
        />

        <select
          value={creatorType}
          onChange={e => setCreatorType(e.target.value)}
          required
          className="w-full p-2 rounded bg-black border border-gray-700"
        >
          <option value="">Select a category</option>
          <option value="pastor">Pastor</option>
          <option value="teacher">Teacher</option>
          <option value="ministry">Ministry</option>
        </select>

        <textarea
          value={socialLinksInput}
          onChange={e => setSocialLinksInput(e.target.value)}
          placeholder="Social links (comma separated)"
          className="w-full p-2 rounded bg-black border border-gray-700"
        />

        <input
          type="file"
          accept="image/*"
          onChange={e => setAvatarFile(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-emerald-600 py-2 rounded"
        >
          {saving ? "Saving…" : "Complete Profile"}
        </button>
      </form>
    </div>
  );
}
