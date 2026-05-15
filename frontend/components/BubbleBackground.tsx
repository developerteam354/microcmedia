"use client";

import { useEffect, useRef } from "react";

interface BubbleBackgroundProps {
    /** Extra className on the outer wrapper */
    className?: string;
    /** Override bubble count (default 34) */
    count?: number;
}

const PALETTES = [
    { h: 250, s: 80, l: 65 },
    { h: 200, s: 90, l: 60 },
    { h: 280, s: 70, l: 70 },
    { h: 170, s: 85, l: 55 },
    { h: 320, s: 75, l: 65 },
    { h: 220, s: 85, l: 62 },
];

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

class Bubble {
    x = 0; y = 0; r = 0;
    pal = PALETTES[0];
    vx = 0; vy = 0;
    wobble = 0; wobbleSpeed = 0; wobbleAmp = 0;
    alpha = 0; targetAlpha = 0;
    stitchPhase = 0;
    pushVx = 0; pushVy = 0;
    spin = 0; spinTarget = 0;
    glowing = false;
    W: number; H: number;

    constructor(W: number, H: number, spreadY = true) {
        this.W = W; this.H = H;
        this.init(spreadY);
    }

    init(spreadY = false) {
        const { W, H } = this;
        this.x = rand(60, W - 60);
        this.y = spreadY ? rand(-this.r, H + this.r) : rand(H + 20, H + 200);
        this.r = rand(18, 56);
        this.pal = pick(PALETTES);
        this.vx = rand(-0.25, 0.25);
        this.vy = rand(-0.55, -0.18);
        this.wobble = rand(0, Math.PI * 2);
        this.wobbleSpeed = rand(0.008, 0.018);
        this.wobbleAmp = rand(0.4, 1.1);
        this.alpha = rand(0.16, 0.38);
        this.targetAlpha = this.alpha;
        this.stitchPhase = rand(0, Math.PI * 2);
        this.pushVx = 0; this.pushVy = 0;
        this.spin = 0; this.spinTarget = 0;
        this.glowing = false;
    }

    update(mx: number, my: number) {
        this.wobble += this.wobbleSpeed;
        this.stitchPhase += 0.012;
        this.pushVx *= 0.92;
        this.pushVy *= 0.92;
        this.spin += (this.spinTarget - this.spin) * 0.08;
        this.spinTarget *= 0.95;

        const dx = this.x - mx;
        const dy = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = 150;

        if (dist < influence && dist > 0) {
            this.glowing = true;
            this.targetAlpha = Math.min(0.8, this.alpha * 2.8);
            const force = (influence - dist) / influence;
            this.pushVx += (dx / dist) * force * 1.8;
            this.pushVy += (dy / dist) * force * 1.8;
            this.spinTarget += (Math.random() - 0.5) * 0.04 * force;
        } else {
            this.glowing = false;
            this.targetAlpha = this.alpha;
        }

        const pull = (this.W / 2 - this.x) * 0.00008;
        this.x += this.vx + this.pushVx + Math.sin(this.wobble) * this.wobbleAmp + pull;
        this.y += this.vy + this.pushVy;

        if (this.x < -this.r * 2) this.x = this.W + this.r;
        if (this.x > this.W + this.r * 2) this.x = -this.r;
        if (this.y < -this.r * 2) this.init(false);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const { h, s, l } = this.pal;
        const a = Math.min(1, this.targetAlpha);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.spin);

        // Outer glow halo
        if (this.glowing) {
            const grd = ctx.createRadialGradient(0, 0, this.r * 0.6, 0, 0, this.r * 2.4);
            grd.addColorStop(0, `hsla(${h},${s}%,${l}%,0.20)`);
            grd.addColorStop(1, `hsla(${h},${s}%,${l}%,0)`);
            ctx.beginPath();
            ctx.arc(0, 0, this.r * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
        }

        // Bubble body
        const grad = ctx.createRadialGradient(-this.r * 0.28, -this.r * 0.28, this.r * 0.05, 0, 0, this.r);
        grad.addColorStop(0, `hsla(${h},${s}%,${Math.min(96, l + 28)}%,${a * 0.55})`);
        grad.addColorStop(0.45, `hsla(${h},${s}%,${l}%,${a * 0.20})`);
        grad.addColorStop(1, `hsla(${h},${s}%,${Math.max(10, l - 20)}%,${a * 0.45})`);
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Rim highlight arc
        ctx.beginPath();
        ctx.arc(0, 0, this.r - 1, Math.PI * 1.1, Math.PI * 1.75);
        ctx.strokeStyle = `hsla(${h},${s}%,95%,${a * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Stitch dashes inner ring
        ctx.save();
        ctx.rotate(this.stitchPhase);
        const stitchR = this.r * 0.68;
        const stitchCount = Math.max(6, Math.floor(this.r * 0.9));
        const dashAng = (Math.PI * 2) / stitchCount;
        ctx.strokeStyle = `hsla(${h},${s}%,${Math.min(92, l + 18)}%,${a * 0.45})`;
        ctx.lineWidth = 0.8;
        for (let i = 0; i < stitchCount; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, stitchR, i * dashAng, i * dashAng + dashAng * 0.42);
            ctx.stroke();
        }
        ctx.restore();

        // Outer border
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${h},${s}%,${l}%,${a * 0.55})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Specular dot
        ctx.beginPath();
        ctx.arc(-this.r * 0.3, -this.r * 0.3, this.r * 0.14, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0,0%,100%,${a * 0.65})`;
        ctx.fill();

        ctx.restore();
    }
}

export default function BubbleBackground({ className = "", count = 34 }: BubbleBackgroundProps) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -999, y: -999 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const wrap = wrapRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let W = 0, H = 0;
        let bubbles: Bubble[] = [];
        let particles: { x: number; y: number; vx: number; vy: number; r: number; a: number; h: number }[] = [];

        function resize() {
            W = wrap.clientWidth;
            H = wrap.clientHeight;
            canvas.width = W;
            canvas.height = H;
        }
        resize();

        // Spawn bubbles spread across screen
        bubbles = Array.from({ length: count }, () => new Bubble(W, H, true));

        // Ambient particles
        particles = Array.from({ length: 55 }, () => ({
            x: rand(0, W), y: rand(0, H),
            vx: rand(-0.12, 0.12),
            vy: rand(-0.28, -0.06),
            r: rand(0.8, 2.2),
            a: rand(0.04, 0.18),
            h: pick(PALETTES).h,
        }));

        function drawParticles() {
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy;
                if (p.y < -4) { p.y = H + 4; p.x = rand(0, W); }
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.h},80%,75%,${p.a})`;
                ctx.fill();
            }
        }

        function drawConnections() {
            const maxDist = 120;
            for (let i = 0; i < bubbles.length; i++) {
                for (let j = i + 1; j < bubbles.length; j++) {
                    const a = bubbles[i], b = bubbles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < maxDist) {
                        const t = 1 - d / maxDist;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `hsla(${(a.pal.h + b.pal.h) / 2},75%,70%,${t * 0.12})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function tick() {
            ctx.clearRect(0, 0, W, H);
            const { x: mx, y: my } = mouseRef.current;
            drawParticles();
            drawConnections();
            for (const b of bubbles) { b.W = W; b.H = H; b.update(mx, my); b.draw(ctx); }
            rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);

        const onMove = (e: MouseEvent) => {
            const rect = wrap.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
        const onResize = () => { resize(); };

        wrap.addEventListener("mousemove", onMove);
        wrap.addEventListener("mouseleave", onLeave);
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            wrap.removeEventListener("mousemove", onMove);
            wrap.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("resize", onResize);
        };
    }, [count]);

    return (
        <div
            ref={wrapRef}
            className={`relative overflow-hidden ${className}`}
            style={{ background: "linear-gradient(160deg, #0a0a12 0%, #0f0f1e 50%, #080810 100%)" }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            {/* Slot for any overlay content (hero text, cards, etc.) */}
            <div className="relative z-10 w-full h-full" />
        </div>
    );
}