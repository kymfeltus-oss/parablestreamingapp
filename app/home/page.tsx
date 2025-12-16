// HOME_WITH_SIDEBAR_V1
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import {
  Radio,
  Users,
  Image as ImageIcon,
  Video,
  X,
  Flame,
  Music,
  Gamepad2,
  Mic2,
  User,
  ChevronDown,
  Settings,
  LogOut,
  LayoutDashboard,
  Circle,
} from "lucide-react";

type Profile = {
  display_name?: string | null;
  avatar_url?: string | null;
  creator_category?: string | null;
};

type Post = {
  id: number;
  author: string;
  avatar?: string | null;
  content: string;
  createdAt: string;
};

export default function HomePage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("display_name,avatar_url,creator_category")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(p || null);
    }

    load();
  }, [supabase]);

  function handlePost() {
    if (!postText.trim()) return;

    setPosts((prev) => [
      {
        id: Date.now(),
        author: profile?.display_name || "Anonymous",
        avatar: profile?.avatar_url,
        content: postText,
        createdAt: "Just now",
      },
      ...prev,
    ]);

    setPostText("");
    setComposerOpen(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/home" className="text-xl font-extrabold neon-text">
            PARABLE
          </Link>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 bg-black border border-white/15 rounded-full px-2 py-1 hover:border-white/30 transition"
            >
              <Avatar avatar={profile?.avatar_url} />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-[#111] border border-white/15 rounded-xl shadow-lg overflow-hidden"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <MenuItem href="/profile">View Profile</MenuItem>

                {profile?.creator_category && (
                  <MenuItem href="/creator/dashboard">
                    <LayoutDashboard className="w-4 h-4" />
                    Creator Dashboard
                  </MenuItem>
                )}

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

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">

        {/* LEFT SIDEBAR — ONLINE */}
        <aside className="hidden lg:block sticky top-20 h-fit bg-[#0b0b0b] border border-white/10 rounded-xl p-4">
          <h3 className="text-xs font-bold uppercase text-gray-400 mb-3">
            Online Now
          </h3>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar avatar={profile?.avatar_url} />
              <Circle className="w-3 h-3 absolute bottom-0 right-0 fill-[#53fc18] text-[#53fc18]" />
            </div>
            <span className="text-sm">
              {profile?.display_name || "You"}
            </span>
          </div>
        </aside>

        {/* HOME CONTENT */}
        <main className="space-y-10">

          {/* HERO */}
          <section className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(83,252,24,0.2)]">
            <h1 className="text-2xl font-extrabold neon-text mb-2">
              Live right now on Parable
            </h1>
            <p className="text-sm text-gray-400">
              Join worship, teaching, gaming, and conversations happening in real time.
            </p>
          </section>

          {/* LIVE NOW */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Radio className="w-4 h-4 neon-text" />
              <h2 className="text-lg font-extrabold neon-text">Live Now</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="min-w-[240px] bg-[#111] border border-white/10 rounded-xl p-4 hover:neon-border transition"
                >
                  <p className="text-sm font-bold">Worship & Word Night</p>
                  <p className="text-xs text-gray-400 mt-1">🔴 126 watching</p>
                </div>
              ))}
            </div>
          </section>

          {/* CREATE POST */}
          <section>
            <div
              onClick={() => setComposerOpen(true)}
              className="bg-[#111] border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition"
            >
              <div className="flex items-center gap-3">
                <Avatar avatar={profile?.avatar_url} />
                <span className="text-gray-400">
                  Share what God is doing in your life…
                </span>
              </div>
            </div>
          </section>

          {/* COMMUNITY FEED */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 neon-text" />
              <h2 className="text-lg font-extrabold">Community</h2>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#111] border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar avatar={post.avatar} />
                    <div>
                      <p className="text-sm font-semibold">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{post.content}</p>
                </div>
              ))}

              {posts.length === 0 && (
                <p className="text-center text-gray-500 text-sm">
                  Be the first to post.
                </p>
              )}
            </div>
          </section>

          {/* DISCOVER */}
          <section>
            <h2 className="text-lg font-extrabold mb-3">Explore</h2>
            <div className="grid grid-cols-2 gap-4">
              <DiscoverCard icon={<Music />} label="Worship" />
              <DiscoverCard icon={<Mic2 />} label="Teaching" />
              <DiscoverCard icon={<Gamepad2 />} label="Christian Gaming" />
              <DiscoverCard icon={<Users />} label="Testimonies" />
            </div>
          </section>

        </main>
      </div>

      {/* POST COMPOSER */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-[#0b0b0b] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(83,252,24,0.25)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-extrabold neon-text">Create Post</h2>
              <button onClick={() => setComposerOpen(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="px-6 py-5">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share what God is doing in your life…"
                className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 min-h-[140px]"
              />
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex justify-end">
              <button onClick={handlePost} className="neon-button text-sm">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

function Avatar({ avatar }: { avatar?: string | null }) {
  return (
    <div className="w-9 h-9 rounded-full bg-black border border-white/20 overflow-hidden flex items-center justify-center">
      {avatar ? (
        <img src={avatar} className="w-full h-full object-cover" />
      ) : (
        <User className="w-4 h-4 text-gray-500" />
      )}
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

function DiscoverCard({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4 flex items-center gap-3 hover:border-white/20 transition cursor-pointer">
      <span className="neon-text">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
