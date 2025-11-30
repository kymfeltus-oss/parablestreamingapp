"use client";

import Navbar from "@/components/Navbar";
import { Shield, Users, DollarSign, Activity, Bell } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-10 space-y-10">

        <h1 className="text-4xl font-black mb-3 flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-500" />
          Admin Control Panel
        </h1>
        <p className="text-gray-400 text-sm">
          Manage creators, Seeds economy, moderation queues, and global activity.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <a href="/admin/seeds" className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-violet-500/40 transition">
            <DollarSign className="text-green-400 w-8 h-8 mb-4" />
            <h3 className="font-bold text-xl mb-1">Seed Economy</h3>
            <p className="text-xs text-gray-400">Manage pricing, transactions & gifts</p>
          </a>

          <a href="/admin/moderation" className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-violet-500/40 transition">
            <Activity className="text-orange-400 w-8 h-8 mb-4" />
            <h3 className="font-bold text-xl mb-1">Moderation Queue</h3>
            <p className="text-xs text-gray-400">Flagged sermons & chat messages</p>
          </a>

          <a href="/admin/verification" className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-violet-500/40 transition">
            <Users className="text-blue-400 w-8 h-8 mb-4" />
            <h3 className="font-bold text-xl mb-1">Creator Verification</h3>
            <p className="text-xs text-gray-400">Approve pastor & artist badges</p>
          </a>

          <a href="/admin/flags" className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-violet-500/40 transition">
            <Shield className="text-red-500 w-8 h-8 mb-4" />
            <h3 className="font-bold text-xl mb-1">Content Flags</h3>
            <p className="text-xs text-gray-400">User reports & policy reviews</p>
          </a>

          <a href="/admin/announcements" className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-violet-500/40 transition">
            <Bell className="text-yellow-400 w-8 h-8 mb-4" />
            <h3 className="font-bold text-xl mb-1">Global Announcements</h3>
            <p className="text-xs text-gray-400">Send platform-wide messages</p>
          </a>

        </div>
      </main>
    </div>
  );
}
