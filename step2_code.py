import os

print("📝 Writing Code Files...")

# 1. THE DRILLDOWN PAGE (Course Details)
library_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { PlayCircle, Download, FileText, CheckCircle, ArrowLeft } from "lucide-react";

export default function LibraryItemPage({ params }: { params: { id: string } }) {
  const isLeadership = params.id === "leadership";
  const title = isLeadership ? "Leadership Masterclass" : "The 2024 Vision Conference";
  const author = isLeadership ? "Bishop J.D. Rivers" : "Nexus Conference";
  const banner = isLeadership ? "/course_lead.jpg" : "/course_conf.jpg";

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
                <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10 relative group cursor-pointer">
                    <img src={banner} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="w-20 h-20 text-white drop-shadow-2xl group-hover:scale-110 transition" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Resume</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-2 uppercase">{title}</h1>
                <p className="text-xl text-violet-400 font-bold mb-4">{author}</p>
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 mb-6">
                    <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
                        <span>Course Progress</span>
                        <span>65% Complete</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-[65%] bg-violet-500 rounded-full" />
                    </div>
                </div>
                <button className="bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition">
                    Continue Watching
                </button>
            </div>
        </div>
      </main>
    </div>
  );
}
"""

# 2. THE DASHBOARD (With Fixed Images & Links)
dashboard_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";

export default function Dashboard() {
  const liveNow = [creators[0], artists[0]];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold">Welcome back, Joshua</h1>
                <p className="text-gray-400">You have 3 new notifications.</p>
            </div>
            <button className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition">Edit Profile</button>
        </div>

        {/* LIVE NOW */}
        <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> Live Channels You Follow
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveNow.map((item: any, i) => (
                    <Link href={item.ministry ? `/creator/${item.slug}` : `/artist/${item.slug}`} key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900 hover:border-violet-500/50 transition duration-300">
                        <div className="absolute inset-0">
                            <img src={item.bannerUrl} className="h-full w-full object-cover opacity-50 group-hover:scale-105 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                        <div className="relative p-6 h-64 flex flex-col justify-end">
                            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">LIVE</div>
                            <div className="flex items-center gap-3 mb-2">
                                <img src={item.avatarUrl} className="w-10 h-10 rounded-full border-2 border-white" />
                                <span className="font-bold">{item.name}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1 leading-tight">{item.liveStream ? item.liveStream.title : item.liveStreamTitle}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* YOUR LIBRARY */}
        <section className="mb-12">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Your Library</h2>
                <span className="text-sm text-gray-400 cursor-pointer hover:text-white">View All</span>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <Link href="/library/leadership" className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 cursor-pointer transition group">
                    <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-3 relative overflow-hidden">
                         <img src="/course_lead.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                         <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <p className="font-medium text-sm truncate group-hover:text-violet-400 transition">Leadership Masterclass</p>
                    <p className="text-xs text-green-400">Purchased</p>
                </Link>

                <Link href="/library/vision" className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 cursor-pointer transition group">
                    <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-3 relative overflow-hidden">
                         <img src="/course_conf.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                         <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <p className="font-medium text-sm truncate group-hover:text-violet-400 transition">2024 Vision Conference</p>
                    <p className="text-xs text-green-400">Purchased</p>
                </Link>

                <Link href="/library/worship" className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 cursor-pointer transition group">
                    <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-3 relative overflow-hidden">
                         <img src="/course_music.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                         <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <p className="font-medium text-sm truncate group-hover:text-violet-400 transition">Worship Arts Vol. 2</p>
                    <p className="text-xs text-green-400">Purchased</p>
                </Link>
             </div>
        </section>
      </main>
    </div>
  );
}
"""

# Write the files
lib_path = "app/library/[id]/page.tsx"
os.makedirs(os.path.dirname(lib_path), exist_ok=True)
with open(lib_path, "w", encoding="utf-8") as f:
    f.write(library_code)
print(f"✅ Created: {lib_path}")

dash_path = "app/dashboard/page.tsx"
with open(dash_path, "w", encoding="utf-8") as f:
    f.write(dashboard_code)
print(f"✅ Created: {dash_path}")