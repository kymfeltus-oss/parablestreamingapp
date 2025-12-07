// app/page.tsx
'use client'; 

import { useEffect, useState } from "react";
// Assuming these paths/components are correct in your project
import WelcomeComponent from "./welcome-content"; 
import FlashLandingPage from "@/components/FlashLandingPage";

export default function HomePage() {
  const [stage, setStage] = useState<"flash" | "done">("flash");

  useEffect(() => {
    // Start the 5-second timer
    const timer = setTimeout(() => {
      setStage("done");
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  if (stage === "flash") {
    return (
      <FlashLandingPage
        // FIX: Prop name must be 'onEnter' to match the component's required props 
        onEnter={() => { 
          setStage("done");
        }}
      />
    );
  }

  // After the flash stage is complete, render the permanent welcome component.
  return <WelcomeComponent />;
}