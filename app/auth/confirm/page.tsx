"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function ConfirmEmailPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    (async () => {
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
        router.replace("/dashboard");
      }
    })();
  }, []);

  return (
    <div className="text-white bg-black p-10 min-h-screen flex items-center justify-center">
      Finishing verification…
    </div>
  );
}
