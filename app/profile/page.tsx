"use client";

import { useEffect, useState } from "react";
// FIX: Change import from named export 'supabase' to named export 'createClient'
import { createClient } from "@/lib/supabaseClient";

export default function ProfilePage() {
  // FIX: Instantiate the client by calling the createClient function
  const supabase = createClient();
  
  const [profile, setProfile] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setDisplayName(data?.display_name || "");
    setBio(data?.bio || "");
    setAvatarUrl(data?.avatar_url || null);
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true);

      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.avatarUrl) {
        setAvatarUrl(json.avatarUrl);
      }
    } catch (e) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function saveProfile() {
    if (!profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        bio: bio,
      })
      .eq("id", profile.id);

    if (error) alert(error.message);
    else alert("Profile updated!");
  }

  if (!profile) return <div className="text-white p-6">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="flex items-center gap-6 mb-8">
        <div>
          <img
            src={avatarUrl || "/placeholder-avatar.png"}
            className="w-32 h-32 rounded-full object-cover border border-gray-700"
          />

          <label className="block mt-3">
            <span className="px-4 py-2 bg-violet-600 rounded-lg cursor-pointer hover:bg-violet-700">
              {uploading ? "Uploading..." : "Upload Avatar"}
            </span>
            <input type="file" className="hidden" onChange={uploadAvatar} />
          </label>
        </div>

        <div className="flex-1">
          <label className="block mb-1">Display Name</label>
          <input
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded w-full mb-4"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <label className="block mb-1">Bio</label>
          <textarea
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <button
        onClick={saveProfile}
        className="px-6 py-2 bg-violet-600 rounded-lg hover:bg-violet-700"
      >
        Save Changes
      </button>
    </div>
  );
}
