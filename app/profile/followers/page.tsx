"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const followers = [
  { name: "KingdomDrummer", handle: "@drums4church", avatar: "/course_music.jpg" },
  { name: "SynthLord", handle: "@auxkeys", avatar: "/course_conf.jpg" },
  { name: "SarahSings", handle: "@vocalszn", avatar: "/course_lead.jpg" },
];

export default function FollowersPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-8">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-white mb-4"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </button>

        <h1 className="text-2xl font-black mb-4">Followers</h1>

        <div className="space-y-3">
          {followers.map((f, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#111] border border-white/10 rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={f.avatar}
                  className="w-10 h-10 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{f.name}</p>
                  <p className="text-[11px] text-gray-500">{f.handle}</p>
                </div>
              </div>
              <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
