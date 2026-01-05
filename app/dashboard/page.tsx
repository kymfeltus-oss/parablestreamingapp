"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

type PostRow = {
  id: string;
  created_at?: string;
  content?: string | null;
  type?: string | null;
  user_id?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [postsLoading, setPostsLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<PostRow[]>([]);

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

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setPostsLoading(true);

        const { data, error } = await supabase
          .from("posts")
          .select("id, created_at, content, type, user_id, display_name, avatar_url")
          .order("created_at", { ascending: false })
          .limit(8);

        if (error) {
          setRecentPosts([]);
          setPostsLoading(false);
          return;
        }

        setRecentPosts((data || []) as PostRow[]);
        setPostsLoading(false);
      } catch {
        setRecentPosts([]);
        setPostsLoading(false);
      }
    };

    if (!loading) loadPosts();
  }, [loading, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const accountType = user.user_metadata?.accountType || "viewer";
  const isCreator = accountType === "creator";

  const go = (path: string) => router.push(path);

  const nowIso = new Date().toISOString();

  const seededSeries = useMemo(() => {
    const seeds = Number(profile?.seeds_balance || 0);
    const followers = Number(profile?.followers_count || 0);
    const following = Number(profile?.following_count || 0);

    const mk = (base: number) => {
      const arr: number[] = [];
      let v = Math.max(1, base);
      for (let i = 0; i < 14; i++) {
        const wobble = ((i * 17) % 9) - 4;
        v = Math.max(0, v + wobble);
        arr.push(v);
      }
      return arr;
    };

    return {
      seeds: mk(seeds),
      followers: mk(followers),
      following: mk(following),
      streams: mk(8),
      uploads: mk(12),
      engagement: mk(22),
    };
  }, [profile?.seeds_balance, profile?.followers_count, profile?.following_count]);

  const systemStatus = useMemo(() => {
    return [
      { label: "Auth", state: "online" as const },
      { label: "Feed", state: "online" as const },
      { label: "Upload", state: "standby" as const },
      { label: "Go Live", state: "standby" as const },
      { label: "Moderation", state: "online" as const },
    ];
  }, []);

  const spotlight = useMemo(() => {
    const displayName = profile?.display_name || "Creator";
    return {
      title: isCreator ? "Spotlight" : "Featured Creator",
      headline: isCreator ? "Your next stream deserves a moment" : "Discover a creator today",
      sub:
        isCreator
          ? "Set your stream title, upload a clip, or post a Praise Break. Everything routes safely while scripts are wired."
          : "Browse streamers and content. Everything routes safely while scripts are wired.",
      primaryLabel: isCreator ? "Prepare Go Live" : "Explore Streamers",
      primaryPath: isCreator ? "/dashboard/coming-soon/live" : "/dashboard/coming-soon/streamers",
      secondaryLabel: isCreator ? "Upload Clip" : "Open Feed",
      secondaryPath: isCreator ? "/dashboard/coming-soon/upload" : "/feed",
      badge: isCreator ? `Welcome back, ${displayName}` : "Parable Spotlight",
    };
  }, [isCreator, profile?.display_name]);

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <GlobalStyles />

      <HeaderBar
        avatarUrl={profile?.avatar_url || "/avatar-placeholder.png"}
        displayName={profile?.display_name || "User"}
        accountType={accountType}
        onEditProfile={() => go("/profile-setup")}
      />

      <CommandStrip
        isCreator={isCreator}
        onGoLive={() => go("/dashboard/coming-soon/live")}
        onUpload={() => go("/dashboard/coming-soon/upload")}
        onFeed={() => go("/feed")}
        onCreatorProfile={() => go("/profile-setup")}
        onApplyCreator={() => go("/creator/apply")}
        onAnalytics={() => go("/dashboard/coming-soon/stats")}
        onMonetization={() => go("/dashboard/coming-soon/earnings")}
        onCommunity={() => go("/dashboard/coming-soon/community")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-5">
          <SpotlightCard
            title={spotlight.title}
            badge={spotlight.badge}
            headline={spotlight.headline}
            sub={spotlight.sub}
            primaryLabel={spotlight.primaryLabel}
            primaryPath={spotlight.primaryPath}
            secondaryLabel={spotlight.secondaryLabel}
            secondaryPath={spotlight.secondaryPath}
            go={go}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatChip
              label="Seeds"
              value={profile?.seeds_balance || 0}
              hint="Open seeds panel"
              onClick={() => go("/dashboard/coming-soon/seeds")}
              series={seededSeries.seeds}
            />
            <StatChip
              label="Following"
              value={profile?.following_count || 0}
              hint="Open following"
              onClick={() => go("/dashboard/coming-soon/following")}
              series={seededSeries.following}
            />
            <StatChip
              label="Account"
              value={accountType}
              hint="Open account"
              onClick={() => go("/dashboard/coming-soon/account")}
              series={seededSeries.engagement}
            />
            <StatChip
              label="Profile"
              value="Edit"
              hint="Edit profile"
              onClick={() => go("/profile-setup")}
              series={seededSeries.uploads}
            />
          </div>

          <Panel title="Live Activity" subtitle="Latest posts from the global feed" rightSlot={<SmallLink label="Open Feed" onClick={() => go("/feed")} />}>
            {postsLoading ? (
              <div className="text-gray-400 text-sm">Loading activity…</div>
            ) : recentPosts.length === 0 ? (
              <div className="text-gray-400 text-sm">
                No activity available yet. This will populate as users post.
              </div>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((p) => (
                  <ActivityRow
                    key={p.id}
                    avatarUrl={p.avatar_url || "/avatar-placeholder.png"}
                    name={p.display_name || "User"}
                    type={p.type || "post"}
                    content={p.content || ""}
                    createdAt={p.created_at || nowIso}
                    onClick={() => go("/feed")}
                  />
                ))}
              </div>
            )}
          </Panel>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <Panel title="System Status" subtitle="Realtime readiness indicators">
            <div className="grid grid-cols-1 gap-3">
              {systemStatus.map((s) => (
                <StatusRow key={s.label} label={s.label} state={s.state} />
              ))}
            </div>
          </Panel>

          <Panel
            title="Creator Performance"
            subtitle={isCreator ? "Quick look at growth signals" : "Creator tools unlocked after creator status"}
            rightSlot={
              <SmallLink
                label={isCreator ? "Open Analytics" : "Become a Creator"}
                onClick={() => (isCreator ? go("/dashboard/coming-soon/stats") : go("/creator/apply"))}
              />
            }
          >
            <div className="space-y-4">
              <MetricRow
                label="Followers"
                value={isCreator ? profile?.followers_count || 0 : "Locked"}
                series={seededSeries.followers}
                dim={!isCreator}
                onClick={() => go("/dashboard/coming-soon/followers")}
              />
              <MetricRow
                label="Streams"
                value={isCreator ? 0 : "Locked"}
                series={seededSeries.streams}
                dim={!isCreator}
                onClick={() => go("/dashboard/coming-soon/streams")}
              />
              <MetricRow
                label="Uploads"
                value={isCreator ? 0 : "Locked"}
                series={seededSeries.uploads}
                dim={!isCreator}
                onClick={() => go("/dashboard/coming-soon/upload")}
              />
              <MetricRow
                label="Engagement"
                value={isCreator ? "Rising" : "Locked"}
                series={seededSeries.engagement}
                dim={!isCreator}
                onClick={() => go("/dashboard/coming-soon/community")}
              />
            </div>
          </Panel>

          <Panel title="Quick Launch" subtitle="Reserved routes while scripts are wired">
            <div className="grid grid-cols-2 gap-3">
              <ActionTile title="Go Live" sub="Broadcast" onClick={() => go("/dashboard/coming-soon/live")} />
              <ActionTile title="Upload" sub="Clips" onClick={() => go("/dashboard/coming-soon/upload")} />
              <ActionTile title="Monetize" sub="Earnings" onClick={() => go("/dashboard/coming-soon/earnings")} />
              <ActionTile title="Community" sub="Followers" onClick={() => go("/dashboard/coming-soon/community")} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function HeaderBar({
  avatarUrl,
  displayName,
  accountType,
  onEditProfile,
}: {
  avatarUrl: string;
  displayName: string;
  accountType: string;
  onEditProfile: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900 p-5">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent" />
      <div className="relative flex items-center gap-4">
        <div className="relative">
          <img
            src={avatarUrl}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-green-500/40"
          />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 shadow-[0_0_18px_rgba(34,197,94,0.75)] animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xl font-bold tracking-wide truncate">{displayName}</div>
          <div className="text-xs text-gray-400 capitalize">{accountType} access</div>
        </div>
        <button
          onClick={onEditProfile}
          className="rounded-xl bg-green-500 hover:bg-green-400 text-black px-4 py-2 font-semibold transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

function CommandStrip({
  isCreator,
  onGoLive,
  onUpload,
  onFeed,
  onCreatorProfile,
  onApplyCreator,
  onAnalytics,
  onMonetization,
  onCommunity,
}: {
  isCreator: boolean;
  onGoLive: () => void;
  onUpload: () => void;
  onFeed: () => void;
  onCreatorProfile: () => void;
  onApplyCreator: () => void;
  onAnalytics: () => void;
  onMonetization: () => void;
  onCommunity: () => void;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-3">
      <div className="flex items-center gap-2 overflow-x-auto">
        <CommandButton label="Feed" hint="Open posts" onClick={onFeed} />
        {isCreator ? (
          <>
            <CommandButton label="Go Live" hint="Broadcast" onClick={onGoLive} />
            <CommandButton label="Upload" hint="Clips" onClick={onUpload} />
            <CommandButton label="Analytics" hint="Stats" onClick={onAnalytics} />
            <CommandButton label="Monetize" hint="Earnings" onClick={onMonetization} />
            <CommandButton label="Community" hint="Followers" onClick={onCommunity} />
            <CommandButton label="Creator Profile" hint="Edit" onClick={onCreatorProfile} />
          </>
        ) : (
          <>
            <CommandButton label="Become a Creator" hint="Apply" onClick={onApplyCreator} />
            <CommandButton label="Profile" hint="Edit" onClick={onCreatorProfile} />
          </>
        )}
      </div>
    </div>
  );
}

function CommandButton({
  label,
  hint,
  onClick,
}: {
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-xl bg-black/40 hover:bg-black/60 border border-green-500/25 hover:border-green-500/50
                 px-4 py-2 transition relative overflow-hidden"
    >
      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-r from-green-500/10 to-transparent" />
      <div className="relative">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-[11px] text-gray-400">{hint}</div>
      </div>
    </button>
  );
}

function SpotlightCard({
  title,
  badge,
  headline,
  sub,
  primaryLabel,
  primaryPath,
  secondaryLabel,
  secondaryPath,
  go,
}: {
  title: string;
  badge: string;
  headline: string;
  sub: string;
  primaryLabel: string;
  primaryPath: string;
  secondaryLabel: string;
  secondaryPath: string;
  go: (path: string) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900 p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/12 via-transparent to-transparent" />
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-green-500/10 blur-3xl animate-float" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-300 bg-black/40 border border-green-500/20 px-2 py-1 rounded-lg">
              {title}
            </span>
            <span className="text-xs text-green-400">{badge}</span>
          </div>
          <div className="text-2xl font-bold tracking-wide">{headline}</div>
          <div className="text-sm text-gray-400 mt-2">{sub}</div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => go(primaryPath)}
            className="rounded-xl bg-green-500 hover:bg-green-400 text-black px-5 py-3 font-semibold transition"
          >
            {primaryLabel}
          </button>
          <button
            onClick={() => go(secondaryPath)}
            className="rounded-xl border border-green-500/40 hover:border-green-500/70 text-green-400 px-5 py-3 font-semibold transition"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  rightSlot,
  children,
}: {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="text-lg font-semibold tracking-wide">{title}</div>
          {subtitle ? <div className="text-xs text-gray-400 mt-1">{subtitle}</div> : null}
        </div>
        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </div>
      {children}
    </div>
  );
}

function SmallLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-xs text-green-400 hover:text-green-300 transition">
      {label}
    </button>
  );
}

function ActivityRow({
  avatarUrl,
  name,
  type,
  content,
  createdAt,
  onClick,
}: {
  avatarUrl: string;
  name: string;
  type: string;
  content: string;
  createdAt: string;
  onClick: () => void;
}) {
  const time = formatTimeAgo(createdAt);
  const trimmed = content.length > 140 ? content.slice(0, 140) + "…" : content;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl bg-black/35 hover:bg-black/55 border border-green-500/15 hover:border-green-500/30
                 p-4 transition"
    >
      <div className="flex items-start gap-3">
        <img src={avatarUrl} className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-semibold truncate">{name}</div>
            <span className="text-[11px] text-gray-500">{time}</span>
            <span className="ml-auto text-[11px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-lg">
              {type}
            </span>
          </div>
          <div className="text-sm text-gray-300 mt-1">{trimmed || "No text"}</div>
        </div>
      </div>
    </button>
  );
}

function StatusRow({
  label,
  state,
}: {
  label: string;
  state: "online" | "standby" | "offline";
}) {
  const map = {
    online: { text: "Online", dot: "bg-green-500", glow: "shadow-[0_0_16px_rgba(34,197,94,0.7)]" },
    standby: { text: "Standby", dot: "bg-green-500/60", glow: "shadow-[0_0_10px_rgba(34,197,94,0.35)]" },
    offline: { text: "Offline", dot: "bg-zinc-600", glow: "" },
  };

  const cfg = map[state];

  return (
    <div className="flex items-center justify-between rounded-2xl bg-black/35 border border-green-500/12 p-4">
      <div className="font-semibold">{label}</div>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} ${state !== "offline" ? "animate-pulse" : ""} ${cfg.glow}`} />
        <span className="text-sm text-gray-300">{cfg.text}</span>
      </div>
    </div>
  );
}

function StatChip({
  label,
  value,
  hint,
  onClick,
  series,
}: {
  label: string;
  value: string | number;
  hint: string;
  onClick: () => void;
  series: number[];
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition p-4 text-left relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-br from-green-500/10 to-transparent" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs text-gray-400">{label}</div>
            <div className="text-2xl font-bold text-green-400 mt-1 truncate">{String(value)}</div>
            <div className="text-[11px] text-gray-500 mt-1">{hint}</div>
          </div>
          <div className="shrink-0 mt-1">
            <Sparkline data={series} />
          </div>
        </div>
      </div>
    </button>
  );
}

function MetricRow({
  label,
  value,
  series,
  dim,
  onClick,
}: {
  label: string;
  value: string | number;
  series: number[];
  dim?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl bg-black/35 hover:bg-black/55 border border-green-500/12
                  p-4 transition ${dim ? "opacity-60" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">{label}</div>
          <div className="text-xs text-gray-400 mt-1">{String(value)}</div>
        </div>
        <Sparkline data={series} large />
      </div>
    </button>
  );
}

function ActionTile({
  title,
  sub,
  onClick,
}: {
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-black/35 hover:bg-black/55 border border-green-500/12 hover:border-green-500/25
                 p-4 transition relative overflow-hidden text-left"
    >
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-r from-green-500/10 to-transparent" />
      <div className="relative">
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-gray-400 mt-1">{sub}</div>
      </div>
    </button>
  );
}

function Sparkline({ data, large }: { data: number[]; large?: boolean }) {
  const w = large ? 120 : 80;
  const h = large ? 38 : 30;

  const max = Math.max(1, ...data);
  const min = Math.min(0, ...data);
  const span = Math.max(1, max - min);

  const pts = data
    .slice(-14)
    .map((v, i, arr) => {
      const x = (i / Math.max(1, arr.length - 1)) * (w - 2) + 1;
      const y = h - 2 - ((v - min) / span) * (h - 4);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-95">
      <defs>
        <linearGradient id={`g-${w}-${h}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(34,197,94,0.15)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0.75)" />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={`url(#g-${w}-${h})`}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={w - 2} cy={h / 2} r={0} />
    </svg>
  );
}

function formatTimeAgo(iso: string) {
  try {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const sec = Math.max(0, Math.floor((now - then) / 1000));
    if (sec < 60) return `${sec}s`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h`;
    const day = Math.floor(hr / 24);
    return `${day}d`;
  } catch {
    return "";
  }
}

function GlobalStyles() {
  return (
    <style>{`
      @keyframes floaty {
        0% { transform: translateY(0px); }
        50% { transform: translateY(10px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: floaty 6s ease-in-out infinite;
      }
    `}</style>
  );
}
