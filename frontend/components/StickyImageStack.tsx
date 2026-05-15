"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue,
    useMotionTemplate,
    useSpring,
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
    className?: string;
    slotHeight?: number;
}

export default function StickyImageStack({ images, className = "", slotHeight = 100 }: StickyImageStackProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const n = images.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={{ height: `${n * slotHeight}vh` }}
        >
            <div className="sticky top-0 overflow-hidden" style={{ height: "100svh" }}>
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
    const sliceSize = 1 / n;
    const sliceStart = index * sliceSize;
    // Slide-in completes at 32% of the slice — gives it room to breathe
    const entryEnd = sliceStart + sliceSize * 0.32;

    // ── Slide up from below on entry ──
    const yRaw = useTransform(
        scrollYProgress,
        index === 0 ? [0, 1] : [sliceStart, entryEnd],
        index === 0 ? ["0%", "0%"] : ["110%", "0%"]
    );
    // Spring-smooth the raw transform for organic feel
    const y = useSpring(yRaw, { stiffness: 60, damping: 18, mass: 0.8 });

    // ── Scale & dim this card when the next one enters ──
    const nextSliceStart = (index + 1) * sliceSize;
    const nextEntryEnd = nextSliceStart + sliceSize * 0.32;

    const scaleRaw = useTransform(
        scrollYProgress,
        index < n - 1 ? [nextSliceStart, nextEntryEnd] : [0, 1],
        index < n - 1 ? [1, 0.88] : [1, 1]
    );
    const scale = useSpring(scaleRaw, { stiffness: 55, damping: 20, mass: 0.9 });

    const opacityRaw = useTransform(
        scrollYProgress,
        index < n - 1 ? [nextSliceStart, nextEntryEnd] : [0, 1],
        index < n - 1 ? [1, 0.45] : [1, 1]
    );
    const opacity = useSpring(opacityRaw, { stiffness: 55, damping: 20, mass: 0.9 });

    // ── Subtle Y offset so cards stack with depth ──
    const stackOffsetRaw = useTransform(
        scrollYProgress,
        index < n - 1 ? [nextSliceStart, nextEntryEnd] : [0, 1],
        index < n - 1 ? ["0px", "-28px"] : ["0px", "0px"]
    );
    const stackOffset = useSpring(stackOffsetRaw, { stiffness: 55, damping: 20, mass: 0.9 });

    // ── Brightness filter ──
    const brightnessVal = useTransform(
        scrollYProgress,
        index < n - 1 ? [nextSliceStart, nextEntryEnd] : [0, 1],
        index < n - 1 ? [1, 0.55] : [1, 1]
    );
    const filterStyle = useMotionTemplate`brightness(${brightnessVal})`;

    // ── Border glow on the active (top) card ──
    // "Active" = this card is currently on top = it has entered but next hasn't yet
    // We derive a "glow intensity" that fades in as card arrives and fades out as next arrives
    const glowIn = useTransform(
        scrollYProgress,
        index === 0 ? [0, 0.001] : [sliceStart, entryEnd],
        index === 0 ? [1, 1] : [0, 1]
    );
    const glowOut = useTransform(
        scrollYProgress,
        index < n - 1 ? [nextSliceStart, nextEntryEnd] : [0.999, 1],
        index < n - 1 ? [1, 0] : [1, 0]
    );
    // Combined: both must be high → active
    // We use glowIn as the driver and glowOut as a multiplier via CSS var trick
    const borderOpacity = useTransform(
        [glowIn, glowOut] as MotionValue<number>[],
        ([i, o]: number[]) => Math.min(i, o)
    );

    return (
        <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
                y,
                scale,
                zIndex: index + 1,
                transformOrigin: "top center",
                opacity,
                translateY: stackOffset,
            }}
        >
            {/* Outer glow ring — animate opacity */}
            <motion.div
                className="absolute left-4 right-4 top-[18svh] bottom-[18svh] rounded-2xl pointer-events-none sm:left-8 sm:right-8 md:left-[12vw] md:right-[12vw] md:top-[10vh] md:bottom-[10vh] md:rounded-3xl"
                style={{
                    opacity: borderOpacity,
                    boxShadow: "0 0 0 1.5px rgba(255,255,255,0.55), 0 0 48px 6px rgba(255,255,255,0.12)",
                    zIndex: 10,
                }}
            />

            {/* Card surface */}
            <motion.div
                className="absolute left-4 right-4 top-[18svh] bottom-[18svh] overflow-hidden rounded-2xl bg-[#0d0d0d] sm:left-8 sm:right-8 md:left-[12vw] md:right-[12vw] md:top-[10vh] md:bottom-[10vh] md:rounded-3xl"
                style={{
                    filter: filterStyle,
                    boxShadow: "0 22px 70px rgba(0,0,0,0.48), 0 4px 16px rgba(0,0,0,0.28)",
                }}
            >
                {/* Animated shimmer border */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none md:rounded-3xl"
                    style={{
                        zIndex: 12,
                        opacity: borderOpacity,
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            borderRadius: "1.5rem",
                            padding: "1px",
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.2) 100%)",
                            WebkitMask:
                                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                        }}
                    />
                </motion.div>

                <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 92vw, (max-width: 768px) 84vw, 76vw"
                    priority={index === 0}
                />

                {/* Dark scrim — stronger at bottom for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />

                {/* Top row: label + year */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between md:top-5 md:left-7 md:right-7">
                    {img.label && (
                        <span
                            className="font-mono text-[10px] tracking-[0.28em] text-white/35 uppercase"
                            style={{ letterSpacing: "0.28em" }}
                        >
                            {img.label}
                        </span>
                    )}
                    {img.year && (
                        <span
                            className="font-mono text-[10px] tracking-[0.22em] text-white/25 uppercase"
                        >
                            {img.year}
                        </span>
                    )}
                </div>

                {/* Bottom: title + tag + description + progress */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-7 md:right-7">
                    <div className="flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between md:gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white text-base md:text-xl font-semibold tracking-tight leading-tight md:mb-1.5">
                                {img.alt}
                            </h3>
                            {img.description && (
                                <p className="text-white/45 text-xs leading-relaxed max-w-sm hidden md:block line-clamp-2">
                                    {img.description}
                                </p>
                            )}
                        </div>
                        {img.tag && (
                            <span className="shrink-0 text-[8px] md:text-[9px] font-semibold tracking-[0.16em] md:tracking-[0.18em] uppercase text-white/90 px-2.5 md:px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                                {img.tag}
                            </span>
                        )}
                    </div>

                    {/* Progress pills */}
                    <div className="flex gap-1.5 mt-3 md:mt-4">
                        {Array.from({ length: total }).map((_, j) => (
                            <motion.div
                                key={j}
                                className="h-[2px] rounded-full bg-white"
                                animate={{
                                    width: j <= index ? 28 : 12,
                                    opacity: j <= index ? 1 : 0.22,
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
