"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Coins,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownLeft,
  X,
} from "lucide-react";

export default function MonetizationPage() {
  const [activeTab, setActiveTab] = useState<"buy" | "payouts" | "history">(
    "buy"
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const seedPackages = [
    { id: 1, amount: 100, price: "$0.99" },
    { id: 2, amount: 500, price: "$4.99" },
    { id: 3, amount: 1200, price: "$9.99" },
    { id: 4, amount: 5000, price: "$39.99" },
  ];

  const transactions = [
    {
      id: 1,
      type: "purchase",
      desc: "Seed Bundle",
      amount: "+500 Seeds",
      date: "Today",
      status: "Completed",
    },
    {
      id: 2,
      type: "payout",
      desc: "Creator Payout",
      amount: "-$150.00",
      date: "Oct 15",
      status: "Processing",
    },
  ];

  const handleBuy = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="sticky top-0 z-40 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/feed"
            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Monetization Hub</h1>
        </div>
        <div className="flex items-center gap-2 bg-[#53fc18]/10 px-3 py-1.5 rounded-full border border-[#53fc18]/20">
          <Coins className="w-4 h-4 text-[#53fc18]" />
          <span className="text-[#53fc18] font-bold text-sm">0 Seeds</span>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex p-1 bg-[#1a1a1a] rounded-xl mb-8">
          <button
            onClick={() => setActiveTab("buy")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
              activeTab === "buy"
                ? "bg-[#53fc18] text:black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Buy Seeds
          </button>
          <button
            onClick={() => setActiveTab("payouts")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
              activeTab === "payouts"
                ? "bg-[#53fc18] text:black"
                : "text-gray-400 hover:text:white"
            }`}
          >
            Payouts
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
              activeTab === "history"
                ? "bg-[#53fc18] text:black"
                : "text-gray-400 hover:text:white"
            }`}
          >
            History
          </button>
        </div>

        {/* Buy */}
        {activeTab === "buy" && (
          <div className="animate-in fade-in">
            <p className="text-gray-300 mb-6">
              Support your favorite creators through Seeds, Gifts, and Live
              Tipping.
            </p>

            <div className="bg-[#111] p-5 rounded-2xl border border-white/10 mb-6">
              <h2 className="text-xl font-bold mb-2">How It Works</h2>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• Buy Seeds to support creators.</li>
                <li>• Send Gifts during livestreams.</li>
                <li>• Unlock badges & reactions.</li>
                <li>• Creators earn revenue instantly.</li>
              </ul>
            </div>

            <div className="bg-[#111] p-5 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
                <Coins className="w-5 h-5 text-yellow-300" /> Buy Seeds
              </h2>

              <div className="space-y-3">
                {seedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-center justify-between bg-[#1a1a1a] px-4 py-3 rounded-xl border border-white/10 hover:border-[#53fc18]/50 transition"
                  >
                    <div>
                      <span className="text-lg font-bold block">
                        {pkg.amount} Seeds
                      </span>
                      <span className="text-xs text-gray-500">
                        {pkg.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBuy(pkg)}
                      className="bg-[#53fc18] px-4 py-2 text-black font-bold rounded-lg hover:scale-105 transition"
                    >
                      Purchase
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payouts */}
        {activeTab === "payouts" && (
          <div className="animate-in fade-in">
            <div className="bg-[#111] p-6 rounded-2xl border border-white/10 mb-6 text-center">
              <p className="text-gray-400 text-sm mb-1">
                Available for Payout
              </p>
              <div className="text-4xl font-black text-[#53fc18] mb-4">
                $0.00
              </div>
              <button className="w-full bg-[#53fc18] text:black font-bold py-3 rounded-xl hover:bg-[#46d615] transition">
                Cash Out
              </button>
            </div>
          </div>
        )}

        {/* History */}
        {activeTab === "history" && (
          <div className="space-y-3 animate-in fade-in">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-[#111] border border:white/10 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      tx.type === "payout"
                        ? "bg-red-900/20"
                        : "bg-green-900/20"
                    }`}
                  >
                    {tx.type === "payout" ? (
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 text-[#53fc18]" />
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-sm">{tx.desc}</p>
                    <p className="text-xs text-gray-500">
                      {tx.date} • {tx.status}
                    </p>
                  </div>
                </div>

                <span
                  className={`font-mono font-bold ${
                    tx.type === "payout"
                      ? "text-white"
                      : "text-[#53fc18]"
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111] border border:white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text:white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Secure Checkout
            </h3>

            <div className="bg-[#0d0d0d] p-4 rounded-xl border border:white/10 mb-6 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">
                  {selectedPackage.amount} Seeds
                </p>
                <p className="text-xs text-gray-400">
                  One-time purchase
                </p>
              </div>

              <div className="text-xl font-black text-[#53fc18]">
                {selectedPackage.price}
              </div>
            </div>

            <button className="w-full bg-[#53fc18] text-black font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(83,252,24,0.3)] hover:bg-[#46d615] transition">
              Confirm Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
