"use client";

import Navbar from "@/components/Navbar";
import { ArrowLeft, Play } from "lucide-react";

export default function ProfileVideosPage() {
  const miniVideos = [
    {
      title: "Don't Fall For The Trap",
      creator: "Mike Todd",
      embed: "https://www.youtube.com/embed/PqOUvrAP9Rc?si=EYD7rusFz3dHqNjV",
    },
    {
      title: "Winning Your Battles",
      creator: "Joyce Meyer",
      embed: "https://www.youtube.com/embed/Wgwog58pYJc?start=13",
    },
    {
      title: "When God Whispered to a Woman",
      creator: "Keion Henderson & Dr. Valerie Moore",
      embed: "https://www.youtube.com/embed/Xg7B07Kr1lU?start=14",
    },
    {
      title: "The Gift You Didn’t Ask For",
      creator: "Dr. Valerie Moore",
      embed: "https://www.youtube.com/embed/333eZPNy6kM?start=13",
    },
    {
      title: "I Survived the Rough Ride",
      creator: "John Heath II",
      embed: "https://www.youtube.com/embed/mJas2ZnJ9UQ?start=10",
    },
    {
      title: "No Weapon (Live)",
      creator: "Todd Dulaney",
      embed: "https://www.youtube.com/embed/_WdUIWfMDeU?start=12",
    },
    {
      title: "Deliver Me (Live)",
      creator: "Le’Andria Johnson",
      embed: "https://www.youtube.com/embed/Aj3dfAnUxyk",
    },
    {
      title: "Eva McCullar Interview",
      creator: "Gospel Artist Entertainment",
      embed: "https://www.youtube.com/embed/kMffpD5Gq7c?start=17",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-8">
        {/* Back */}
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-white mb-4"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </button>

        <h1 className="text-2xl font-black mb-4">Videos</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {miniVideos.map((v, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/60 transition group"
            >
              <div className="relative w-full pt-[56.25%] bg-black">
                <iframe
                  src={v.embed}
                  className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition"
                  allowFullScreen
                />
              </div>
              <div className="p-3 text-sm">
                <div className="font-bold mb-1 truncate flex items-center gap-1">
                  <Play className="w-3 h-3" /> {v.title}
                </div>
                <p className="text-[11px] text-gray-400 truncate">{v.creator}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
