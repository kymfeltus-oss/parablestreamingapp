"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function ViewerProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<any>(null);

  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [languagePreference, setLanguagePreference] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const INTEREST_OPTIONS = [
    "Music and worship",
    "Sermons and teaching",
    "Bible study",
    "Christian gaming",
    "Motivational content",
    "Testimonies",
  ];

  /* ===================== LOAD USER + PROFILE ===================== */
  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const accountType = user.user_metadata?.accountType || "viewer";
      if (accountType === "creator") {
        router.replace("/profile-setup/creator");
        return;
      }

      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(existingProfile);

      setDisplayName(
        existingProfile?.display_name ||
          user.user_metadata?.displayName ||
          ""
      );

      setCountry(existingProfile?.country || "");
      setLanguagePreference(existingProfile?.language_preference || "");
      setSelectedInterests(existingProfile?.interests || []);
      setNotificationsEnabled(
        existingProfile?.notifications_enabled ?? true
      );

      setLoading(false);
    }

    load();
  }, [router, supabase]);

  /* ========================= TOGGLE INTEREST ========================= */
  function toggleInterest(option: string) {
    setSelectedInterests((prev) =>
      prev.includes(option)
        ? prev.filter((i) => i !== option)
        : [...prev, option]
    );
  }

  /* ======================== SAVE PROFILE ======================== */
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!displayName) {
      setError("Display name is required.");
      setSaving(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    const payload = {
      id: user.id,
      display_name: displayName,
      country,
      language_preference: languagePreference,
      interests: selectedInterests,
      notifications_enabled: notificationsEnabled,
      username:
        profile?.username || user.user_metadata?.username || null,
    };

    const { error: saveError } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "id" });

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    router.replace("/feed");
  }

  /* ========================= LOADING STATE ========================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-700">
        Loading viewer setup...
      </div>
    );
  }

  /* ========================= PAGE UI (unchanged) ========================= */
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Finish Your Parable Setup
        </h1>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="text-sm font-medium">Display name</label>
            <input
              className="w-full p-2 border rounded mt-1"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium">Country</label>
              <input
                className="w-full p-2 border rounded mt-1"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Language</label>
              <input
                className="w-full p-2 border rounded mt-1"
                value={languagePreference}
                onChange={(e) => setLanguagePreference(e.target.value)}
              />
            </div>
          </div>

          <label className="text-sm font-medium mb-2 block">
            What interests you?
          </label>

          <div className="flex flex-wrap gap-2 mb-4">
            {INTEREST_OPTIONS.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => toggleInterest(option)}
                className={`px-3 py-1 rounded-full text-xs border ${
                  selectedInterests.includes(option)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-200 text-gray-700 border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input
              id="notify"
              type="checkbox"
              className="w-4 h-4"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
            <label htmlFor="notify" className="text-sm text-gray-600">
              Send me updates about streams and creators
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#53fc18] text-black py-2 rounded font-bold shadow-lg hover:brightness-105 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Finish setup"}
          </button>
        </form>
      </div>
    </div>
  );
}
