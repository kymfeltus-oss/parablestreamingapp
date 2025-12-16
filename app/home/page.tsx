// HOME_WITH_FEATURED_CREATORS_V3

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import {
  Radio,
  Users,
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
  username?: string | null;
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
        .select("display_name,avatar_url,creator_category,username")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(p || null);
    }
    load();
  }, [supabase]);

  useEffect(() => {
    const stored = localStorage.getItem("parable_home_posts");
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("parable_home_posts", JSON.stringify(posts));
  }, [posts]);

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

  const profileHref = `/profile/${profile?.username || "me"}`;

  return (
    <div className="relative min-h-screen bg-black text-white pb-24 overflow-hidden">

      {/* MOVING GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#53fc18]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#53fc18]/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* HEADER */}
      <header className="relative z-40 sticky top-0 bg-black/80 backdrop-blur border-b border-white/10">
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
                <MenuItem href={profileHref}>View Profile</MenuItem>

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

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">

        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block sticky top-20 h-fit bg-[#0b0b0b] border border-white/10 rounded-xl p-4">
          <h3 className="text-xs font-bold uppercase text-gray-400 mb-3">
            Online Now
          </h3>

          <Link href={profileHref} className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="relative">
              <Avatar avatar={profile?.avatar_url} />
              <Circle className="w-3 h-3 absolute bottom-0 right-0 fill-[#53fc18]" />
            </div>
            <span className="text-sm">{profile?.display_name || "You"}</span>
          </Link>
        </aside>

        {/* CONTENT */}
        <main className="space-y-12">

          {/* HERO */}
          <section className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(83,252,24,0.2)]">
            <h1 className="text-2xl font-extrabold neon-text mb-2">
              Live right now on Parable
            </h1>
            <p className="text-sm text-gray-400">
              Worship, teaching, music, and testimony — all in one place.
            </p>
          </section>

          {/* FEATURED CREATORS */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 neon-text" />
              <h2 className="text-lg font-extrabold">Featured Creators</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <CreatorVideo
                title="Sarah Jakes Roberts — Set the Record Straight"
                src="https://www.youtube.com/embed/cd1dJGqDDsI"
              />

              <CreatorVideo
                title="Dr. Jamal Bryant — Why Time Is Flying"
                src="https://www.youtube.com/embed/OIA3pq1EVTI?start=5"
              />

              <CreatorVideo
                title="Kirk Franklin — BET Awards Praise Medley"
                src="https://www.youtube.com/embed/s9XthutHgB4?start=5"
              />

              <CreatorVideo
                title="Pastor Sheryl Brady — Stronger Than the Storm"
                src="https://www.youtube.com/embed/uEmkoAGDUEY?start=3"
              />

              <CreatorVideo
                title="Yolanda Adams — Lifestyles"
                src="https://www.youtube.com/embed/40CFDyA9rQg?start=3"
              />

              <CreatorVideo
                title="Fred Hammond — YAHWEH"
                src="https://www.youtube.com/embed/flzzENtKf28"
              />

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
                <div key={post.id} className="bg-[#111] border border-white/10 rounded-xl p-4">
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

        </main>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function CreatorVideo({ title, src }: { title: string; src: string }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
      <iframe
        className="w-full aspect-video"
        src={src}
        title={title}
        allowFullScreen
      />
      <div className="p-4">
        <p className="font-semibold">{title}</p>
      </div>
    </div>
  );
}

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

function MenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-black/60 transition">
      {children}
    </Link>
  );
}
