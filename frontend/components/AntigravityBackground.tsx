"use client";

import { useEffect, useRef } from "react";

interface AntigravityBackgroundProps {
  className?: string;
  density?: number;
}

type Node = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  phase: number;
  orbit: number;
  depth: number;
};

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

const random = (min: number, max: number) => min + Math.random() * (max - min);

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const x = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return x * x * (3 - 2 * x);
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function AntigravityBackground({
  className = "",
  density = 1,
}: AntigravityBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!wrap || !canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let time = 0;
    let isMobile = window.matchMedia("(max-width: 768px)").matches;
    let reducedMotion = prefersReducedMotion();
    let isVisible = true;
    let theme: "light" | "dark" =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    const pointer = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      active: false,
      influence: 0,
    };

    const color = () => {
      if (theme === "dark") {
        return {
          node: "rgba(245, 245, 245, ",
          line: "rgba(245, 245, 245, ",
          glow: "rgba(255, 255, 255, ",
        };
      }

      return {
        node: "rgba(8, 8, 8, ",
        line: "rgba(8, 8, 8, ",
        glow: "rgba(8, 8, 8, ",
      };
    };

    const placeNode = (): Node => {
      const centerX = width * (isMobile ? 0.5 : 0.57);
      const centerY = height * (isMobile ? 0.48 : 0.46);
      const angle = random(0, Math.PI * 2);
      const radius = Math.sqrt(random(0, 1));
      const spreadX = width * (isMobile ? 0.52 : 0.58);
      const spreadY = height * (isMobile ? 0.42 : 0.46);
      const useCluster = Math.random() > 0.18;
      const x = useCluster
        ? centerX + Math.cos(angle) * radius * spreadX
        : random(width * -0.05, width * 1.05);
      const y = useCluster
        ? centerY + Math.sin(angle) * radius * spreadY
        : random(height * -0.05, height * 1.05);
      const depth = random(0.45, 1);

      return {
        baseX: x,
        baseY: y,
        x,
        y,
        size: random(0.7, isMobile ? 1.7 : 2.1) * depth,
        alpha: random(0.16, 0.46) * depth,
        speed: random(0.45, 1.2),
        phase: random(0, Math.PI * 2),
        orbit: random(8, isMobile ? 18 : 28) * depth,
        depth,
      };
    };

    const buildNodes = () => {
      const area = width * height;
      const count = isMobile
        ? Math.min(72, Math.max(38, Math.floor((area / 9800) * density)))
        : Math.min(145, Math.max(72, Math.floor((area / 9000) * density)));

      nodes = Array.from({ length: count }, placeNode);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      isMobile = window.matchMedia("(max-width: 768px)").matches;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      pointer.x = width * 0.5;
      pointer.y = height * 0.5;
      pointer.tx = pointer.x;
      pointer.ty = pointer.y;

      buildNodes();
    };

    const drawSoftGlow = () => {
      const c = color();
      const gradient = ctx.createRadialGradient(
        width * (isMobile ? 0.5 : 0.6),
        height * 0.45,
        0,
        width * (isMobile ? 0.5 : 0.6),
        height * 0.45,
        Math.max(width, height) * 0.42,
      );
      gradient.addColorStop(0, `${c.glow}${theme === "dark" ? 0.08 : 0.045})`);
      gradient.addColorStop(0.54, `${c.glow}${theme === "dark" ? 0.026 : 0.014})`);
      gradient.addColorStop(1, `${c.glow}0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const updateNodes = () => {
      const autoX =
        width * 0.5 +
        Math.cos(time * 0.45) * width * (isMobile ? 0.18 : 0.14);
      const autoY =
        height * 0.48 +
        Math.sin(time * 0.38) * height * (isMobile ? 0.14 : 0.1);

      if (!pointer.active) {
        pointer.tx = autoX;
        pointer.ty = autoY;
        pointer.influence = isMobile ? 0.45 : 0.22;
      } else {
        pointer.influence = lerp(pointer.influence, 1, 0.08);
      }

      pointer.x = lerp(pointer.x, pointer.tx, isMobile ? 0.08 : 0.11);
      pointer.y = lerp(pointer.y, pointer.ty, isMobile ? 0.08 : 0.11);

      for (const node of nodes) {
        const waveX =
          Math.cos(time * node.speed + node.phase) * node.orbit +
          Math.sin(time * 0.42 + node.phase) * node.orbit * 0.32;
        const waveY =
          Math.sin(time * node.speed * 0.82 + node.phase) * node.orbit * 0.72;
        const dx = node.baseX - pointer.x;
        const dy = node.baseY - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const radius = isMobile ? 190 : 270;
        const force =
          (1 - smoothstep(0, radius, distance)) * pointer.influence * node.depth;
        const push = isMobile ? 30 : 46;
        const targetX =
          node.baseX + waveX + (dx / distance) * force * push + (-dy / distance) * force * 18;
        const targetY =
          node.baseY + waveY + (dy / distance) * force * push + (dx / distance) * force * 18;

        node.x = lerp(node.x, targetX, 0.075 + force * 0.04);
        node.y = lerp(node.y, targetY, 0.075 + force * 0.04);
      }
    };

    const drawConnections = () => {
      const c = color();
      const maxDistance = isMobile ? 92 : 118;
      const lineLimit = isMobile ? 85 : 170;
      let drawn = 0;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (drawn > lineLimit) return;
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
            const strength = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.lineWidth = 0.7;
            ctx.strokeStyle = `${c.line}${strength * (theme === "dark" ? 0.16 : 0.18)})`;
            ctx.stroke();
            drawn += 1;
          }
        }
      }
    };

    const drawNodes = () => {
      const c = color();

      for (const node of nodes) {
        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const force =
          (1 - smoothstep(0, isMobile ? 170 : 240, distance)) * pointer.influence;
        const size = node.size + force * (isMobile ? 1.2 : 1.8);
        const alpha = Math.min(
          theme === "dark" ? 0.82 : 0.92,
          node.alpha * (theme === "dark" ? 1 : 1.35) + force * 0.38,
        );

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `${c.node}${alpha})`;
        ctx.fill();

        if (force > 0.18 && !isMobile) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, size * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `${c.glow}${force * (theme === "dark" ? 0.045 : 0.075)})`;
          ctx.fill();
        }
      }
    };

    const render = () => {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      time += reducedMotion ? 0 : isMobile ? 0.008 : 0.01;
      ctx.clearRect(0, 0, width, height);

      drawSoftGlow();
      updateNodes();
      drawConnections();
      drawNodes();

      if (!pointer.active) {
        pointer.influence = lerp(pointer.influence, isMobile ? 0.45 : 0.22, 0.02);
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const setPointer = (clientX: number, clientY: number, active = true) => {
      const rect = wrap.getBoundingClientRect();
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      pointer.active = active && inside;
      if (inside) {
        pointer.tx = clientX - rect.left;
        pointer.ty = clientY - rect.top;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      setPointer(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) setPointer(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      pointer.active = false;
    };

    const syncTheme = () => {
      theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    };

    const handleMotionPreference = () => {
      reducedMotion = prefersReducedMotion();
    };

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    resize();
    render();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("microc-theme-change", syncTheme);
    document.addEventListener("visibilitychange", handleVisibility);
    window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", handleMotionPreference);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("microc-theme-change", syncTheme);
      document.removeEventListener("visibilitychange", handleVisibility);
      window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .removeEventListener("change", handleMotionPreference);
    };
  }, [density]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
