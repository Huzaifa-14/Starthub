"use client";

import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/utils/cn";

type GravityStarsBackgroundProps = React.ComponentPropsWithoutRef<"div"> & {
  starsCount?: number;
  starsSize?: number;
  starsOpacity?: number;
  glowIntensity?: number;
  glowAnimation?: "instant" | "ease" | "spring";
  movementSpeed?: number;
  mouseInfluence?: number;
  mouseGravity?: "attract" | "repel";
  gravityStrength?: number;
  starsInteraction?: boolean;
  starsInteractionType?: "bounce" | "merge";
};

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
};

const initialMouse = { x: 0, y: 0, active: false };

export function GravityStarsBackground({
  className,
  starsCount = 75,
  starsSize = 2,
  starsOpacity = 0.75,
  glowIntensity = 15,
  glowAnimation = "ease",
  movementSpeed = 0.45,
  mouseInfluence = 220,
  mouseGravity = "attract",
  gravityStrength = 120,
  starsInteraction = true,
  starsInteractionType = "bounce",
  ...props
}: GravityStarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef(initialMouse);
  const stars = useRef<Star[]>([]);

  const glowColor = useMemo(() => {
    return "rgba(56,189,248, 0.18)";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const canvasEl = canvas;
    let animationFrame = 0;

    function resize(target: HTMLCanvasElement, context: CanvasRenderingContext2D) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      target.width = Math.floor(window.innerWidth * dpr);
      target.height = Math.floor(window.innerHeight * dpr);
      target.style.width = `${window.innerWidth}px`;
      target.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createStars() {
      stars.current = Array.from({ length: starsCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * movementSpeed,
        vy: (Math.random() - 0.5) * movementSpeed,
        r: starsSize + Math.random() * starsSize,
        opacity: starsOpacity * (0.5 + Math.random() * 0.5),
      }));
    }

    function applyMouseForce(star: Star) {
      if (!mouse.current.active) return;
      const dx = mouse.current.x - star.x;
      const dy = mouse.current.y - star.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const force = gravityStrength / dist;
      const sign = mouseGravity === "repel" ? -1 : 1;
      const influence = Math.min(mouseInfluence / dist, 0.2);
      star.vx += (dx / dist) * force * influence * sign * 0.01;
      star.vy += (dy / dist) * force * influence * sign * 0.01;
    }

    function handleInteractions() {
      if (!starsInteraction) return;
      for (let i = 0; i < stars.current.length; i += 1) {
        for (let j = i + 1; j < stars.current.length; j += 1) {
          const a = stars.current[i];
          const b = stars.current[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 35) continue;
          if (starsInteractionType === "bounce") {
            const nx = dx / dist;
            const ny = dy / dist;
            const p = 2 * (a.vx * nx + a.vy * ny - b.vx * nx - b.vy * ny) / 2;
            a.vx -= p * nx;
            a.vy -= p * ny;
            b.vx += p * nx;
            b.vy += p * ny;
          } else {
            b.opacity = Math.min(1, b.opacity + 0.02);
            a.opacity = Math.max(0.05, a.opacity - 0.02);
          }
        }
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const star of stars.current) {
        applyMouseForce(star);
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < -20 || star.x > window.innerWidth + 20) star.x = Math.random() * window.innerWidth;
        if (star.y < -20 || star.y > window.innerHeight + 20) star.y = Math.random() * window.innerHeight;

        if (star.x < 0 || star.x > window.innerWidth) star.vx *= -1;
        if (star.y < 0 || star.y > window.innerHeight) star.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = `rgba(148, 163, 184, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        if (glowIntensity > 0) {
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = glowAnimation === "spring" ? glowIntensity + 12 : glowIntensity + 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fill();
        }
      }
      handleInteractions();
      animationFrame = requestAnimationFrame(drawStars);
    }

    const handleResize = () => resize(canvasEl, ctx);
    resize(canvasEl, ctx);
    createStars();
    window.addEventListener("resize", handleResize);

    const pointerMove = (event: PointerEvent) => {
      mouse.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };
    const pointerLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerleave", pointerLeave);
    drawStars();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerleave", pointerLeave);
    };
  }, [starsCount, starsSize, starsOpacity, glowAnimation, glowIntensity, gravityStrength, movementSpeed, mouseGravity, mouseInfluence, starsInteraction, starsInteractionType]);

  return (
    <div {...props} className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
    </div>
  );
}
