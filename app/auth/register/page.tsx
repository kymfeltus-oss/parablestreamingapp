"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />
      <main className="max-w-xl mx-auto px-6 pt-24 space-y-8">

        <h1 className="text-3xl font-extrabold">Create your Parable account</h1>

        <form onSubmit={handleRegister} className="space-y-8 bg-[#111] border border-white/10 p-6 rounded-2xl">

          {/* EMAIL */}
          <div>
            <label className="text-xs text-gray-400">Email</label>
            <input className="mt-1 input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs text-gray-400">Password</label>
            <input type="password" className="mt-1 input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <label className="text-xs text-gray-400">Confirm Password</label>
            <input type="password" className="mt-1 input" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          </div>

          {/* DISPLAY NAME */}
          <div>
            <label className="text-xs text-gray-400">Display Name</label>
            <input className="mt-1 input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-xs text-gray-400">Username</label>
            <input className="mt-1 input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          {/* AGE RANGE */}
          <div>
            <label className="text-xs text-gray-400">Age Range</label>
            <select className="mt-1 input" value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
              <option value="">Select</option>
              <option>18-24</option>
              <option>25-34</option>
              <option>35-44</option>
              <option>45-54</option>
              <option>55+</option>
            </select>
          </div>

          {/* COUNTRY */}
          <div>
            <label className="text-xs text-gray-400">Country</label>
            <input className="mt-1 input" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>

          {/* LANGUAGE */}
          <div>
            <label className="text-xs text-gray-400">Language Preference</label>
            <select className="mt-1 input" value={languagePreference} onChange={(e) => setLanguagePreference(e.target.value)}>
              <option value="">Select</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          {/* INTERESTS */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Your Interests</label>
            {Object.entries(interests).map(([key, val]) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={val} onChange={() => setInterests({ ...interests, [key]: !val })} />
                {key.replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </div>

          {/* ENGAGEMENT */}
          <div>
            <label className="text-xs text-gray-400">Viewing Frequency</label>
            <select className="mt-1 input" value={viewingFrequency} onChange={(e) => setViewingFrequency(e.target.value)}>
              <option value="">Select</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400">Preferred Content Types</label>
            {["Short Films", "Livestreams", "Music Videos", "Sermons"].map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={preferredTypes.includes(type)} onChange={() => toggleArrayItem(type)} />
                {type}
              </label>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
            Enable Notifications
          </label>

          {/* CREATOR FIELDS */}
          {accountType === "creator" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">Creator Category</label>
                <select className="mt-1 input" value={creatorCategory} onChange={(e) => setCreatorCategory(e.target.value)}>
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
                <input className="mt-1 input" value={ministryName} onChange={(e) => setMinistryName(e.target.value)} />
              </div>

              <div>
                <label className="text-xs text-gray-400">Short Bio</label>
                <textarea className="mt-1 input" rows={3} value={bioShort} onChange={(e) => setBioShort(e.target.value)} />
              </div>
            </div>
          )}

          {/* CONSENT */}
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={analyticsConsent} onChange={() => setAnalyticsConsent(!analyticsConsent)} />
            I agree to anonymized analytics tracking
          </label>

          <button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-700 text-sm font-bold rounded-lg py-3 disabled:opacity-50">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center">
          Already have an account?{" "}
          <Link href="/auth" className="text-[#53fc18] font-semibold">
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
