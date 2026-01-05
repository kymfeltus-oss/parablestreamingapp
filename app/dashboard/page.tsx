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

    // Unified dashboard for all users
    router.replace("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Redirecting…
    </div>
  );
}
