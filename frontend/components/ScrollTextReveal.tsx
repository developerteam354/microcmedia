"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollTextRevealProps {
    text: string;
    className?: string;
    /** How early to trigger before element enters view (default "-80px") */
    margin?: string;
    /** Initial delay before first word animates (in seconds, default 0) */
    delay?: number;
    /**
     * "slide"  — word slides up from a clip mask (cinematic, closest to video)
     * "fade"   — word fades + floats up (matches your Hero style)
     * "blur"   — word unblurs into focus
     */
    variant?: "slide" | "fade" | "blur";
    /** Render each word in serif italic (matches your existing italic accent words) */
    serif?: boolean;
    as?: keyof JSX.IntrinsicElements;
}

const makeVariants = (delay: number) => ({
    slide: {
        hidden: { y: "105%", opacity: 0 },
        visible: (i: number) => ({
            y: "0%",
            opacity: 1,
            transition: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                delay: delay + i * 0.055,
            },
        }),
    },
    fade: {
        hidden: { opacity: 0, y: 32 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                delay: delay + i * 0.055,
            },
        }),
    },
    blur: {
        hidden: { opacity: 0, filter: "blur(10px)", scale: 1.06 },
        visible: (i: number) => ({
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                delay: delay + i * 0.055,
            },
        }),
    },
});

export default function ScrollTextReveal({
    text,
    className = "",
    margin = "-80px",
    variant = "slide",
    serif = false,
    delay = 0,
    as: Tag = "p",
}: ScrollTextRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref as any, { once: true, margin: margin as any });

    const words = text.split(" ");
    const variants = makeVariants(delay);
    const vari = variants[variant];

    return (
        // @ts-ignore — dynamic tag
        <Tag
            ref={ref}
            className={`flex flex-wrap gap-x-[0.28em] overflow-visible ${className}`}
        >
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden leading-[1.15]"
                >
                    <motion.span
                        className={`inline-block leading-[1.15] ${serif ? "font-serif italic text-[#888]" : ""
                            }`}
                        custom={i}
                        variants={vari}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}