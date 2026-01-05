"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatorDashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Redirecting…
    </div>
  );
}
