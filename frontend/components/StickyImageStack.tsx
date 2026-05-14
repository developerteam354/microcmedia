"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue,
} from "framer-motion";
import Image from "next/image";

export interface StackImage {
    src: string;
    alt: string;
    label?: string;
    tag?: string;
    year?: string;
    description?: string;
}

interface StickyImageStackProps {
    images: StackImage[];
    /** Height of each "scroll slot" in vh units (default 100) */
    slotHeight?: number;
    className?: string;
}

/**
 * StickyImageStack — true sticky card-stack effect.
 *
 * HOW IT WORKS
 * ─────────────
 * • The outer container is `(images.length * slotHeight)vh` tall, providing
 *   the scroll distance for all cards.
 * • Inside it sits a `sticky` inner div that pins to the top of the viewport
 *   for the entire scroll of the container.
 * • We track scroll progress [0 → 1] across the whole container with
 *   `useScroll({ target: containerRef, offset: ["start start", "end end"] })`.
 * • Each card i is active during progress window [i/n → (i+1)/n].
 *   – It slides UP into view from y:100% → y:0% during its entry window.
 *   – The card stays fully visible until the next card's entry begins.
 *   – scale subtly from 1 → 0.96 as the next card arrives (depth cue).
 * • All cards are absolutely stacked at top:0 in the sticky container.
 *   z-index increases with index so card 2 renders above card 1, etc.
 *
 * NO JITTER: scroll progress is read from the container (native scroll),
 * not from window.scrollY directly, keeping Lenis and Framer in sync.
 */
export default function StickyImageStack({
    images,
    slotHeight = 100,
    className = "",
}: StickyImageStackProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const n = images.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        /* Outer: tall enough to scroll through all cards */
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={{ height: `${n * slotHeight}vh` }}
        >
            {/* Inner: sticks to viewport for the entire scroll of the container */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {images.map((img, i) => (
                    <StackCard
                        key={i}
                        img={img}
                        index={i}
                        total={n}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── individual card ───────────────────────────────────────────────────────

function StackCard({
    img,
    index,
    total,
    scrollYProgress,
}: {
    img: StackImage;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
}) {
    const n = total;

    // This card's active scroll window
    const start = index / n;
    const end = (index + 1) / n;

    // ── Entry: slide up from below during [start - entryDuration, start] ──
    // Give the entry some overlap so it feels snappy
    const entryDuration = 0.06; // fraction of total scroll progress
    const entryStart = index === 0 ? 0 : start - entryDuration;
    const entryEnd = index === 0 ? 0 : start;

    const y = useTransform(
        scrollYProgress,
        index === 0 ? [0, 0] : [entryStart, entryEnd],
        index === 0 ? ["0%", "0%"] : ["100%", "0%"]
    );

    // ── Exit: scale down slightly while the next card arrives ──
    const scaleStart = end - entryDuration;
    const scaleEnd = index < n - 1 ? end : 1;
    const scale = useTransform(
        scrollYProgress,
        index < n - 1 ? [scaleStart, scaleEnd] : [0, 1],
        index < n - 1 ? [1, 0.94] : [1, 1]
    );

    // ── Fade in on entry (only non-first cards need this) ──
    const opacity = useTransform(
        scrollYProgress,
        index === 0 ? [0, 0] : [entryStart, entryStart + 0.01],
        [1, 1]
    );

    return (
        <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
                y,
                scale,
                opacity,
                zIndex: index + 1,
                transformOrigin: "top center",
            }}
        >
            {/* Card surface */}
            <div className="absolute inset-4 md:inset-8 rounded-2xl overflow-hidden bg-[#111] shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
                {/* Image */}
                <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 90vw"
                    priority={index === 0}
                />

                {/* Bottom-to-top gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Top row: label + year */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    {img.label && (
                        <span className="font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">
                            {img.label}
                        </span>
                    )}
                    {img.year && (
                        <span className="font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase">
                            {img.year}
                        </span>
                    )}
                </div>

                {/* Bottom meta */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight tracking-tight">
                                {img.alt}
                            </h3>
                            {img.description && (
                                <p className="text-white/50 text-sm leading-relaxed max-w-sm hidden md:block">
                                    {img.description}
                                </p>
                            )}
                        </div>

                        {img.tag && (
                            <span className="shrink-0 text-[10px] font-semibold tracking-[0.18em] uppercase text-white px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 whitespace-nowrap">
                                {img.tag}
                            </span>
                        )}
                    </div>

                    {/* Progress dots */}
                    <div className="flex gap-1.5 mt-4">
                        {Array.from({ length: total }).map((_, j) => (
                            <div
                                key={j}
                                className={`h-0.5 rounded-full transition-all duration-300 ${j <= index
                                    ? "bg-white w-6"
                                    : "bg-white/25 w-3"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}