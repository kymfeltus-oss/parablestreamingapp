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

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("creator");

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        router.replace("/login");
        return;
      }

      const uid = sessionData.session.user.id;
      setUserId(uid);

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", uid)
        .single();

      if (profile?.onboarding_complete) {
        router.replace("/dashboard");
        return;
      }

      setLoading(false);
    };

    init();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) return;

    setSaving(true);

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      display_name: displayName,
      username: username,
      role: role,
      onboarding_complete: true,
      updated_at: new Date().toISOString()
    });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (role === "creator") {
      router.replace("/creator/dashboard");
    } else {
      router.replace("/feed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading profile setup…
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-xl font-semibold mb-4">
        Create Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Display Name</label>
          <input
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Username</label>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Account Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="creator">Creator</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-black text-white py-2 rounded"
        >
          {saving ? "Saving…" : "Complete Setup"}
        </button>
      </form>
    </div>
  );
}
