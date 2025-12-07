// app/page.tsx
'use client'; 

import { useEffect, useState } from "react";
// Restoring your original import for the content page/component
import WelcomePage from "./welcome/page"; 
import FlashLandingPage from "@/components/FlashLandingPage";

export default function HomePage() {
  // Restoring your original state names
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
        // FIX: Prop name must be 'onEnter' to resolve the TypeScript error
        onEnter={() => { 
          setStage("welcome");
        }}
      />
    );
  }

  // Render the permanent WelcomePage component.
  return <WelcomePage />;
}