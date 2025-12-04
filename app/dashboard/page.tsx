"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  User,
  Coins,
  Gauge,
  Settings,
  BookOpen,
  Radio,
  Gamepad2,
  Clock,
  Heart,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-24 space-y-10">
        {/* HEADER */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Dashboard</h1>
            <p className="text-xs text-gray-400 mt-1">
              Controls, preferences, earnings, and creator tools — all in one place.
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-gray-400">Seeds Balance</p>
            <p className="text-xl font-black text-[#53fc18]">0</p>
          </div>
        </section>

        {/* TOP ROW: PROFILE + CREATOR ANALYTICS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PROFILE CARD */}
          <Link
            href="/dashboard/profile"
            className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-[#53fc18]/60 transition flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Profile & Identity</p>
              <p className="text-[11px] text-gray-400">
                Edit name, avatar, bio, and public links.
              </p>
            </div>
          </Link>

          {/* CREATOR ANALYTICS */}
          <Link
            href="/dashboard/analytics"
            className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-[#53fc18]/60 transition flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Creator Analytics</p>
              <p className="text-[11px] text-gray-400">
                Track views, engagement, and follower growth.
              </p>
            </div>
          </Link>

          {/* EARNINGS */}
          <Link
            href="/monetization"
            className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-[#53fc18]/60 transition flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Coins className="w-5 h-5 text-[#53fc18]" />
            </div>
            <div>
              <p className="text-sm font-bold">Earnings & Seeds</p>
              <p className="text-[11px] text-gray-400">
                Buy Seeds, see payouts, and transaction history.
              </p>
            </div>
          </Link>
        </section>

        {/* CREATOR TOOLS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Creator Tools</h2>
            <p className="text-[11px] text-gray-500">
              Streaming • Parables • Gaming
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* STREAMING TOOL */}
            <Link
              href="/creator/tools"
              className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-[#53fc18]/60 transition flex flex-col gap-2"
            >
              <Radio className="w-6 h-6 text-[#53fc18]" />
              <p className="text-sm font-bold">Streaming Studio</p>
              <p className="text-[11px] text-gray-400">
                Go live, manage overlays, and streaming settings.
              </p>
            </Link>

            {/* PARABLES TOOL */}
            <Link
              href="/creator/parables/dashboard"
              className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-[#53fc18]/60 transition flex flex-col gap-2"
            >
              <BookOpen className="w-6 h-6 text-[#53fc18]" />
              <p className="text-sm font-bold">Parables Studio</p>
              <p className="text-[11px] text-gray-400">
                Create, manage, and monetize microdrama series.
              </p>
            </Link>

            {/* GAMING TOOL */}
            <Link
              href="/gaming"
              className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-[#53fc18]/60 transition flex flex-col gap-2"
            >
              <Gamepad2 className="w-6 h-6 text-[#53fc18]" />
              <p className="text-sm font-bold">Gaming Hub</p>
              <p className="text-[11px] text-gray-400">
                Explore Christian gamers and streaming categories.
              </p>
            </Link>
          </div>
        </section>

        {/* USER ACTIVITY SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Your Activity</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* WATCH HISTORY */}
            <Link
              href="/dashboard/history"
              className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-[#53fc18]/60 transition flex flex-col gap-2"
            >
              <Clock className="w-6 h-6 text-[#53fc18]" />
              <p className="text-sm font-bold">Watch History</p>
              <p className="text-[11px] text-gray-400">
                Continue watching Parables, streams, and clips.
              </p>
            </Link>

            {/* FOLLOWED */}
            <Link
              href="/follow"
              className="bg-[#111] p-5 rounded-2xl border border-white/10 hover:border-[#53fc18]/60 transition flex flex-col gap-2"
            >
              <Heart className="w-6 h-6 text-[#53fc18]" />
              <p className="text-sm font-bold">Following</p>
              <p className="text-[11px] text-gray-400">
                See creators, pastors, and gamers you follow.
              </p>
            </Link>

            {/* SETTINGS */}
            <Link
              href="/dashboard/settings"
              className="bg-[#111] p-5 rounded-2xl border border:white/10 hover:border-[#53fc18]/60 transition flex flex-col gap-2"
            >
              <Settings className="w-6 h-6 text-[#53fc18]" />
              <p className="text-sm font-bold">Account Settings</p>
              <p className="text-[11px] text-gray-400">
                Preferences, security, notifications, and more.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
