"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function ConfirmPage() {
  const router = useRouter();
  const supabase = createClient();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    verify();
  }, []);

  async function verify() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      setStatus("Verification failed");
      return;
    }

    const { user } = data;

    const type = user.user_metadata?.accountType || "viewer";

    if (type === "creator") {
      router.replace("/creator/setup");
    } else {
      router.replace("/dashboard");
    }
  }

  return (
    <div className="text-white bg-black min-h-screen flex items-center justify-center">
      <p>{status}</p>
    </div>
  );
}
