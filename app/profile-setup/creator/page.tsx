"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function CreatorProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [ministryName, setMinistryName] = useState("");
  const [creatorType, setCreatorType] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setUserId(data.session.user.id);
      setLoading(false);
    };
    load();
  }, [router, supabase]);

  async function uploadAvatar(): Promise<string | null> {
    if (!avatarFile || !userId) return null;

    const ext = avatarFile.name.split(".").pop();
    const filePath = `${userId}.${ext}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, {
        upsert: true,
        contentType: avatarFile.type
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const avatarUrl = await uploadAvatar();

      const links =
        socialLinks.trim() === ""
          ? []
          : socialLinks.split("\n").map(l => l.trim()).filter(Boolean);

      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        display_name: displayName,
        ministry_name: ministryName,
        creator_type: creatorType,
        bio,
        social_links: links,
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
  }

  if (loading) {
    return <div className="text-white p-6">Loading…</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 text-white space-y-4">
      {error && <div className="bg-red-900 text-red-200 p-3 rounded">{error}</div>}

      <input
        className="w-full p-2 rounded bg-black border border-gray-700"
        placeholder="Display name"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        required
      />

      <input
        className="w-full p-2 rounded bg-black border border-gray-700"
        placeholder="Ministry or brand name"
        value={ministryName}
        onChange={e => setMinistryName(e.target.value)}
        required
      />

      <select
        className="w-full p-2 rounded bg-black border border-gray-700"
        value={creatorType}
        onChange={e => setCreatorType(e.target.value)}
        required
      >
        <option value="">Select category</option>
        <option value="pastor">Pastor</option>
        <option value="teacher">Teacher</option>
        <option value="ministry">Ministry</option>
      </select>

      <textarea
        className="w-full p-2 rounded bg-black border border-gray-700"
        placeholder="Short bio"
        value={bio}
        onChange={e => setBio(e.target.value)}
      />

      <textarea
        className="w-full p-2 rounded bg-black border border-gray-700"
        placeholder="Social links (one per line)"
        value={socialLinks}
        onChange={e => setSocialLinks(e.target.value)}
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
        {saving ? "Saving…" : "Finish creator setup"}
      </button>
    </form>
  );
}
