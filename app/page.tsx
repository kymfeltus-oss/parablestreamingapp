"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomePage from "./welcome/page";
import FlashLandingPage from "@/components/FlashLandingPage";

export default function HomePage() {
  const router = useRouter();
  const [hasVisited, setHasVisited] = useState<boolean | null>(null);

  // Check if the visitor has been here before
  useEffect(() => {
    const visited = document.cookie.includes("parableVisited=true");
    setHasVisited(visited);

    if (!visited) {
      // Mark first-time visitor
      document.cookie = "parableVisited=true; path=/; max-age=31536000";
    }
  }, []);

  // After showing Flash screen, redirect automatically
  useEffect(() => {
    if (hasVisited === true) {
      const timer = setTimeout(() => router.push("/feed"), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasVisited, router]);

  // While cookie is being checked
  if (hasVisited === null) return null;

  // First-time visitor → Welcome Page
  if (hasVisited === false) {
    return <WelcomePage />;
  }

  // Returning visitor → Flash screen
  return (
    <FlashLandingPage
      onEnter={() => {
        router.push("/feed");
      }}
    />
  );
}
