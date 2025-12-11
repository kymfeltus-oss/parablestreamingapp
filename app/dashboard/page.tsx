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
    // Get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    // Read account type from metadata
    const type = user.user_metadata?.accountType;

    // IF CREATOR → send to Creator Dashboard
    if (type === "creator") {
      router.replace("/creator/dashboard");
      return;
    }

    // IF VIEWER → send to viewer feed
    router.replace("/feed");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Redirecting…
    </div>
  );
}
