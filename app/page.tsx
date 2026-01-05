"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function RootRouter() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const run = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      router.replace("/dashboard");
    };

    run();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Redirecting…
    </div>
  );
}
