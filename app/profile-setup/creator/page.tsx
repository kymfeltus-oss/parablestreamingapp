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
  social_links?: string | null;
  username?: string | null;
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const accountType =
        (user.user_metadata as any)?.accountType || "viewer";
      if (accountType === "viewer") {
        router.replace("/profile-setup/viewer");
        return;
      }

      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (existingProfile && (existingProfile as any).username) {
        router.replace("/creator/dashboard");
        return;
      }

      if (existingProfile) {
        const p = existingProfile as SupabaseProfile;
        setProfile(p);
        setDisplayName(
          p.display_name ||
            (user.user_metadata as any)?.displayName ||
            ""
        );
        setMinistryName(p.ministry_name || "");
        setCreatorCategory(p.creator_category || "");
        setBio(p.bio || "");
        setSocialLinks(p.social_links || "");
        setAvatarUrl(p.avatar_url || null);
      } else {
        setDisplayName(
          (user.user_metadata as any)?.displayName || ""
        );
      }

      setLoading(false);
    }

    load();
  }, [router, supabase]);

  async function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.avatarUrl) {
        setAvatarUrl(json.avatarUrl);
      } else {
        throw new Error("Upload did not return avatarUrl");
      }
    } catch (err: any) {
      setError(err.message || "Avatar upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      router.replace("/login");
      return;
    }

    const payload: SupabaseProfile = {
      id: user.id,
      display_name: displayName || null,
      bio: bio || null,
      ministry_name: ministryName || null,
      creator_category: creatorCategory || null,
      social_links: socialLinks || null,
      avatar_url: avatarUrl || null,
      username:
        profile?.username ||
        (user.user_metadata as any)?.username ||
        null,
    };

    let dbError = null;

    if (profile) {
      const { error } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", user.id);
      dbError = error;
    } else {
      const { error } = await supabase
        .from("profiles")
        .insert(payload);
      dbError = error;
    }

    setSaving(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    router.replace("/creator/dashboard");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-300">
        <p className="text-sm">Loading your creator setup</p>
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
          <div className="mb-4 rounded-md bg-red-900/40 border border-red-500 text-xs px-3 py-2 text-red-100">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-1 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border border-white/20 overflow-hidden flex items-center justify-center bg-black">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
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
            <p className="text-[11px] text-gray-400 text-center">
              {uploading
                ? "Uploading avatar"
                : "Upload a square image at least 400 by 400 pixels"}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">
                Display name
              </label>
              <input
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm"
                value={displayName}
                onChange={(e) =>
                  setDisplayName(e.target.value)
                }
                placeholder="Joshua Smith Ministries"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Ministry or brand name
                </label>
                <input
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm"
                  value={ministryName}
                  onChange={(e) =>
                    setMinistryName(e.target.value)
                  }
                  placeholder="Kingdom Impact Center"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Creator type
                </label>
                <select
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm"
                  value={creatorCategory}
                  onChange={(e) =>
                    setCreatorCategory(e.target.value)
                  }
                >
                  <option value="">
                    Select a category
                  </option>
                  {CREATOR_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Short bio
              </label>
              <textarea
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm min-h-[90px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your ministry, your content, and who you are called to reach."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Social links
              </label>
              <textarea
                className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-xs min-h-[70px]"
                value={socialLinks}
                onChange={(e) =>
                  setSocialLinks(e.target.value)
                }
                placeholder="Paste links to Instagram, YouTube, TikTok, or your website. One per line."
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-3 w-full bg-[#53fc18] text-black text-sm font-bold rounded-lg py-3 shadow-[0_0_16px_#53fc18] hover:brightness-110 disabled:opacity-60"
            >
              {saving
                ? "Saving creator profile"
                : "Finish creator setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
