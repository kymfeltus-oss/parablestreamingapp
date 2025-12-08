"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [status, setStatus] = useState(
    "Verifying your email"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      const code = searchParams.get("code");

      if (!code) {
        setError("Missing confirmation code.");
        setStatus("Unable to verify");
        return;
      }

      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        setError(exchangeError.message);
        setStatus("Unable to verify");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("No user session found.");
        setStatus("Unable to verify");
        return;
      }

      const accountType =
        (user.user_metadata as any)?.accountType || "viewer";

      if (accountType === "creator") {
        router.replace("/profile-setup/creator");
      } else {
        router.replace("/profile-setup/viewer");
      }
    }

    run();
  }, [router, searchParams, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md text-center px-6">
        <h1 className="text-2xl font-bold mb-3">
          {status}
        </h1>
        {error ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : (
          <p className="text-sm text-gray-400">
            This will only take a moment.
          </p>
        )}
      </div>
    </div>
  );
}
