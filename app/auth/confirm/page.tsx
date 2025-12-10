"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [status, setStatus] = useState("Verifying your email");
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  async function verify() {
    try {
      setRetrying(false);
      setError(null);
      setStatus("Verifying your email");

      const raw = searchParams.get("code");
      const hash = searchParams.get("token_hash");
      const errorDescription = searchParams.get("error_description");

      if (errorDescription) {
        setError(errorDescription);
        setStatus("Verification failed");
        return;
      }

      let code = raw || hash;

      if (!code) {
        setError("Missing verification token in the URL.");
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
        setError("No valid session found after verification.");
        setStatus("Unable to verify");
        return;
      }

      const accountType = user.user_metadata?.accountType || "viewer";

      setStatus("Email verified successfully");

      setTimeout(() => {
        if (accountType === "creator") {
          router.replace("/profile-setup/creator");
        } else {
          router.replace("/profile-setup/viewer");
        }
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "Unknown error verifying email.");
      setStatus("Unable to verify");
    }
  }

  useEffect(() => {
    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md text-center px-6">
        <h1 className="text-2xl font-bold mb-3">{status}</h1>

        {error ? (
          <>
            <p className="text-sm text-red-300 mb-4">{error}</p>
            <button
              onClick={() => {
                setRetrying(true);
                verify();
              }}
              className="px-4 py-2 bg-[#53fc18] text-black font-bold rounded-lg shadow-[0_0_10px_#53fc18] hover:brightness-110"
            >
              {retrying ? "Retrying..." : "Retry Verification"}
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-400">
            This will only take a moment. You may close this tab after redirect.
          </p>
        )}
      </div>
    </div>
  );
}
