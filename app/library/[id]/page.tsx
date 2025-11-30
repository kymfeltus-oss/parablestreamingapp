import Navbar from "@/components/Navbar";
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
