"use client";

import { useEffect, useRef } from "react";

export default function ParableParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles: { x: number; y: number; size: number; dx: number; dy: number }[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // TS FIX: ensure canvas exists before using

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return; // TS FIX
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6;
    }

    resize();
    window.addEventListener("resize", resize);

    // create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.6,
        size: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      if (!ctx || !canvas) return; // TS FIX

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#53fc18";

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-0 opacity-20"
    />
  );
}
