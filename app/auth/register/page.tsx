"use client";

import type React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, UserPlus, Mic2, Music2, Gamepad2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  // base fields
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState<"viewer" | "creator">("viewer");

  // security
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // demographics
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        email,
        display_name: displayName,
        username,

        // demographics
        age_range: ageRange,
        country,
        language_preference: languagePreference,

        // interests
        interested_in_music: interests.music,
        interested_in_sermons: interests.sermons,
        interested_in_parables: interests.parables,
        interested_in_gaming: interests.gaming,
        interested_in_bible_study: interests.bibleStudy,
        interested_in_live_worship: interests.liveWorship,
        interested_in_motivational: interests.motivational,

        // engagement
        preferred_content_types: preferredTypes,
        viewing_frequency: viewingFrequency,
        notifications_enabled: notificationsEnabled,

        // creator-specific
        role: accountType === "creator" ? "creator" : "user",
        creator_type: accountType === "creator" ? creatorCategory : null,
        ministry_or_channel_name: accountType === "creator" ? ministryName : null,
        creator_bio_short: accountType === "creator" ? bioShort : null,

        // consent
        analytics_consent: analyticsConsent,
      });

      if (profileError) console.error(profileError);
    }

    setLoading(false);
    router.push("/dashboard");
  }

  // shared input styles so text is visible and on-brand
  const inputClass =
    "mt-1 w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#53fc18] focus:shadow-[0_0_12px_#53fc18]";

  const selectClass = inputClass;
  const textAreaClass =
    "mt-1 w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#53fc18] focus:shadow-[0_0_12px_#53fc18]";

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-24 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* LEFT PANEL — WELCOME CREATOR COPY */}
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

          <div className="grid grid-cols-3 gap-3 text-[11px] text-gray-400">
            <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-3 flex flex-col gap-2">
              <Mic2 className="w-5 h-5 text-[#53fc18]" />
              <p className="font-semibold">Pastors & Teachers</p>
              <p className="text-[10px] text-gray-500">
                Host sermons, Bible studies, and conferences.
              </p>
            </div>
            <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-3 flex flex-col gap-2">
              <Music2 className="w-5 h-5 text-[#53fc18]" />
              <p className="font-semibold">Musicians & Vocalists</p>
              <p className="text-[10px] text-gray-500">
                Live sheds, warmups, rehearsals, and collabs.
              </p>
            </div>
            <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-3 flex flex-col gap-2">
              <Gamepad2 className="w-5 h-5 text-[#53fc18]" />
              <p className="font-semibold">Streamers & Creators</p>
              <p className="text-[10px] text-gray-500">
                Christian gaming, talk shows, and reactions.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL — FORM */}
        <section className="lg:col-span-3 space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-6">

            {/* HEADER ROW */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#53fc18]" />
                  Create Account
                </h2>
                <p className="text-[11px] text-gray-400 mt-1">
                  Secure sign-up with email and password. Then we tailor your experience.
                </p>
              </div>

              {/* ACCOUNT TYPE TOGGLE */}
              <div className="text-[10px] flex items-center gap-1 bg-[#050505] border border-white/10 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setAccountType("viewer")}
                  className={
                    "px-3 py-1 rounded-full " +
                    (accountType === "viewer"
                      ? "bg-[#53fc18] text-black font-semibold"
                      : "text-gray-400")
                  }
                >
                  Viewer
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("creator")}
                  className={
                    "px-3 py-1 rounded-full " +
                    (accountType === "creator"
                      ? "bg-[#53fc18] text-black font-semibold"
                      : "text-gray-400")
                  }
                >
                  Creator
                </button>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleRegister} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-xs text-gray-400">Email</label>
                <input
                  className={inputClass}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Password</label>
                  <input
                    className={inputClass}
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Confirm Password</label>
                  <input
                    className={inputClass}
                    type="password"
                    placeholder="Repeat password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>

              {/* IDENTITY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Display Name</label>
                  <input
                    className={inputClass}
                    placeholder="How you appear on Parable"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Username</label>
                  <input
                    className={inputClass}
                    placeholder="Unique handle"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* DEMOGRAPHICS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Age Range</label>
                  <select
                    className={selectClass}
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>18-24</option>
                    <option>25-34</option>
                    <option>35-44</option>
                    <option>45-54</option>
                    <option>55+</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400">Country</label>
                  <input
                    className={inputClass}
                    placeholder="Ex: United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Language</label>
                  <select
                    className={selectClass}
                    value={languagePreference}
                    onChange={(e) => setLanguagePreference(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>

              {/* INTERESTS */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Your Interests</label>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {Object.entries(interests).map(([key, val]) => (
                    <label key={key} className="flex items-center gap-2 text-gray-300">
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={() =>
                          setInterests((prev) => ({
                            ...prev,
                            [key]: !val,
                          }))
                        }
                      />
                      <span>{key.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ENGAGEMENT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Viewing Frequency</label>
                  <select
                    className={selectClass}
                    value={viewingFrequency}
                    onChange={(e) => setViewingFrequency(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400">Preferred Content Types</label>
                  <div className="space-y-1 text-[11px] mt-1">
                    {["Short Films", "Livestreams", "Music Videos", "Sermons"].map((type) => (
                      <label key={type} className="flex items-center gap-2 text-gray-300">
                        <input
                          type="checkbox"
                          checked={preferredTypes.includes(type)}
                          onChange={() => toggleArrayItem(type)}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                Enable notifications about new parables, streams, and events.
              </label>

              {/* CREATOR FIELDS */}
              {accountType === "creator" && (
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Creator Details
                  </p>

                  <div>
                    <label className="text-xs text-gray-400">Creator Category</label>
                    <select
                      className={selectClass}
                      value={creatorCategory}
                      onChange={(e) => setCreatorCategory(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option>Pastor</option>
                      <option>Artist</option>
                      <option>Influencer</option>
                      <option>Gamer</option>
                      <option>Ministry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400">Ministry or Channel Name</label>
                    <input
                      className={inputClass}
                      placeholder="Ex: Kingdom Voices Collective"
                      value={ministryName}
                      onChange={(e) => setMinistryName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400">Short Bio</label>
                    <textarea
                      className={textAreaClass}
                      rows={3}
                      placeholder="Share a short intro about your ministry or content."
                      value={bioShort}
                      onChange={(e) => setBioShort(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* CONSENT */}
              <label className="flex items-center gap-2 text-[11px] text-gray-400">
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={() => setAnalyticsConsent(!analyticsConsent)}
                />
                I agree to anonymized analytics tracking to improve Parable.
              </label>

              {/* SUBMIT */}
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
              <Link href="/auth" className="text-[#53fc18] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
