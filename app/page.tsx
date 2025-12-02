"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Play } from "lucide-react";

export default function FlashLandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      router.push("/feed");
    }, 5000); // now lasts 5 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">

      {/* NEON PARTICLES */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#53fc18] rounded-full opacity-80 animate-ping"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* GLOWING AURA */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(83,252,24,0.2),_transparent_70%)] animate-[spin_20s_linear_infinite] opacity-60" />

      {/* SCANLINE OVERLAY */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.09] bg-[url('/scanline.png')] mix-blend-soft-light" />

      {/* FLOATING ICON */}
      <div className="absolute top-10 right-10 opacity-80 animate-bounce">
        <Sparkles className="w-10 h-10 text-[#53fc18]" />
      </div>

      {/* HERO CONTENT */}
      <div
        className={`relative z-10 text-center transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-6xl font-black tracking-tight text-[#53fc18] neon-text mb-3">
          PARABLE
        </h1>

        <p className="text-gray-300 text-lg mb-6 px-8 leading-relaxed">
          Stream • Create • Worship • Connect.
          <br />
          A home for believers, creators, and gospel musicians.
        </p>

        <Link
          href="/feed"
          className="neon-button inline-flex items-center gap-3 px-10 py-3 rounded-2xl text-xl"
        >
          Enter Parable
          <Play className="w-5 h-5" />
        </Link>

        <p className="text-xs text-gray-500 mt-4">
          Auto-navigating to your feed…
        </p>
      </div>
    </div>
  );
}
