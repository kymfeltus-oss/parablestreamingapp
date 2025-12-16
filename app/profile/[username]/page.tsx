// PROFILE_PUBLIC_ROUTER_V3

"use client";

import { useParams } from "next/navigation";
import {
  User,
  Mic2,
  PlayCircle,
  Radio,
  BookOpen,
} from "lucide-react";

/* =========================
   DEMO PROFILES (TEMP)
   ========================= */
const DEMO_PROFILES: Record<string, any> = {
  kymtheceo: {
    display_name: "Kym The CEO",
    creator_category: "podcaster",
    bio: "Podcast host sharing conversations that inspire faith, leadership, and purpose.",
    avatar_url: null,
  },
  sarahjakes: {
    display_name: "Sarah Jakes Roberts",
    creator_category: "teacher",
    bio: "Teacher, author, and leader helping people grow in faith and identity.",
    avatar_url: null,
  },
  jamalbryant: {
    display_name: "Dr. Jamal Bryant",
    creator_category: "pastor",
    bio: "Pastor and prophetic voice speaking truth to culture through the Word.",
    avatar_url: null,
  },
  sherylbrady: {
    display_name: "Pastor Sheryl Brady",
    creator_category: "pastor",
    bio: "Senior pastor and teacher encouraging resilience and faith.",
    avatar_url: null,
  },
};

export default function PublicProfilePage() {
  const params = useParams();
  const raw = Array.isArray(params.username)
    ? params.username[0]
    : params.username;

  const normalized = decodeURIComponent(raw || "")
    .toLowerCase()
    .replace(/\s+/g, "");

  const profile = DEMO_PROFILES[normalized];

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Profile not found
      </div>
    );
  }

  if (profile.creator_category === "podcaster") {
    return <PodcasterProfile profile={profile} />;
  }

  if (
    profile.creator_category === "pastor" ||
    profile.creator_category === "teacher"
  ) {
    return <PastorTeacherProfile profile={profile} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
      Template coming soon
    </div>
  );
}

/* =========================
   PODCASTER TEMPLATE
   ========================= */
function PodcasterProfile({ profile }: { profile: any }) {
  return (
    <ProfileShell>
      <ProfileHero profile={profile} icon={<Mic2 />} />

      <Section title="Episodes" icon={<Mic2 />}>
        {["Faith & Leadership", "Calling & Purpose", "Kingdom Conversations"].map(
          (t, i) => (
            <EpisodeCard key={i} title={t} />
          )
        )}
      </Section>
    </ProfileShell>
  );
}

/* =========================
   PASTOR / TEACHER TEMPLATE
   ========================= */
function PastorTeacherProfile({ profile }: { profile: any }) {
  return (
    <ProfileShell>
      <ProfileHero profile={profile} icon={<BookOpen />} />

      <Section title="Latest Teaching" icon={<PlayCircle />}>
        <TeachingCard title="Set the Record Straight" />
        <TeachingCard title="Why Time Is Flying" />
        <TeachingCard title="Stronger Than the Storm" />
      </Section>
    </ProfileShell>
  );
}

/* =========================
   SHARED COMPONENTS
   ========================= */

function ProfileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-10 space-y-12">
        {children}
      </div>
    </div>
  );
}

function ProfileHero({
  profile,
  icon,
}: {
  profile: any;
  icon: React.ReactNode;
}) {
  return (
    <section className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(83,252,24,0.2)]">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-black border border-white/20 flex items-center justify-center">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-gray-500" />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-extrabold neon-text">
            {profile.display_name}
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-xl">
            {profile.bio}
          </p>

          <div className="mt-4 flex gap-3">
            <button className="neon-button text-sm flex items-center gap-2">
              {icon}
              Follow
            </button>
            <button className="px-5 py-3 rounded-lg bg-black border border-white/15 text-sm hover:border-white/30 transition flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Live
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="neon-text">{icon}</span>
        <h2 className="text-lg font-extrabold">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function EpisodeCard({ title }: { title: string }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4">
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-gray-400">45 min • Listen now</p>
    </div>
  );
}

function TeachingCard({ title }: { title: string }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4">
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-gray-400">Watch teaching</p>
    </div>
  );
}
