"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { DollarSign, BarChart2, PieChart, ArrowLeft } from "lucide-react";

export default function MonetaryDashboard() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => history.back()}
              className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
            <h1 className="text-3xl font-black flex items-center gap-2">
              <DollarSign className="w-7 h-7 text-emerald-400" />
              Monetary Dashboard
            </h1>
          </div>
          <p className="text-xs text-gray-500">
            Logged in as <span className="font-semibold text-gray-200">Joshua</span>
          </p>
        </div>

        {/* TOP SUMMARY ROW */}
        <section className="grid md:grid-cols-3 gap-4">
          {/* Total Earnings */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Total Earnings (This Month)
            </p>
            <p className="text-3xl font-black text-emerald-400">$12,845</p>
            <p className="text-xs text-gray-500 mt-1">+18% vs last month</p>
          </div>

          {/* Revenue Sources */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
              Revenue by Source
            </p>
            <ul className="text-xs space-y-1">
              <li className="flex justify-between">
                <span>Subscriptions</span>
                <span className="text-emerald-300">$7,200</span>
              </li>
              <li className="flex justify-between">
                <span>Seeds & Gifting</span>
                <span className="text-amber-300">$3,100</span>
              </li>
              <li className="flex justify-between">
                <span>Digital Storefront</span>
                <span className="text-blue-300">$2,545</span>
              </li>
            </ul>
          </div>

          {/* Payout Summary */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
              Payout Overview
            </p>
            <p className="text-sm text-gray-300">
              Next Payout: <span className="font-bold text-emerald-400">$4,320</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Pending Transfers: <span className="text-gray-200">$1,250</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Platform Fees (This Month): <span className="text-gray-200">$640</span>
            </p>
          </div>
        </section>

        {/* ANALYTICS GRIDS */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Subscriptions Analytics */}
          <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-violet-400" />
                Subscription Analytics
              </h2>
              <span className="text-xs text-gray-500">Last 30 days</span>
            </div>
            {/* Fake graph using bars */}
            <div className="flex items-end gap-2 h-32 mt-4">
              {[40, 45, 48, 52, 60, 58, 65].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-violet-500/30 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Subscribers trending upward. Majority growth in <span className="text-violet-300">Partner</span> tier.
            </p>
          </div>

          {/* Subscription Tiers Breakdown */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-3 text-xs">
            <h2 className="text-sm font-bold mb-1">Subscription Tier Breakdown</h2>
            <div className="flex justify-between">
              <span>Supporter ($3.99)</span>
              <span className="text-gray-300">1,980 subs</span>
            </div>
            <div className="flex justify-between">
              <span>Partner ($9.99)</span>
              <span className="text-gray-300">1,420 subs</span>
            </div>
            <div className="flex justify-between">
              <span>Kingdom Elite ($24.99)</span>
              <span className="text-gray-300">210 subs</span>
            </div>
          </div>
        </section>

        {/* SEEDS & GIFTING + STOREFRONT */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Seeds & Gifting */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-300" />
              Seeds & Gifting
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Recent Seed & Gifting activity across live streams.
            </p>

            <ul className="space-y-2 text-xs text-gray-300">
              <li>• “Faith Under Pressure” – 5,200 Seeds gifted</li>
              <li>• “Prophetic Night” – 3,100 Seeds gifted</li>
              <li>• “Youth Co-Op Night” – 1,400 Seeds gifted</li>
            </ul>

            <button className="mt-4 bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-full text-xs">
              View Full Seed History
            </button>
          </div>

          {/* Digital Storefront */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-300" />
              Digital Storefront
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Sales of courses, loops, templates, and merch.
            </p>

            <ul className="space-y-2 text-xs text-gray-300">
              <li>• “Leadership Masterclass” – 124 sales</li>
              <li>• “Worship Loops Vol. 2” – 78 sales</li>
              <li>• “Prophetic Study Guide (PDF)” – 210 sales</li>
            </ul>

            <button className="mt-4 bg-blue-500 hover:bg-blue-400 text-black font-bold px-4 py-2 rounded-full text-xs">
              See Storefront Analytics
            </button>
          </div>
        </section>

        {/* ENGAGEMENT ↔ REVENUE CORRELATION */}
        <section className="bg-[#111] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-3">
            Engagement → Revenue Correlation
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            View how XP, streams, and watch time influence earnings.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="bg-black/40 rounded-xl p-3 border border-white/10">
              <p className="text-gray-400">Average Concurrent Viewers</p>
              <p className="text-xl font-bold mt-1">482</p>
              <p className="text-[11px] text-emerald-400 mt-1">+18% vs last month</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-white/10">
              <p className="text-gray-400">Average XP per Stream</p>
              <p className="text-xl font-bold mt-1">1,250 XP</p>
              <p className="text-[11px] text-emerald-400 mt-1">Correlated with Seeds</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-white/10">
              <p className="text-gray-400">Average Revenue per Hour</p>
              <p className="text-xl font-bold mt-1">$180/hr</p>
              <p className="text-[11px] text-emerald-400 mt-1">Driven by subscribers</p>
            </div>
          </div>
        </section>

        {/* Export */}
        <section className="flex justify-between items-center pt-4 border-t border-white/10">
          <p className="text-xs text-gray-500">
            Need this for accounting? Export your full data set as CSV.
          </p>
          <button className="bg-white/10 hover:bg-white/20 text-xs font-semibold px-4 py-2 rounded-full">
            Export Financial Data (CSV)
          </button>
        </section>
      </main>
    </div>
  );
}
