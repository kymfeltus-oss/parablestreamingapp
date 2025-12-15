"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { Camera, User as UserIcon } from "lucide-react";

type SupabaseProfile = {
  id: string;
  display_name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  ministry_name?: string | null;
  creator_category?: string | null;
  social_links?: string[] | null;
  username?: string | null;
  onboarding_complete?: boolean | null;
};

const CREATOR_CATEGORIES = [
  "Pastor or teacher",
  "Worship artist",
  "Gospel creator",
  "Christian gamer",
  "Podcaster",
];

export default function CreatorProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<SupabaseProfile | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [ministryName, setMinistryName] = useState("");
  const [creatorCategory, setCreatorCategory] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) return router.replace("/login");

      if ((user.user_metadata as any)?.accountType !== "creator") {
        return router.replace("/profile-setup/viewer");
      }

      const { data: existing } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile((existing as SupabaseProfile) || null);

      setDisplayName(
        (existing as any)?.display_name || (user.user_metadata as any)?.displayName || ""
      );
      setMinistryName((existing as any)?.ministry_name || "");
      setCreatorCategory((existing as any)?.creator_category || "");
      setBio((existing as any)?.bio || "");

      const existingLinks = (existing as any)?.social_links as string[] | null | undefined;
      setSocialLinks(existingLinks && Array.isArray(existingLinks) ? existingLinks.join("\n") : "");

      setAvatarUrl((existing as any)?.avatar_url || null);

      setLoading(false);
    }

    load();
  }, [router, supabase]);

  async function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setError(null);
      setUploading(true);

      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        setUploading(false);
        router.replace("/login");
        return;
      }

      const ext = file.name.split(".").pop();
      const filePath = `${user.id}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setAvatarUrl(publicData.publicUrl);
    } catch (err: any) {
      setError(err.message || "Avatar upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!displayName) {
      setError("Display name is required.");
      setSaving(false);
      return;
    }

    if (!creatorCategory) {
      setError("Please choose a creator category.");
      setSaving(false);
      return;
    }

    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      setSaving(false);
      return router.replace("/login");
    }

    const socialLinksArray =
      socialLinks.trim() === ""
        ? []
        : socialLinks
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

    const payload = {
      id: user.id,
      display_name: displayName,
      bio,
      ministry_name: ministryName,
      creator_category: creatorCategory,
      social_links: socialLinksArray,
      avatar_url: avatarUrl,
      onboarding_complete: true,
      username: (profile as any)?.username ?? (user.user_metadata as any)?.username ?? null,
      updated_at: new Date().toISOString()
    };

    const { error: saveError } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "id" });

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.replace("/creator/dashboard");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-300">
        Loading creator setup...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center pb-16">
      <div className="w-full max-w-3xl bg-[#111] border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(83,252,24,0.25)]">
        <h1 className="text-2xl font-extrabold mb-2">
          Set up your creator profile
        </h1>
        <p className="text-xs text-gray-400 mb-6">
          This is what viewers will see across Parable.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-900/40 border border-red-500 text-red-100 text-xs px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border border-white/20 overflow-hidden flex items-center justify-center bg-black">
                {avatarUrl ? (
                  <img src={avatarUrl} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-14 h-14 text-gray-500" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-[#53fc18] text-black rounded-full p-2 cursor-pointer shadow-[0_0_10px_#53fc18]">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>
            <p className="text-[11px] text-gray-400">
              {uploading ? "Uploading avatar..." : "Upload a square image 400x400+"}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1 block">Display name</label>
              <input
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your creator name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold mb-1 block">Ministry or brand name</label>
                <input
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm"
                  value={ministryName}
                  onChange={(e) => setMinistryName(e.target.value)}
                  placeholder="Kingdom Impact Center"
                />
              </div>

              <div>
                <label className="text-xs font-semibold mb-1 block">Creator type</label>
                <select
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm"
                  value={creatorCategory}
                  onChange={(e) => setCreatorCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {CREATOR_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Short bio</label>
              <textarea
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm min-h-[90px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your ministry and purpose..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Social links</label>
              <textarea
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs min-h-[70px]"
                value={socialLinks}
                onChange={(e) => setSocialLinks(e.target.value)}
                placeholder="Instagram, YouTube, TikTok, Website — one per line."
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-3 w-full bg-[#53fc18] text-black text-sm font-bold rounded-lg py-3 shadow-[0_0_16px_#53fc18] hover:brightness-110 disabled:opacity-60"
            >
              {saving ? "Saving creator profile..." : "Finish creator setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
