"use client";

import Navbar from "@/components/Navbar";
import { CheckCircle, XCircle, UserCheck, Shield } from "lucide-react";

export default function CreatorVerificationPage() {
  const pending = [
    { name: "Pastor John Gray", slug: "john-gray", followers: "42.1k", avatar: "/td_avatar.jpg" },
    { name: "Lauren Daigle", slug: "lauren-daigle", followers: "88.4k", avatar: "/lauren-daigle.jpg" },
    { name: "KingdomDrummer", slug: "kingdomdrummer", followers: "12.3k", avatar: "/course_music.jpg" }
  ];

  const verified = [
    { name: "Bishop T.D. Jakes", slug: "td-jakes", avatar: "/td-jakes.jpg" },
    { name: "Pastor Mike Todd", slug: "mike-todd", avatar: "/mike-todd.jpg" }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-10 space-y-12">

        <h1 className="text-4xl font-black flex items-center gap-3">
          <UserCheck className="w-8 h-8 text-blue-400" />
          Creator Verification
        </h1>

        {/* Pending Verification */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-400" />
            Pending Applications
          </h2>

          <div className="space-y-4">
            {pending.map((p, idx) => (
              <div
                key={idx}
                className="bg-[#111] border border-white/10 p-5 rounded-2xl flex justify-between items-center"
              >
                {/* User info */}
                <div className="flex items-center gap-4">
                  <img
                    src={p.avatar}
                    className="w-12 h-12 rounded-full border border-white/10 object-cover"
                  />
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.followers} followers</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button className="bg-red-600 hover:bg-red-500 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Creators */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            Verified Creators
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {verified.map((v, idx) => (
              <div
                key={idx}
                className="bg-[#111] border border-white/10 p-5 rounded-2xl flex items-center gap-4"
              >
                <img
                  src={v.avatar}
                  className="w-12 h-12 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <p className="font-semibold">{v.name}</p>
                  <p className="text-xs text-gray-400">Verified Creator</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
