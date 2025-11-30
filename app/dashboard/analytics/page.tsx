"use client";

import Navbar from "@/components/Navbar";
import { TrendingUp, Users, DollarSign, Clock, Eye } from "lucide-react";

export default function DashboardAnalytics() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-10 space-y-10">

        <h1 className="text-4xl font-black mb-4">Creator Analytics</h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
            <Eye className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-xl font-bold">Total Views</h3>
            <p className="text-3xl font-black mt-2">142,230</p>
          </div>

          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
            <Users className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-xl font-bold">Followers</h3>
            <p className="text-3xl font-black mt-2">5,912</p>
          </div>

          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
            <DollarSign className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-xl font-bold">Monthly Earnings</h3>
            <p className="text-3xl font-black mt-2">$4,812</p>
          </div>

        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
          <TrendingUp className="w-8 h-8 text-violet-400 mb-3" />
          <h3 className="text-xl font-bold">Growth Trends</h3>
          <p className="text-gray-400 text-sm mt-1">Your audience grew 12% this month.</p>
        </div>

      </main>
    </div>
  );
}
