// app/page.tsx
'use client'; 

import { useEffect, useState } from "react";
// REVERTED: Using your original component import path
import WelcomePage from "./welcome/page"; 
import FlashLandingPage from "@/components/FlashLandingPage";

export default function HomePage() {
  // REVERTED: Using your original state names "flash" | "welcome"
  const [stage, setStage] = useState<"flash" | "welcome">("flash"); 

  useEffect(() => {
    // Start the 5-second timer
    const timer = setTimeout(() => {
      setStage("welcome");
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  if (stage === "flash") {
    return (
      <FlashLandingPage
        // FIX: The prop name is 'onEnter' (to resolve the TypeScript error)
        onEnter={() => { 
          setStage("welcome"); // Set to your original state name
        }}
      />
    );
  }

  // After the flash stage is complete, render the original WelcomePage component.
  return <WelcomePage />;
}