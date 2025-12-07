// app/page.tsx
'use client'; // This must be a client component because it uses useState and useEffect.

import { useEffect, useState } from "react";
// Assuming WelcomePage is now a component you define or import clearly
import WelcomeComponent from "./welcome-content"; // <-- Rename to clarify component vs page
import FlashLandingPage from "@/components/FlashLandingPage";

// NOTE: process.env.NEXT_PUBLIC_TEST_VAR is only available on the server during build
// In a client component, you can only see client-side envs (NEXT_PUBLIC_*)
// If this fails, it means NEXT_PUBLIC_TEST_VAR is not correctly set.

export default function HomePage() {
  const [stage, setStage] = useState<"flash" | "done">("flash");

  useEffect(() => {
    // 1. Check if the flash has been shown (e.g., using localStorage for a permanent skip)
    // For now, we will stick to your timer logic:
    const timer = setTimeout(() => {
      setStage("done");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (stage === "flash") {
    return (
      <FlashLandingPage
        // Ensure this prop name matches what your component expects (e.g., 'onDone')
        onDone={() => { 
          setStage("done");
        }}
      />
    );
  }

  // After the flash stage is complete, render the permanent welcome component.
  return <WelcomeComponent />;
}

// NOTE: You would need to create a simple file like app/welcome-content.tsx 
// if you choose to follow this structure.