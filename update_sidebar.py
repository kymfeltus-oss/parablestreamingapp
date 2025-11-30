import os

print("📝 Updating Sidebar with T.D. Jakes & Kirk Franklin...")

sidebar_code = """import Link from "next/link";
import { Users, Zap, Radio, Heart, Flame, Compass } from "lucide-react";

// UPDATED: Now using Real Names & Images
const trending = [
  { name: "Bishop T.D. Jakes", view: "12.4k", cat: "Real Talk", live: true, img: "/td_avatar.png" },
  { name: "Kirk Franklin", view: "8.2k", cat: "Worship Vibes", live: true, img: "/kirk_avatar.png" },
  { name: "C-Dub", view: "1.5k", cat: "The Shed", live: true, img: "/course_music.jpg" },
  { name: "Pastor Hart", view: "5.1k", cat: "Healing", live: true, img: null },
  { name: "YouthNation", view: "1.1k", cat: "The Gen", live: false, img: null },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-14 bottom-0 bg-[#090909] border-r border-white/5 overflow-y-auto p-4 z-30">
      
      {/* SECTION 1: YOUR SQUAD */}
      <div className="mb-8">
        <h3 className="text-[11px] font-extrabold text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <Heart className="w-3 h-3" /> Your Squad
        </h3>
        <div className="space-y-1">
            {trending.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-800 border-2 border-transparent group-hover:border-violet-500 relative overflow-hidden transition">
                             {/* Show Real Image if available, otherwise gradient */}
                             {c.img ? (
                                <img src={c.img} className="w-full h-full object-cover" />
                             ) : (
                                <div className="absolute inset-0 bg-gradient-to-tr from-violet-800 to-black" />
                             )}
                        </div>
                        <div className="flex flex-col">
                             <div className="text-sm font-bold text-gray-200 group-hover:text-white truncate w-24">{c.name}</div>
                             <div className="text-[10px] text-gray-500 group-hover:text-violet-400">{c.cat}</div>
                        </div>
                    </div>
                    {c.live && (
                        <div className="flex items-center gap-1 text-xs font-bold text-red-500">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            {c.view}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* SECTION 2: POPPING OFF */}
      <div className="mb-6">
        <h3 className="text-[11px] font-extrabold text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <Flame className="w-3 h-3 text-orange-500" /> Popping Off
        </h3>
        <div className="space-y-2">
            {trending.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-800 border border-white/5 relative overflow-hidden">
                             {c.img ? (
                                <img src={c.img} className="w-full h-full object-cover" />
                             ) : (
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-black" />
                             )}
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-bold text-gray-200 group-hover:text-white truncate w-24">{c.name}</div>
                            <div className="text-[10px] text-gray-500">{c.cat}</div>
                        </div>
                    </div>
                    {c.live && (
                        <div className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400">
                            {c.view}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
      
      {/* FOOTER */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs py-3 rounded-lg hover:brightness-110 transition shadow-lg shadow-violet-900/20">
            📡 GO LIVE
        </button>
      </div>
    </aside>
  );
}
"""

with open("components/Sidebar.tsx", "w", encoding="utf-8") as f:
    f.write(sidebar_code)
print("✅ Updated: components/Sidebar.tsx")