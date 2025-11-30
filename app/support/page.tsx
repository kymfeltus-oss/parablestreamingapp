"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Mail,
  MessageCircle,
  Phone,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 mt-10">
        <h1 className="text-4xl font-black mb-6">Support Center</h1>
        <p className="text-gray-400 mb-10 max-w-2xl">
          Need help with streaming, your creator profile, or your account? We’re here
          to assist you with anything you need.
        </p>

        {/* CONTACT METHODS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 flex flex-col gap-3">
            <Mail className="w-6 h-6 text-blue-400" />
            <h3 className="font-bold text-lg">Email Support</h3>
            <p className="text-gray-400 text-sm">
              Response within 12–24 hours.
            </p>
            <Link
              href="mailto:support@nexus.com"
              className="text-blue-400 hover:text-blue-200 text-sm font-bold"
            >
              support@nexus.com
            </Link>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 flex flex-col gap-3">
            <MessageCircle className="w-6 h-6 text-green-400" />
            <h3 className="font-bold text-lg">Live Chat</h3>
            <p className="text-gray-400 text-sm">
              Chat with us Mon–Sat, 9am–6pm CST.
            </p>
            <Link
              href="/chat"
              className="text-green-400 hover:text-green-200 text-sm font-bold"
            >
              Open Live Chat
            </Link>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 flex flex-col gap-3">
            <Phone className="w-6 h-6 text-yellow-400" />
            <h3 className="font-bold text-lg">Phone Support</h3>
            <p className="text-gray-400 text-sm">
              Available Tues–Fri, 11am–4pm CST.
            </p>
            <Link
              href="tel:+18001234567"
              className="text-yellow-400 hover:text-yellow-200 text-sm font-bold"
            >
              +1 (800) 123-4567
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-400" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-[#111] p-5 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg">How do I reset my password?</h3>
              <p className="text-gray-400 text-sm mt-2">
                Visit the account settings page and click “Reset Password.” Follow the
                instructions sent to your email.
              </p>
            </div>

            <div className="bg-[#111] p-5 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg">
                How do I verify my creator account?
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Reach out to our team through the Creator Access Portal. Verification
                typically takes 1–2 business days.
              </p>
            </div>

            <div className="bg-[#111] p-5 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg">Why is my stream lagging?</h3>
              <p className="text-gray-400 text-sm mt-2">
                Make sure your internet speed is at least 10 Mbps upload. If the issue
                persists, contact support and we’ll assist.
              </p>
            </div>
          </div>
        </section>

        {/* PARABLE LINK */}
        <section className="mt-16">
          <h2 className="text-xl font-black mb-3">Looking for Parable Support?</h2>
          <p className="text-gray-400 text-sm mb-3">
            Access account recovery, streaming help, and creator tools for Parable Live.
          </p>

          <Link
            href="https://parable.com"
            className="text-xs font-bold text-blue-400 hover:text-blue-200 flex items-center gap-1"
          >
            Go to Parable Live <ArrowUpRight className="w-3 h-3" />
          </Link>
        </section>
      </main>
    </div>
  );
}
