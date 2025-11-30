"use client";

import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

export default function ProfileAboutPage() {
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

        <h1 className="text-2xl font-black mb-4">About Joshua</h1>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4 text-sm text-gray-300">
          <p>
            Joshua is a pastor, influencer, and digital creator passionate about
            merging ministry with modern media. He leads Kingdom Impact Center and
            uses NexusFaith to broadcast sermons, host musical shed sessions, and
            build community.
          </p>
          <p>
            His content focuses on faith, practical discipleship, leadership, and
            empowering the next generation to walk in spiritual authority.
          </p>
          <p>
            When he’s not live, you can find his teaching library, loops, and digital
            resources in the <span className="text-violet-300">Store/Support</span> section.
          </p>
        </div>
      </main>
    </div>
  );
}
