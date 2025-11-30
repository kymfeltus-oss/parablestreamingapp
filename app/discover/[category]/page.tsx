import Navbar from "@/components/Navbar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { ArrowLeft, Users } from "lucide-react";

// Helper function to normalize category names for comparison
const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  // Convert slug back to a displayable title
  const categoryTitle = categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Combine all content
  const allContent = [...creators, ...artists];

  // Filter content based on the category
  const filteredContent = categorySlug === 'all'
    ? allContent
    : allContent.filter(item => {
        // Check main category and tags
        const itemCategory = item.liveStream?.category || (item as any).genre;
        const tags = item.tags || [];
        return (itemCategory && normalize(itemCategory) === categorySlug) ||
               tags.some(tag => normalize(tag) === categorySlug);
      });

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Back Button */}
        <Link href="/discover" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
            <ArrowLeft className="w-5 h-5" /> Back to Discover
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">{categoryTitle}</h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredContent.map((item: any, i) => (
                <Link href={item.ministry ? `/creator/${item.slug}` : `/artist/${item.slug}`} key={i} className="group cursor-pointer">
                    <div className="relative aspect-video bg-[#111] rounded-xl overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-violet-500 transition duration-300">
                        <img
                            src={item.bannerUrl}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        {item.liveStream?.isLive && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">LIVE</div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <Users className="w-3 h-3 text-violet-400" />
                            {item.liveStream?.viewers.toLocaleString() || "Offline"}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img src={item.avatarUrl} className="w-10 h-10 rounded-full object-cover bg-[#222]" />
                        <div>
                            <h3 className="font-bold text-gray-100 text-[15px] leading-tight group-hover:text-violet-400 transition">
                                {item.liveStream?.title || item.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{item.ministry || item.genre}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        {filteredContent.length === 0 && (
            <p className="text-gray-400 text-center mt-20">No content found for this category yet.</p>
        )}
      </main>
    </div>
  );
}
