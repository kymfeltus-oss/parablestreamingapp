"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  LayoutDashboard,
} from "lucide-react";

type Profile = {
  display_name?: string | null;
  avatar_url?: string | null;
};

export default function HomePage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("display_name,avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      setProfile((p as Profile) || null);
    }

    load();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-black text-white pb-16">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LEFT: LOGO */}
          <Link href="/home" className="text-2xl font-extrabold neon-text">
            PARABLE
          </Link>

          {/* RIGHT: PROFILE MENU */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 bg-black border border-white/15 rounded-full px-3 py-1 hover:border-white/30 transition"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-black border border-white/20 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-[#111] border border-white/15 rounded-xl shadow-lg overflow-hidden"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <MenuItem href="/profile">View profile</MenuItem>
                <MenuItem href="/creator/dashboard">
                  <LayoutDashboard className="w-4 h-4" />
                  Creator dashboard
                </MenuItem>
                <MenuItem href="/settings">
                  <Settings className="w-4 h-4" />
                  Settings
                </MenuItem>

                <div className="border-t border-white/10 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-black/60 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HOME CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-12">
        <h1 className="text-3xl font-extrabold">
          Streaming. Creating. Believing.
        </h1>

        <p className="text-gray-400 max-w-2xl">
          A living stage for faith-driven creators, ministries, and communities.
        </p>

        {/* Placeholder sections (already approved earlier) */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-extrabold neon-text mb-2">
            🔴 Live Now
          </h2>
          <p className="text-sm text-gray-400">
            Live content will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-black/60 transition"
    >
      {children}
    </Link>
  );
}
