"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function DashboardRouter() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Not logged in → go to login
    if (!user) {
      router.replace("/auth/login");
      return;
    }

    const type = user.user_metadata?.accountType;

    // Creator → go to creator dashboard
    if (type === "creator") {
      router.replace("/creator/dashboard");
      return;
    }

    // Viewer → go to feed
    router.replace("/feed");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Redirecting…
    </div>
  );
}
