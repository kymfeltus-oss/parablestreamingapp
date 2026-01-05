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
      // New Supabase OTP-style confirmation
      const token_hash = params.get("token_hash");
      const type = params.get("type") as
        | "signup"
        | "invite"
        | "recovery"
        | "email_change"
        | null;

      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type,
        });

        if (error) {
          router.replace("/login");
          return;
        }

        router.replace("/profile-setup");
        return;
      }

      // Legacy PKCE-style confirmation
      const code = params.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          router.replace("/login");
          return;
        }

        router.replace("/profile-setup");
        return;
      }

      router.replace("/login");
    };

    run();
  }, [params, router, supabase]);

  return (
    <div className="text-white bg-black p-10 min-h-screen flex items-center justify-center">
      Finishing verification…
    </div>
  );
}
