"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const renderContext = ctx;

    let frame = 0;
    let particles: Particle[] = [];

    function resize() {
      const el = canvasRef.current;
      if (!el) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.floor(window.innerWidth * dpr);
      el.height = Math.floor(window.innerHeight * dpr);
      el.style.width = `${window.innerWidth}px`;
      el.style.height = `${window.innerHeight}px`;
      renderContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 20000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.2,
        a: Math.random() * 0.35 + 0.08,
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    function tick() {
      renderContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
        renderContext.beginPath();
        renderContext.fillStyle = `rgba(186,200,255,${p.a})`;
        renderContext.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        renderContext.fill();
      }
      frame = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.55]"
    />
  );
}
