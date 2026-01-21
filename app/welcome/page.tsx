"use client";

import Link from "next/link";
import { Sparkles, Play, Music2, Mic2, Users, TrendingUp } from "lucide-react";
import ParableParticles from "@/components/ParableParticles";
import useReveal from "@/components/useReveal";
import { createClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

export default function WelcomePage() {
  const supabase = createClient();
  const router = useRouter(); 
  
  const reveal1 = useReveal();
  const reveal3 = useReveal();
  const reveal4 = useReveal();

  const [trending, setTrending] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    loadTrending();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadTrending() {
    setLoading(true);
    const combined: any[] = []; 
    setTrending(combined);
    setLoading(false);
  }

  const handleAuthRedirect = (e: React.MouseEvent, authenticatedUrl?: string) => {
    if (user) {
      if (authenticatedUrl) router.push(authenticatedUrl);
      else router.push("/dashboard"); 
    } else {
      router.push("/login");
    }
  };


  return (
    <div className="min-h-screen bg-black text-white pb-24 overflow-x-hidden font-sans relative">
      <ParableParticles />

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 md:pb-32 z-10">
        <div ref={reveal1} className="relative z-20 space-y-8 text-center md:text-left">
          <h1 className="text-3xl md:text-7xl font-black leading-tight tracking-[6px] md:tracking-[20px] uppercase text-[#00f2ff] drop-shadow-[0_0_30px_rgba(0,242,255,0.5)] animate-pulse-slow">
            Stream • Create 
            <br className="hidden md:block" />
            Worship • Connect
          </h1>

          <p className="text-gray-400 max-w-2xl text-xs md:text-lg leading-relaxed tracking-[2px] md:tracking-[3px] uppercase mx-auto md:mx-0">
            A faith-centered streaming platform designed for the global gospel community.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center md:justify-start">
            <button
              onClick={(e) => handleAuthRedirect(e, "/feed")}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-12 py-4 border border-[#00f2ff] text-[#00f2ff] font-bold uppercase tracking-[4px] hover:bg-[#00f2ff] hover:text-black transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current" />
              Enter Hub
            </button>

            <Link
              href="/onboarding"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-12 py-4 border border-white/20 text-white font-bold uppercase tracking-[4px] hover:bg-white/10 transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
      

      {/* FEATURE GRID */}
      <section ref={reveal4} className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
        {[
          { icon: Mic2, title: "Ministries", desc: "Stream sermons, conferences, and teaching series.", url: "/ministries" },
          { icon: Music2, title: "Musicians", desc: "Host shed rooms and musical collaborations.", url: "/musicians" },
          // UPDATED: Title changed from "Community" to "Fellowship"
          { icon: Users, title: "Fellowship", desc: "Build global fellowship and breakout rooms.", url: "/community" }
        ].map((feat, idx) => (
          <button
            key={idx}
            onClick={(e) => handleAuthRedirect(e, feat.url)}
            className="border border-white/10 p-8 bg-[#0a141e44] transition-all hover:border-[#00f2ff] text-left"
          >
            <feat.icon className="w-10 h-10 text-[#00f2ff] mb-6" />
            <h3 className="text-lg md:text-xl font-bold mb-4 tracking-[4px] uppercase text-[#00f2ff]">
              {feat.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed tracking-[1px]">
              {feat.desc}
            </p>
          </button>
        ))}
      </section>
      
      {/* Add custom CSS keyframe animations using Tailwind's arbitrary properties */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 10px rgba(0, 242, 255, 0.5), 0 0 20px rgba(0, 242, 255, 0.3), 0 0 30px rgba(0, 242, 255, 0.1);
          }
          50% {
            opacity: 0.8;
            text-shadow: 0 0 5px rgba(0, 242, 255, 0.3), 0 0 10px rgba(0, 242, 255, 0.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-glow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
