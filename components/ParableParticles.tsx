"use client";
import React, { useEffect, useState } from 'react';

export default function ParableParticles() {
  const [dots, setDots] = useState<{ id: number; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 6 + 2}px`,
      duration: `${Math.random() * 8 + 4}s`,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: dot.left,
            width: dot.size,
            height: dot.size,
            bottom: '-20px',
            backgroundColor: '#00f2ff',
            boxShadow: '0 0 10px #00f2ff, 0 0 20px #00f2ff, 0 0 30px rgba(0,242,255,0.8)',
            animation: `float ${dot.duration} infinite linear`,
            opacity: 0.8,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}