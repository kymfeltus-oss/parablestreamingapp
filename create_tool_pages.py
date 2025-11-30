import os

print("🛠️ Recreating Essential Drilldown Pages...")

# --- 1. AI SERMON STUDIO PAGE (/tools/sermon-prep) ---
sermon_prep_code = """import Navbar from "@/components/Navbar";
import { Mic, FileText, Play, Wand2, ArrowLeft, CheckCircle2, SplitSquareHorizontal } from "lucide-react";
import Link from "next/link";

export default function SermonPrepPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition text-sm font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">AI Sermon Studio</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT: TELEPROMPTER / EDITOR */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 flex flex-col h-[600px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-violet-400" /> Sermon Editor
                    </h2>
                </div>
                <textarea 
                    className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-xl p-4 text-lg leading-relaxed text-gray-300 focus:outline-none focus:border-violet-500 resize-none"
                    placeholder="Paste your sermon notes or outline here..."
                    defaultValue="Topic: Faith in the Fire\n\n1. The Heat is Necessary\n- Gold is refined in fire.\n"
                ></textarea>
                <Link href="/stream/watch" className="mt-4 w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl uppercase text-xs tracking-wide flex items-center justify-center gap-2">
                     <Play className="w-4 h-4" /> Go Live with Teleprompter
                </Link>
            </div>

            {/* RIGHT: AI ANALYSIS & COMPARISON */}
            <div className="space-y-6">
                
                <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden">
                    <h3 className="text-2xl font-bold mb-2 text-blue-400">AI Accuracy Check</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Upload your live recording. AI will compare what you <em>said</em> vs. what you <em>wrote</em> to help you refine your delivery.
                    </p>
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl uppercase text-xs tracking-wide flex items-center justify-center gap-2">
                        <Mic className="w-4 h-4" /> Upload Audio for Analysis
                    </button>
                </div>

                <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <SplitSquareHorizontal className="w-5 h-5 text-orange-400" /> Smart Suggestions
                    </h3>
                    <button className="w-full bg-[#222] hover:bg-[#333] text-left px-4 py-3 rounded-lg text-sm text-gray-300 border border-white/5">
                        📖 Find scriptures on "Resilience"
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
"""

# --- 2. START SHED FORM PAGE (from previous turns) ---
start_shed_page_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Headphones, Radio, Mic2, Music, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function StartShedPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        
        <Link href="/music/shed" className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6 text-sm font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Shed Hub
        </Link>

        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-2">Start Your Session</h1>
            <p className="text-gray-400 mb-8 text-lg">Configure your room and let the community know what you're shedding.</p>

            <div className="space-y-6 max-w-xl">
                
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Room Name / Vibe</label>
                    <input type="text" placeholder="e.g., Late Night Organ Flow, Bass Practice..." className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Primary Instrument</label>
                        <select className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition appearance-none">
                            <option>🎹 Keys / Organ</option>
                            <option>🥁 Drums</option>
                            <option>🎸 Bass</option>
                            <option>🎤 Vocals</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Genre Focus</label>
                        <select className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition appearance-none">
                            <option>🔥 Gospel / Churchy</option>
                            <option>🎵 Jazz / Fusion</option>
                            <option>🎹 Neo-Soul</option>
                            <option>🎸 CCM / Worship</option>
                        </select>
                    </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <h3 className="font-bold text-orange-400 mb-3 text-sm uppercase">Audio Checklist</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Interface Connected</div>
                        <div className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Low Latency Mode: ON</div>
                    </div>
                </div>

                <Link href="/stream/watch" className="block w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-4 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20 text-center text-lg flex items-center justify-center gap-2">
                    <Radio className="w-6 h-6" /> Go Live Now
                </Link>

            </div>
        </div>
      </main>
    </div>
  );
}
"""

def write_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created/Updated: {path}")

write_file("app/tools/sermon-prep/page.tsx", sermon_prep_code)
write_file("app/music/shed/start/page.tsx", start_shed_page_code)