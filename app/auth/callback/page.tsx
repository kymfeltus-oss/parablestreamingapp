"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function finalizeAccount() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const metadata = user.user_metadata;

      // Insert new profile ONLY if one does not already exist
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existing) {
        await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          display_name: metadata.displayName,
          username: metadata.username,
          role: metadata.accountType === "creator" ? "creator" : "user",
          age_range: metadata.ageRange,
          country: metadata.country,
          language_preference: metadata.languagePreference,
          interested_in_music: metadata.interests?.music ?? false,
          interested_in_sermons: metadata.interests?.sermons ?? false,
          interested_in_parables: metadata.interests?.parables ?? false,
          interested_in_gaming: metadata.interests?.gaming ?? false,
          interested_in_bible_study: metadata.interests?.bibleStudy ?? false,
          interested_in_live_worship: metadata.interests?.liveWorship ?? false,
          interested_in_motivational: metadata.interests?.motivational ?? false,
          viewing_frequency: metadata.viewingFrequency,
          preferred_content_types: metadata.preferredTypes ?? [],
          notifications_enabled: metadata.notificationsEnabled,
          creator_type: metadata.creatorCategory,
          ministry_or_channel_name: metadata.ministryName,
          creator_bio_short: metadata.bioShort,
          analytics_consent: metadata.analyticsConsent
        });
      }

      router.push("/dashboard");
    }

    finalizeAccount();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-300 animate-pulse text-sm">
        Finalizing your account...
      </p>
    </div>
  );
}
