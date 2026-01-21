"use client";

import Link from "next/link";
import { Users, Home, Plus, ShieldCheck } from "lucide-react";

export default function Sidebar({ profile }: { profile: any }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-black border-r border-white/10 px-4 py-6 h-screen sticky top-0">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-[#00f2ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)]">
           <span className="text-black font-black italic text-xl">P</span>
        </div>
        <p className="text-[12px] font-black uppercase tracking-[5px] text-white">Parable</p>
      </div>

      <nav className="mb-10 space-y-2">
        <Link href="/feed" className="flex items-center gap-3 px-3 py-2.5 text-[#00f2ff] bg-[#00f2ff]/5 rounded-lg border border-[#00f2ff]/20 transition-all">
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-black tracking-widest uppercase">Live Feed</span>
        </Link>
      </nav>

      <div className="mb-10">
        <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] mb-4 px-3 flex items-center gap-2">
          <ShieldCheck className="w-3 h-3 text-[#00f2ff]" /> System Owner
        </h3>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-[#00f2ff] shadow-[0_0_12px_rgba(0,242,255,0.4)] overflow-hidden bg-zinc-900">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Owner" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[12px] text-[#00f2ff] font-black">{profile?.username?.charAt(0) || 'P'}</div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00f2ff] border-2 border-black rounded-full shadow-[0_0_8px_#00f2ff]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-black text-white truncate uppercase tracking-tighter">
              {profile?.username || 'ADMIN_LINK'}
            </span>
            <span className="text-[8px] text-[#00f2ff] font-mono animate-pulse uppercase">Active</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
        <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] mb-4 px-3 flex items-center gap-2">
          <Users className="w-3 h-3 text-[#00f2ff]" /> Your Squad
        </h3>
        <div className="px-3 py-4 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 text-center group hover:border-[#00f2ff]/40 transition-all cursor-pointer">
          <Plus className="w-4 h-4 text-gray-600 group-hover:text-[#00f2ff]" />
          <p className="text-[8px] text-gray-600 uppercase font-black group-hover:text-white">Add Friends</p>
        </div>
      </div>
    </aside>
  );
}