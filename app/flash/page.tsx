"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function FlashPage() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    if (typeof window !== "undefined") {
      window.location.href = "/feed";
    }
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-center">
      <div>
        <h1 className="text-5xl font-black mb-3 text-[#53fc18]">PARABLE</h1>
        <p className="text-gray-300 text-lg">Streaming. Creating. Believing.</p>
        <Sparkles className="mx-auto mt-5 w-10 h-10 text-[#53fc18]" />
      </div>
    </div>
  );
}
