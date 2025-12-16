// PROFILE_PUBLIC_ROUTER_V8_DEMO_IMAGES_FIXED

"use client";

import { useParams } from "next/navigation";
import {
  User,
  Mic2,
  PlayCircle,
  Radio,
  Music,
  Sparkles,
  Ticket,
  DollarSign,
} from "lucide-react";

/* =========================
   DEMO PROFILES (TEMP)
   ========================= */
const DEMO_PROFILES: Record<string, any> = {
  /* YOU — PODCASTER */
  kymtheceo: {
    username: "kymtheceo",
    display_name: "Kym The CEO",
    creator_category: "podcaster",
    bio: "Podcast host sharing conversations that inspire faith, leadership, purpose, and kingdom impact.",
    avatar_url: "/creator/kym-the-ceo/profile.jpg",
  },

  /* PARTNER — ARTIST */
  fredhammond: {
    username: "fredhammond",
    display_name: "Fred Hammond",
    creator_category: "artist",
    bio: "Grammy-winning gospel artist, worship leader, producer, and pioneer of contemporary gospel music.",
    avatar_url: "/creator/fred-hammond/profile.jpg",
    albums: [
      "Pages of Life",
      "Purpose By Design",
      "Free To Worship",
      "Somethin’ ’Bout Love",
      "Love Unstoppable",
    ],
    singles: [
      "YAHWEH",
      "Let the Praise Begin",
      "King of Glory",
      "Celebrate (He Lives)",
    ],
    events: [
      { title: "Live Worship Experience", ticketed: true },
      { title: "Free Praise Night", ticketed: false },
    ],
  },
};

export default function PublicProfilePage() {
  const params = useParams();
  const raw = Array.isArray(params.username)
    ? params.username[0]
    : params.username;

  const username = decodeURIComponent(raw || "")
    .toLowerCase()
    .replace(/\s+/g, "");

  const profile = DEMO_PROFILES[username];

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

  if (profile.creator_category === "artist") {
    return <ArtistProfile profile={profile} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
      Template coming soon
    </div>
  );
}

/* =========================
   PODCASTER PROFILE
   ========================= */
function PodcasterProfile({ profile }: { profile: any }) {
  return (
    <ProfileShell glow>
      <ProfileHero profile={profile} icon={<Mic2 />} />
      <Section title="Episodes" icon={<Mic2 />}>
        {["Faith & Leadership", "Calling & Purpose", "Kingdom Conversations"].map(
          (t, i) => (
            <Card key={i} title={t} subtitle="45 min • Listen now" />
          )
        )}
      </Section>
    </ProfileShell>
  );
}

/* =========================
   ARTIST PROFILE (FRED)
   ========================= */
function ArtistProfile({ profile }: { profile: any }) {
  return (
    <ProfileShell glow>
      <ProfileHero profile={profile} icon={<Music />} large />

      <Section title="Albums" icon={<Music />}>
        {profile.albums.map((a: string, i: number) => (
          <Card key={i} title={a} subtitle="Stream • Purchase" />
        ))}
      </Section>

      <Section title="Popular Songs" icon={<PlayCircle />}>
        {profile.singles.map((s: string, i: number) => (
          <Card key={i} title={s} subtitle="Play now" />
        ))}
      </Section>

      <Section title="Events" icon={<Ticket />}>
        {profile.events.map((e: any, i: number) => (
          <Card
            key={i}
            title={e.title}
            subtitle={e.ticketed ? "🎟 Ticketed Event" : "Free Event"}
          />
        ))}
      </Section>

      <Section title="Support & Monetization" icon={<DollarSign />}>
        <Card title="Support the Ministry" subtitle="Donate • Subscribe • Partner" />
        <Card title="Exclusive Content" subtitle="Members-only access" />
      </Section>
    </ProfileShell>
  );
}

/* =========================
   SHARED COMPONENTS
   ========================= */

function ProfileShell({
  children,
  glow,
}: {
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <div className="relative min-h-screen bg-black text-white pb-24 overflow-hidden">
      {glow && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#53fc18]/10 blur-3xl rounded-full animate-pulse" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#53fc18]/5 blur-3xl rounded-full animate-pulse" />
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 space-y-14">
        {children}
      </div>
    </div>
  );
}

function ProfileHero({
  profile,
  icon,
  large,
}: {
  profile: any;
  icon: React.ReactNode;
  large?: boolean;
}) {
  return (
    <section className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(83,252,24,0.25)]">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div
          className={`${
            large ? "w-36 h-36" : "w-28 h-28"
          } rounded-full overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(83,252,24,0.4)]`}
        >
          <img src={profile.avatar_url} className="w-full h-full object-cover" />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold neon-text flex items-center gap-2">
            {profile.display_name}
            <Sparkles className="w-5 h-5 neon-text animate-pulse" />
          </h1>

          <p className="text-sm text-gray-400 mt-3 max-w-xl">
            {profile.bio}
          </p>

          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <button className="neon-button flex items-center gap-2 text-sm">
              {icon}
              Follow
            </button>

            <button className="px-5 py-3 rounded-lg bg-black border border-white/15 text-sm hover:border-white/30 transition flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Go Live
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

function Card({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4 hover:neon-border transition">
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}
