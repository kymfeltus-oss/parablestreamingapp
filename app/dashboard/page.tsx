"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };

    load();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const accountType = user.user_metadata?.accountType || "viewer";

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={profile?.avatar_url || "/avatar-placeholder.png"}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {profile?.display_name || "User"}
          </h1>
          <p className="text-gray-400 capitalize">
            {accountType} dashboard
          </p>
        </div>
      </div>

      {/* VIEWER DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-zinc-900 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Seeds Balance</p>
          <p className="text-3xl font-bold text-green-400">
            {profile?.seeds_balance || 0}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Following</p>
          <p className="text-3xl font-bold text-green-400">
            {profile?.following_count || 0}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Account</p>
          <p className="text-xl font-semibold capitalize">
            {accountType}
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => router.push("/profile-setup")}
            className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>

          {accountType !== "creator" && (
            <button
              onClick={() => router.push("/creator/apply")}
              className="border border-green-500 text-green-400 px-4 py-2 rounded-lg"
            >
              Become a Creator
            </button>
          )}
        </div>
      </div>

      {/* CREATOR DASHBOARD (ADDITIVE) */}
      {accountType === "creator" && (
        <>
          <div className="border-t border-zinc-800 pt-8 mt-8">
            <h2 className="text-xl font-bold mb-6">Creator Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-zinc-900 rounded-xl p-6">
                <h3 className="font-semibold mb-2">Go Live</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Start a live stream
                </p>
                <button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg">
                  Start Stream
                </button>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6">
                <h3 className="font-semibold mb-2">Upload Content</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Upload videos or clips
                </p>
                <button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg">
                  Upload
                </button>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6">
                <h3 className="font-semibold mb-2">Creator Profile</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Edit your creator info
                </p>
                <button
                  onClick={() => router.push("/profile-setup")}
                  className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Creator Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Followers</p>
                <p className="text-2xl font-bold text-green-400">
                  {profile?.followers_count || 0}
                </p>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Streams This Month</p>
                <p className="text-2xl font-bold text-green-400">0</p>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Seeds Earned</p>
                <p className="text-2xl font-bold text-green-400">
                  {profile?.seeds_balance || 0}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
