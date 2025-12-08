// app/auth/register/page.tsx (Option B: Show Success Message)
"use client";

import type React from "react";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, UserPlus, Mail, CheckCircle } from "lucide-react"; // Added Mail and CheckCircle

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient(); 

  // --- NEW STATE FOR SUCCESS MESSAGE ---
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // base fields
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState<"viewer" | "creator">("viewer");

  // security
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // demographics (Keeping these state variables for now, assuming they are part of the form)
  const [ageRange, setAgeRange] = useState("");
  const [country, setCountry] = useState("");
  const [languagePreference, setLanguagePreference] = useState("");

  // interests
  const [interests, setInterests] = useState({
    music: false,
    sermons: false,
    parables: false,
    gaming: false,
    bibleStudy: false,
    liveWorship: false,
    motivational: false,
  });

  // engagement
  const [viewingFrequency, setViewingFrequency] = useState("");
  const [preferredTypes, setPreferredTypes] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // creator fields
  const [creatorCategory, setCreatorCategory] = useState("");
  const [ministryName, setMinistryName] = useState("");
  const [bioShort, setBioShort] = useState("");

  // consent
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  const [loading, setLoading] = useState(false);

  function toggleArrayItem(item: string) {
    setPreferredTypes((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  }

  // --- NEW FUNCTION TO CLEAR FORM STATE ---
  function clearFormState() {
    setEmail("");
    setDisplayName("");
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setAgeRange("");
    setCountry("");
    setLanguagePreference("");
    setInterests({ 
        music: false, sermons: false, parables: false, gaming: false, 
        bibleStudy: false, liveWorship: false, motivational: false 
    });
    setViewingFrequency("");
    setPreferredTypes([]);
    setNotificationsEnabled(true);
    setCreatorCategory("");
    setMinistryName("");
    setBioShort("");
    setAnalyticsConsent(false);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !passwordConfirm || !displayName) {
      alert("Required fields missing");
      return;
    }
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    if (!analyticsConsent) {
      alert("You must agree to analytics consent");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/confirm`, 
        data: {
          displayName, username, accountType, ageRange, country, languagePreference,
          interests, viewingFrequency, preferredTypes, notificationsEnabled,
          creatorCategory, ministryName, bioShort, analyticsConsent,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // --- SUCCESS ACTION: CLEAR FORM & SHOW MESSAGE ---
    clearFormState();
    setRegistrationSuccess(true);
  }

  // input styling
  const inputClass =
    "mt-1 w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#53fc18] focus:shadow-[0_0_12px_#53fc18]";

  // --- SUCCESS MESSAGE COMPONENT ---
  const SuccessMessage = (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-8">
      <CheckCircle className="w-16 h-16 text-[#53fc18] mb-4" />
      <h2 className="text-2xl font-bold mb-3">Account Created!</h2>
      <p className="text-gray-400 mb-6 max-w-sm">
        We've sent a verification link to **{email}**. Please check your inbox and click the link to continue setting up your profile.
      </p>
      <Link 
        href="/login" 
        className="px-6 py-3 bg-[#53fc18] text-black font-bold rounded-lg shadow-[0_0_10px_#53fc18] hover:brightness-110 transition"
      >
        <Mail className="w-5 h-5 inline-block mr-2" />
        Go to Login
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-24 grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* LEFT PANEL CONTENT UNCHANGED */}
        <section className="lg:col-span-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#53fc18]/40 bg-[#050505] shadow-[0_0_12px_rgba(83,252,24,0.2)]">
            <Sparkles className="w-4 h-4 text-[#53fc18]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300">
              Parable Creator Access
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Create your Parable account.
          </h1>

          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            Whether you are a <span className="text-[#53fc18] font-semibold">pastor</span>,{" "}
            <span className="text-[#53fc18] font-semibold">worship artist</span>,{" "}
            <span className="text-[#53fc18] font-semibold">gospel creator</span>, or{" "}
            <span className="text-[#53fc18] font-semibold">Christian gamer</span>,
            Parable gives you a home to stream, share, and build a faith-centered community.
          </p>
          {/* ... (Rest of left panel content) ... */}
        </section>

        {/* RIGHT PANEL — FORM / MESSAGE */}
        <section className="lg:col-span-3 space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-6">
            
            {/* CONDITIONAL RENDERING: SHOW MESSAGE IF SUCCESSFUL */}
            {registrationSuccess ? (
              SuccessMessage
            ) : (
              <>
                {/* ... (Original form header content) ... */}
                <div className="flex items-center justify-between gap-4">
                    {/* ... (Header and Account Type buttons) ... */}
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* ... (All form fields remain here) ... */}
                    {/* ... (Email, Password, Display Name, Username, Consent) ... */}
                  
                  {/* Submit button remains here */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full bg-[#53fc18] text-black text-sm font-bold rounded-lg py-3
                      shadow-[0_0_14px_#53fc18] hover:brightness-110 disabled:opacity-60
                      flex items-center justify-center gap-2
                    "
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                </form>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#53fc18] font-semibold">
                    Sign in
                  </Link>
                </p>
              </>
            )}
            
          </div>
        </section>

      </main>
    </div>
  );
}