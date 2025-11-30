import Navbar from "@/components/Navbar";
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
                    defaultValue="Topic: Faith in the Fire

1. The Heat is Necessary
- Gold is refined in fire.
"
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
