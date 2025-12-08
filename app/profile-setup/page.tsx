"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

type SupabaseProfile = {
  id: string;
  display_name?: string | null;
  country?: string | null;
  language_preference?: string | null;
  interests?: string[] | null;
  notifications_enabled?: boolean | null;
  username?: string | null;
};

const INTEREST_OPTIONS = [
  "Music and worship",
  "Sermons and teaching",
  "Bible study",
  "Christian gaming",
  "Motivational content",
  "Testimonies",
];

export default function ViewerProfileSetupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<SupabaseProfile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [languagePreference, setLanguagePreference] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
      if (accountType === "creator") {
        router.replace("/profile-setup/creator");
        return;
      }

      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (existingProfile && (existingProfile as any).username) {
        router.replace("/feed");
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
        setCountry(p.country || "");
        setLanguagePreference(p.language_preference || "");
        setSelectedInterests(p.interests || []);
        setNotificationsEnabled(
          p.notifications_enabled ?? true
        );
      } else {
        setDisplayName(
          (user.user_metadata as any)?.displayName || ""
        );
      }

      setLoading(false);
    }

    load();
  }, [router, supabase]);

  function toggleInterest(option: string) {
    setSelectedInterests((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
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
      country: country || null,
      language_preference: languagePreference || null,
      interests: selectedInterests,
      notifications_enabled: notificationsEnabled,
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

    router.replace("/feed");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-sm">
          Loading your viewer setup
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Welcome to Parable
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Tell us a little about you so we can tune your
          experience.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 text-red-700 text-xs px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">
              Display name
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How you want to appear"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">
                Country
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United States"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Language
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={languagePreference}
                onChange={(e) =>
                  setLanguagePreference(e.target.value)
                }
                placeholder="English"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-2">
              What are you most interested in
            </label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleInterest(option)}
                  className={`text-xs px-3 py-1 rounded-full border ${
                    selectedInterests.includes(option)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <input
              id="notifications"
              type="checkbox"
              className="w-4 h-4"
              checked={notificationsEnabled}
              onChange={(e) =>
                setNotificationsEnabled(e.target.checked)
              }
            />
            <label
              htmlFor="notifications"
              className="text-xs text-gray-600"
            >
              Send me updates about new streams and creators I
              follow.
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-4 w-full bg-indigo-600 text-white text-sm font-semibold rounded-md py-2 hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving your preferences" : "Finish setup"}
          </button>
        </form>
      </div>
    </div>
  );
}
