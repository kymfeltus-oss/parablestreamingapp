"use client";

import { useEffect, useState } from "react";
import WelcomePage from "./welcome/page";
import FlashLandingPage from "@/components/FlashLandingPage";

export default function HomePage() {
  // CHECK: Testing if the .env.local file is reading correctly
  console.log("MY TEST VARIABLE:", process.env.NEXT_PUBLIC_TEST_VAR);

  const [stage, setStage] = useState<"flash" | "welcome">("flash");

  useEffect(() => {
    // After 5 seconds, show Welcome Page
    const timer = setTimeout(() => {
      setStage("welcome");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (stage === "flash") {
    return (
      <FlashLandingPage
        onEnter={() => {
          setStage("welcome");
        }}
      />
    );
  }

  // After flash → ALWAYS show welcome page on every visit
  return <WelcomePage />;
}