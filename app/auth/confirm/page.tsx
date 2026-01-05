"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function ConfirmEmailPage() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const run = async () => {
      const code = params.get("code");

      if (!code) {
        router.replace("/auth/login");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        router.replace("/auth/login");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      const type = user.user_metadata?.accountType;

      if (type === "creator") {
        router.replace("/creator/setup");
      } else {
        router.replace("/profile-setup");
      }
    };

    run();
  }, [params, router, supabase]);

  return (
    <div className="text-white bg-black p-10 min-h-screen flex items-center justify-center">
      Finishing verification…
    </div>
  );
}
