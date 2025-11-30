// app/creator/[slug]/page.tsx

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { Users, Sparkles, Gift, Crown, Video, Play, Star } from "lucide-react"; // Added Star icon

const tabs = ["Home", "Videos", "Clips", "About", "Chat"] as const;
type TabKey = (typeof tabs)[number];

// Data structure for a creator profile
interface CreatorData {
    name: string;
    tagline: string;
    description: string;
    banner: string;
    avatar: string;
    followers: string;
}

// A simple local data fetching simulation based on the slug
const fetchCreatorData = (slug: string): CreatorData | null => {
  // Use the specific paths provided by the user
  if (slug === "steven-furtick") {
    return {
      name: "Pastor Steven Furtick",
      tagline: "ELEVATION CHURCH",
      description: "Founder and Lead Pastor of Elevation Church, known for powerful biblical teaching and global impact. This page showcases his dedicated creator profile.",
      banner: "/steven-furtick-banner.jpg", // From "C:\Users\kymfe\nexus-platform\public\steven-furtick-banner.jpg"
      avatar: "/steven-furtick.jpg", // From "C:\Users\kymfe\nexus-platform\public\steven-furtick.jpg"
      followers: "450K",
    };
  }
  
  // Default data for any other generic creator slug that lands on this page
  return {
    name: slug
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" "),
    tagline: "Generic Creator Tagline",
    description: "This is a placeholder description for the creator.",
    banner: "/default-banner.jpg", // Placeholder default banner
    avatar: "", // Handled by initials if empty
    followers: "0",
  };
};

export default function GenericCreatorProfile() {
  const [activeTab, setActiveTab] = useState<TabKey>("Home");
  const params = useParams();
  const slug = params?.slug as string;
  const creator = fetchCreatorData(slug);

  if (!creator) {
    return <div className="text-white p-4">Creator not found.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto mt-6">

        {/* HERO/BANNER SECTION (uses image instead of generic player) */}
        <section className="relative">
          <img src={creator.banner} alt={`${creator.name} banner`} className="w-full h-80 object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
            
          {/* Profile Info Overlay */}
          <div className="absolute bottom-[-50px] left-10 flex items-end">
            {creator.avatar ? (
                <img 
                    src={creator.avatar} 
                    alt={`${creator.name} avatar`} 
                    className="w-32 h-32 rounded-full border-4 border-black object-cover" 
                />
            ) : (
                <div className="w-32 h-32 rounded-full border-4 border-black bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center text-4xl font-bold">
                    {creator.name.charAt(0)}
                </div>
            )}
            <div className="ml-4 mb-4">
              <h1 className="text-4xl font-bold">{creator.name}</h1>
              <p className="text-violet-400">{creator.tagline}</p>
            </div>
          </div>
        </section>

        {/* Description and Action Buttons Section */}
        <section className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="max-w-2xl text-gray-400 text-sm">
                    {creator.description}
                </p>
                
                {/* ACTIONS */}
                <div className="flex gap-2 flex-wrap sm:justify-end">
                    <button className="bg-red-600 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" /> Follow
                    </button>
                    <button className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1">
                        <Gift className="w-3 h-3" /> Send Seeds
                    </button>
                </div>
            </div>
        </section>


        {/* TABS */}
        <section className="border-b border-white/10 px-4 sm:px-6 lg:px-8 pb-2 flex gap-4 text-xs font-bold uppercase tracking-wide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 ${
                activeTab === tab ? "text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </section>

        {/* TAB CONTENT */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6">
          {activeTab === "Home" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Play className="w-4 h-4" /> Latest Content
              </h2>
              <p className="text-sm text-gray-300">
                This creator hasn&apos;t connected any content yet. Check back soon for live streams and videos.
              </p>
            </div>
          )}

          {activeTab === "Videos" && (
            <div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Video className="w-4 h-4" /> Videos
              </h2>
              <p className="text-xs text-gray-400">No videos have been added yet.</p>
            </div>
          )}

          {activeTab === "Clips" && (
            <p className="text-xs text-gray-400">No clips available yet.</p>
          )}

          {activeTab === "About" && (
            <div className="text-sm text-gray-400">
                <p>
                    {creator.description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                    <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {creator.followers} followers
                    </span>
                    <span className="flex items-center gap-1">
                        <Crown className="w-3 h-3 text-yellow-400" /> Level 1
                    </span>
                </div>
            </div>
          )}

          {activeTab === "Chat" && (
            <div className="bg-[#111] border border-white/10 p-4 rounded-xl">
              <p className="text-xs text-gray-400">Chat will be available when this creator is live.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
