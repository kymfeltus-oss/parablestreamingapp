"use client";

import Navbar from "@/components/Navbar";
import { DollarSign, BarChart, Gift, ArrowUpDown } from "lucide-react";

export default function SeedEconomy() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-6 pt-10 space-y-10">

        <h1 className="text-4xl font-black flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-green-400" />
          Seeds Economy
        </h1>

        <p className="text-gray-400 mb-6 text-sm">
          Control virtual Seeds pricing, gifting rules, and economy flow.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
            <BarChart className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="text-xl font-bold">Seed Pricing</h3>
            <p className="text-gray-400 text-sm mb-4">Current: 100 Seeds = $4.99</p>
            <input className="bg-black border border-white/20 px-4 py-2 rounded-lg w-full mb-3" placeholder="New Price (per 100 Seeds)" />
            <button className="bg-violet-600 hover:bg-violet-500 w-full py-3 rounded-xl font-bold">
              Update Pricing
            </button>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
            <Gift className="w-8 h-8 text-orange-400 mb-4" />
            <h3 className="text-xl font-bold">Gift Multipliers</h3>
            <p className="text-gray-400 text-sm mb-4">Boost engagement with multipliers</p>

            <select className="bg-black border border-white/20 px-4 py-2 rounded-lg w-full mb-3">
              <option>x1.0 (Default)</option>
              <option>x1.3 – Worship Night</option>
              <option>x1.5 – Revival Event</option>
              <option>x2.0 – Special Campaign</option>
            </select>

            <button className="bg-orange-600 hover:bg-orange-500 w-full py-3 rounded-xl font-bold">
              Apply Multiplier
            </button>
          </div>

        </div>

        <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
          <ArrowUpDown className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Recent Seed Transactions</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• Joshua → Bishop Jakes: 500 Seeds</li>
            <li>• Elijah → Mike Todd: 200 Seeds</li>
            <li>• Lauren → Kirk Franklin: 300 Seeds</li>
          </ul>
        </div>

      </main>
    </div>
  );
}
