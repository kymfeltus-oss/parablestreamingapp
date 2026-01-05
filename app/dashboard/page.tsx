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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={profile?.avatar_url || "/avatar-placeholder.png"}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {profile?.display_name || "User"}
            </h1>
            <p className="text-gray-400">
              {accountType === "creator" ? "Creator Dashboard" : "Dashboard"}
            </p>
          </div>
        </div>
      </div>

      {/* COMMON VIEWER SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-zinc-900 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Followers</p>
          <p className="text-3xl font-bold text-green-400">
            {profile?.followers_count || 0}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Seeds Balance</p>
          <p className="text-3xl font-bold text-green-400">
            {profile?.seeds_balance || 0}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Account Type</p>
          <p className="text-xl font-semibold capitalize">
            {accountType}
          </p>
        </div>
      </div>

      {/* VIEWER CONTENT */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Continue Watching</h2>
        <div className="bg-zinc-900 rounded-xl p-6 text-gray-400">
          No recent streams yet.
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Discover</h2>
        <div className="bg-zinc-900 rounded-xl p-6 text-gray-400">
          Live and featured streams will appear here.
        </div>
      </div>

      {/* CREATOR-ONLY SECTION */}
      {accountType === "creator" && (
        <>
          <div className="border-t border-zinc-800 pt-8 mt-8">
            <h2 className="text-xl font-bold mb-6">Creator Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-zinc-900 rounded-xl p-6">
                <h3 className="font-semibold mb-2">Go Live</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Start a live gaming stream
                </p>
                <button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg">
                  Start Stream
                </button>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6">
                <h3 className="font-semibold mb-2">Upload Content</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Upload clips or recordings
                </p>
                <button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg">
                  Upload
                </button>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6">
                <h3 className="font-semibold mb-2">Edit Profile</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Update your creator profile
                </p>
                <button
                  onClick={() => router.push("/profile-setup")}
                  className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Creator Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Streams This Month</p>
                <p className="text-2xl font-bold text-green-400">0</p>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Avg Viewers</p>
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
