"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
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
        Entering Parable…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* ENERGY BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-black" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full animate-pulse-slower" />
      </div>

      {/* WORLD CONTENT */}
      <div className="relative z-10 px-6 py-8 space-y-10">

        {/* PRESENCE HEADER */}
        <div className="flex items-center gap-4">
          <img
            src={profile?.avatar_url || "/avatar-placeholder.png"}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-green-500/50"
          />
          <div>
            <div className="text-xl font-bold tracking-wide">
              {profile?.display_name || "Creator"}
            </div>
            <div className="text-sm text-green-400/80">
              You are inside Parable
            </div>
          </div>
        </div>

        {/* WORLD ZONES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* FEED ZONE */}
          <WorldNode
            title="Community Pulse"
            description="See what’s moving right now"
            glow
            onClick={() => router.push("/feed")}
          />

          {/* GO LIVE ZONE */}
          <WorldNode
            title="Live District"
            description="Broadcast into the world"
            primary
            onClick={() => router.push("/go-live")}
          />

          {/* UPLOAD ZONE */}
          <WorldNode
            title="Creator Studio"
            description="Upload and prepare content"
            onClick={() => router.push("/dashboard/coming-soon/upload")}
          />
        </div>

        {/* AMBIENT ACTIVITY */}
        <div className="text-xs text-gray-400 tracking-wide">
          Signals are moving. Something is about to happen.
        </div>
      </div>

      {/* MOTION STYLES */}
      <style>{`
        @keyframes pulseSlow {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.6; transform: scale(1); }
        }
        @keyframes pulseSlower {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
          100% { opacity: 0.4; transform: scale(1); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulseSlower 9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ---------- WORLD NODE ---------- */

function WorldNode({
  title,
  description,
  onClick,
  primary,
  glow,
}: {
  title: string;
  description: string;
  onClick: () => void;
  primary?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-3xl p-6 transition transform hover:-translate-y-1
        ${primary ? "bg-green-500 text-black" : "bg-zinc-900 text-white"}
        ${glow ? "shadow-[0_0_40px_rgba(34,197,94,0.35)]" : ""}
      `}
    >
      <div className="text-lg font-bold mb-2">{title}</div>
      <div className={`text-sm ${primary ? "text-black/80" : "text-gray-400"}`}>
        {description}
      </div>
    </div>
  );
}
