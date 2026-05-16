"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollPipeline v3 — Layout-aware multi-line scroll animation
 *
 * What makes this different:
 * - Lines START after the hero section ends (reads #hero bottom)
 * - Each line reads real DOM bounding boxes of cards/sections
 * - Routes are computed around, between, and through those boxes
 * - Lines split / diverge / converge as they pass through the layout
 * - Every line has a unique path that changes behaviour per section
 *
 * SETUP:
 *  1. components/ScrollPipeline.tsx  ← this file
 *  2. page.tsx: <main className="pt-[72px] relative">
 *                 <ScrollPipeline />
 *                 ...sections
 *               </main>
 */

type Pt = { x: number; y: number };

// ─── Catmull-Rom spline ───────────────────────────────────────────────────────
function crPt(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
    const t2 = t * t, t3 = t2 * t;
    return {
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    };
}

function sampleSpline(pts: Pt[], n: number): Pt[] {
    if (pts.length < 2) return pts;
    const out: Pt[] = [];
    const count = pts.length, segs = count - 1;
    for (let s = 0; s <= n; s++) {
        const t = (s / n) * segs;
        const seg = Math.min(Math.floor(t), segs - 1);
        out.push(crPt(
            pts[Math.max(0, seg - 1)],
            pts[seg],
            pts[Math.min(count - 1, seg + 1)],
            pts[Math.min(count - 1, seg + 2)],
            t - seg,
        ));
    }
    return out;
}

// ─── Layout snapshot ──────────────────────────────────────────────────────────
interface SectionBox {
    id: string;
    top: number;
    bottom: number;
    left: number;
    right: number;
    midX: number;
    midY: number;
    width: number;
    height: number;
}

function getLayoutBoxes(): SectionBox[] {
    const ids = ["stats", "services", "work", "about", "testimonials", "faq", "contact"];
    return ids.flatMap((id) => {
        const el = document.getElementById(id);
        if (!el) return [];
        const r = el.getBoundingClientRect();
        const scrollY = window.scrollY;
        return [{
            id,
            top: r.top + scrollY,
            bottom: r.bottom + scrollY,
            left: r.left,
            right: r.right,
            midX: r.left + r.width / 2,
            midY: r.top + scrollY + r.height / 2,
            width: r.width,
            height: r.height,
        }];
    });
}

function getHeroBottom(): number {
    const hero = document.getElementById("hero");
    if (!hero) return 0;
    return hero.getBoundingClientRect().bottom + window.scrollY;
}

// ─── Path builder ─────────────────────────────────────────────────────────────
// For each "pipe" we define how it behaves relative to each section box.
// xBias: how far from section midX the line travels  (neg = left, pos = right)
// pass:  "left" | "right" | "through" | "between" | "split"

interface PipeDef {
    id: string;
    startXFrac: number;   // x as fraction of W where line begins (at hero bottom)
    width: number;
    alpha: number;
    dash: boolean;
    hasDot: boolean;
    // per-section routing: keyed by section id
    routes: Record<string, {
        entryXFrac: number;  // x fraction when entering section top
        exitXFrac: number;  // x fraction when leaving section bottom
        // optional mid-waypoints expressed as [{xFrac, yFrac_within_section}]
        mids?: { xFrac: number; yFrac: number }[];
    }>;
}

const PIPE_DEFS: PipeDef[] = [
    // ── Line A: left rail, ducks inside stats card, weaves left of service cards ──
    {
        id: "A",
        startXFrac: 0.08,
        width: 1.4,
        alpha: 0.60,
        dash: false,
        hasDot: true,
        routes: {
            stats: { entryXFrac: 0.08, exitXFrac: 0.08, mids: [{ xFrac: 0.22, yFrac: 0.5 }] },
            services: { entryXFrac: 0.08, exitXFrac: 0.05, mids: [{ xFrac: 0.10, yFrac: 0.3 }, { xFrac: 0.06, yFrac: 0.7 }] },
            work: { entryXFrac: 0.05, exitXFrac: 0.09, mids: [{ xFrac: 0.03, yFrac: 0.5 }] },
            about: { entryXFrac: 0.09, exitXFrac: 0.07, mids: [{ xFrac: 0.12, yFrac: 0.4 }, { xFrac: 0.06, yFrac: 0.75 }] },
            testimonials: { entryXFrac: 0.07, exitXFrac: 0.06, mids: [{ xFrac: 0.04, yFrac: 0.5 }] },
            faq: { entryXFrac: 0.06, exitXFrac: 0.08, mids: [{ xFrac: 0.10, yFrac: 0.5 }] },
            contact: { entryXFrac: 0.08, exitXFrac: 0.12, mids: [{ xFrac: 0.06, yFrac: 0.4 }, { xFrac: 0.14, yFrac: 0.8 }] },
        },
    },

    // ── Line B: left-centre, threads between service grid columns ──
    {
        id: "B",
        startXFrac: 0.26,
        width: 1.6,
        alpha: 0.65,
        dash: false,
        hasDot: true,
        routes: {
            stats: { entryXFrac: 0.26, exitXFrac: 0.22, mids: [{ xFrac: 0.50, yFrac: 0.5 }] },
            services: { entryXFrac: 0.22, exitXFrac: 0.34, mids: [{ xFrac: 0.16, yFrac: 0.25 }, { xFrac: 0.35, yFrac: 0.55 }, { xFrac: 0.18, yFrac: 0.82 }] },
            work: { entryXFrac: 0.34, exitXFrac: 0.20, mids: [{ xFrac: 0.38, yFrac: 0.4 }, { xFrac: 0.16, yFrac: 0.75 }] },
            about: { entryXFrac: 0.20, exitXFrac: 0.30, mids: [{ xFrac: 0.10, yFrac: 0.35 }, { xFrac: 0.32, yFrac: 0.7 }] },
            testimonials: { entryXFrac: 0.30, exitXFrac: 0.24, mids: [{ xFrac: 0.38, yFrac: 0.5 }] },
            faq: { entryXFrac: 0.24, exitXFrac: 0.28, mids: [{ xFrac: 0.18, yFrac: 0.4 }, { xFrac: 0.30, yFrac: 0.7 }] },
            contact: { entryXFrac: 0.28, exitXFrac: 0.35, mids: [{ xFrac: 0.22, yFrac: 0.5 }] },
        },
    },

    // ── Line C: right-centre, mirror of B ──
    {
        id: "C",
        startXFrac: 0.74,
        width: 1.6,
        alpha: 0.65,
        dash: false,
        hasDot: true,
        routes: {
            stats: { entryXFrac: 0.74, exitXFrac: 0.78, mids: [{ xFrac: 0.50, yFrac: 0.5 }] },
            services: { entryXFrac: 0.78, exitXFrac: 0.66, mids: [{ xFrac: 0.84, yFrac: 0.25 }, { xFrac: 0.65, yFrac: 0.55 }, { xFrac: 0.82, yFrac: 0.82 }] },
            work: { entryXFrac: 0.66, exitXFrac: 0.80, mids: [{ xFrac: 0.62, yFrac: 0.4 }, { xFrac: 0.84, yFrac: 0.75 }] },
            about: { entryXFrac: 0.80, exitXFrac: 0.70, mids: [{ xFrac: 0.90, yFrac: 0.35 }, { xFrac: 0.68, yFrac: 0.7 }] },
            testimonials: { entryXFrac: 0.70, exitXFrac: 0.76, mids: [{ xFrac: 0.62, yFrac: 0.5 }] },
            faq: { entryXFrac: 0.76, exitXFrac: 0.72, mids: [{ xFrac: 0.82, yFrac: 0.4 }, { xFrac: 0.70, yFrac: 0.7 }] },
            contact: { entryXFrac: 0.72, exitXFrac: 0.65, mids: [{ xFrac: 0.78, yFrac: 0.5 }] },
        },
    },

    // ── Line D: right rail ──
    {
        id: "D",
        startXFrac: 0.92,
        width: 1.4,
        alpha: 0.60,
        dash: false,
        hasDot: true,
        routes: {
            stats: { entryXFrac: 0.92, exitXFrac: 0.92, mids: [{ xFrac: 0.78, yFrac: 0.5 }] },
            services: { entryXFrac: 0.92, exitXFrac: 0.95, mids: [{ xFrac: 0.90, yFrac: 0.3 }, { xFrac: 0.94, yFrac: 0.7 }] },
            work: { entryXFrac: 0.95, exitXFrac: 0.91, mids: [{ xFrac: 0.97, yFrac: 0.5 }] },
            about: { entryXFrac: 0.91, exitXFrac: 0.93, mids: [{ xFrac: 0.88, yFrac: 0.4 }, { xFrac: 0.94, yFrac: 0.75 }] },
            testimonials: { entryXFrac: 0.93, exitXFrac: 0.94, mids: [{ xFrac: 0.96, yFrac: 0.5 }] },
            faq: { entryXFrac: 0.94, exitXFrac: 0.92, mids: [{ xFrac: 0.90, yFrac: 0.5 }] },
            contact: { entryXFrac: 0.92, exitXFrac: 0.88, mids: [{ xFrac: 0.94, yFrac: 0.4 }, { xFrac: 0.86, yFrac: 0.8 }] },
        },
    },

    // ── Line E: dashed diagonal sweeper (left→right, aggressive crossing) ──
    {
        id: "E",
        startXFrac: 0.14,
        width: 0.9,
        alpha: 0.30,
        dash: true,
        hasDot: false,
        routes: {
            stats: { entryXFrac: 0.14, exitXFrac: 0.50 },
            services: { entryXFrac: 0.50, exitXFrac: 0.76, mids: [{ xFrac: 0.34, yFrac: 0.5 }] },
            work: { entryXFrac: 0.76, exitXFrac: 0.28, mids: [{ xFrac: 0.60, yFrac: 0.4 }] },
            about: { entryXFrac: 0.28, exitXFrac: 0.65, mids: [{ xFrac: 0.18, yFrac: 0.5 }] },
            testimonials: { entryXFrac: 0.65, exitXFrac: 0.22 },
            faq: { entryXFrac: 0.22, exitXFrac: 0.58, mids: [{ xFrac: 0.40, yFrac: 0.5 }] },
            contact: { entryXFrac: 0.58, exitXFrac: 0.45 },
        },
    },

    // ── Line F: dashed diagonal sweeper (right→left, mirror) ──
    {
        id: "F",
        startXFrac: 0.86,
        width: 0.9,
        alpha: 0.30,
        dash: true,
        hasDot: false,
        routes: {
            stats: { entryXFrac: 0.86, exitXFrac: 0.50 },
            services: { entryXFrac: 0.50, exitXFrac: 0.24, mids: [{ xFrac: 0.66, yFrac: 0.5 }] },
            work: { entryXFrac: 0.24, exitXFrac: 0.72, mids: [{ xFrac: 0.40, yFrac: 0.4 }] },
            about: { entryXFrac: 0.72, exitXFrac: 0.35, mids: [{ xFrac: 0.82, yFrac: 0.5 }] },
            testimonials: { entryXFrac: 0.35, exitXFrac: 0.78 },
            faq: { entryXFrac: 0.78, exitXFrac: 0.42, mids: [{ xFrac: 0.60, yFrac: 0.5 }] },
            contact: { entryXFrac: 0.42, exitXFrac: 0.55 },
        },
    },
];

const SECTION_ORDER = ["stats", "services", "work", "about", "testimonials", "faq", "contact"];
const SAMPLES = 600;

// ─── Build full waypoint list for one pipe ────────────────────────────────────
function buildWaypoints(pipe: PipeDef, boxes: SectionBox[], W: number, heroBottom: number): Pt[] {
    const pts: Pt[] = [];

    // Start: bottom of hero section
    pts.push({ x: pipe.startXFrac * W, y: heroBottom + 40 });

    for (const id of SECTION_ORDER) {
        const box = boxes.find((b) => b.id === id);
        if (!box) continue;
        const route = pipe.routes[id];
        if (!route) continue;

        // Entry point — top of section
        pts.push({ x: route.entryXFrac * W, y: box.top + 20 });

        // Mid-waypoints — relative to section height
        if (route.mids) {
            for (const m of route.mids) {
                pts.push({
                    x: m.xFrac * W,
                    y: box.top + m.yFrac * box.height,
                });
            }
        }

        // Exit point — bottom of section
        pts.push({ x: route.exitXFrac * W, y: box.bottom - 20 });
    }

    return pts;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ScrollPipeline() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    // Cache layout so we don't re-query DOM every frame
    const layoutRef = useRef<{ boxes: SectionBox[]; heroBottom: number } | null>(null);
    const splinesRef = useRef<Map<string, Pt[]>>(new Map());

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // ── Resize ──────────────────────────────────────────────────────────────
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
            // Invalidate spline cache on resize
            layoutRef.current = null;
            splinesRef.current = new Map();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(document.documentElement);

        // ── Layout reader (lazy, after DOM is ready) ────────────────────────────
        const readLayout = () => {
            if (layoutRef.current) return layoutRef.current;
            const boxes = getLayoutBoxes();
            const heroBottom = getHeroBottom();
            if (boxes.length === 0 || heroBottom === 0) return null;
            layoutRef.current = { boxes, heroBottom };
            return layoutRef.current;
        };

        // Re-read layout 500ms after mount (sections may not be measured yet)
        const layoutTimer = setTimeout(() => {
            layoutRef.current = null;
            splinesRef.current = new Map();
        }, 500);

        // ── Draw loop ────────────────────────────────────────────────────────────
        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            const scrollY = window.scrollY;
            const viewH = window.innerHeight;

            ctx.clearRect(0, 0, W, H);

            const layout = readLayout();
            if (!layout) {
                rafRef.current = requestAnimationFrame(draw);
                return;
            }

            const isDark = document.documentElement.dataset.theme === "dark";
            const lineRGB = isDark ? "220,215,255" : "18,8,50";
            const dotRGB = isDark ? "180,160,255" : "100,55,210";
            const ghostRGB = isDark ? "180,175,255" : "30,15,80";

            // Head = viewport bottom + lookahead; tail = viewport top - small fade window
            const headY = scrollY + viewH * 0.75;
            const headFrac = Math.min(headY / H, 1);
            const headIdx = Math.floor(headFrac * SAMPLES);

            const tailY = Math.max(0, scrollY - viewH * 0.10);
            const tailFrac = Math.min(tailY / H, 1);
            const tailIdx = Math.floor(tailFrac * SAMPLES);

            PIPE_DEFS.forEach((pipe) => {
                // Build / cache spline for this pipe
                if (!splinesRef.current.has(pipe.id)) {
                    const wps = buildWaypoints(pipe, layout.boxes, W, layout.heroBottom);
                    const spline = sampleSpline(wps, SAMPLES);
                    splinesRef.current.set(pipe.id, spline);
                }
                const spline = splinesRef.current.get(pipe.id)!;
                if (!spline || spline.length < 2) return;

                const from = Math.max(0, tailIdx);
                const to = Math.min(headIdx, spline.length - 1);

                // ── Ghost (full path, very faint) ──────────────────────────────────
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(spline[0].x, spline[0].y);
                for (let i = 1; i < spline.length; i++) ctx.lineTo(spline[i].x, spline[i].y);
                ctx.setLineDash(pipe.dash ? [2, 18] : [1, 16]);
                ctx.lineWidth = pipe.width * 0.5;
                ctx.lineCap = "round";
                ctx.strokeStyle = `rgba(${ghostRGB}, 0.08)`;
                ctx.stroke();
                ctx.restore();

                if (from >= to) {
                    rafRef.current = requestAnimationFrame(draw);
                    return;
                }

                // ── Revealed segment ────────────────────────────────────────────────
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(spline[from].x, spline[from].y);
                for (let i = from + 1; i <= to; i++) ctx.lineTo(spline[i].x, spline[i].y);
                ctx.setLineDash(pipe.dash ? [4, 10] : []);
                ctx.lineWidth = pipe.width;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.strokeStyle = `rgba(${lineRGB}, ${pipe.alpha})`;
                ctx.stroke();
                ctx.restore();

                // ── Relay dots at section entry/exit ───────────────────────────────
                if (pipe.hasDot) {
                    // Place dots at the exact waypoint Y positions
                    const waypointYs = buildWaypoints(pipe, layout.boxes, W, layout.heroBottom).map(p => p.y);
                    waypointYs.forEach((wy) => {
                        // Find closest spline index to this Y
                        let best = 0, bestDist = Infinity;
                        for (let i = 0; i < spline.length; i++) {
                            const d = Math.abs(spline[i].y - wy);
                            if (d < bestDist) { bestDist = d; best = i; }
                        }
                        if (best > to || best < from) return;
                        const px = spline[best].x;
                        const py = spline[best].y;

                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(${dotRGB}, 0.50)`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                        ctx.restore();

                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${dotRGB}, 0.75)`;
                        ctx.fill();
                        ctx.restore();
                    });
                }

                // ── Travelling head dot ──────────────────────────────────────────────
                if (pipe.hasDot && to > 4 && to < spline.length - 2) {
                    const hx = spline[to].x;
                    const hy = spline[to].y;

                    const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 10);
                    g.addColorStop(0, `rgba(${dotRGB}, 0.50)`);
                    g.addColorStop(0.5, `rgba(${dotRGB}, 0.12)`);
                    g.addColorStop(1, `rgba(${dotRGB}, 0.00)`);
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(hx, hy, 10, 0, Math.PI * 2);
                    ctx.fillStyle = g;
                    ctx.fill();
                    ctx.restore();

                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(hx, hy, pipe.width + 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${dotRGB}, 0.95)`;
                    ctx.fill();
                    ctx.restore();
                }
            });

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            clearTimeout(layoutTimer);
            ro.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}