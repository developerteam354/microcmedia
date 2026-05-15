"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

interface ScrollTextRevealProps {
  text: string;
  variant?: "slide" | "color";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  serif?: boolean;
  activeColor?: string;
  mutedColor?: string;
}

export default function ScrollTextReveal({
  text,
  variant = "color", // Changed default to "color" as per user's "all content" request
  className = "",
  as: Component = "h2",
  delay = 0,
  serif = false,
  activeColor = "#000000", // Pure black as requested
  mutedColor = "#a3a3a3", // Neutral grey as requested
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  if (variant === "color") {
    return (
      <Component
        ref={containerRef}
        className={`${className} ${serif ? "font-serif italic" : ""}`}
      >
        <ColorReveal text={text} activeColor={activeColor} mutedColor={mutedColor} />
      </Component>
    );
  }

  // "slide" variant
  const words = text.split(" ");

  return (
    <Component
      ref={containerRef}
      className={`${className} ${serif ? "font-serif italic" : ""}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.1em] -mb-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

function ColorReveal({ 
  text, 
  activeColor, 
  mutedColor 
}: { 
  text: string; 
  activeColor: string; 
  mutedColor: string;
}) {
  const targetRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 92%", "start 40%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const words = text.split(" ");

  return (
    <span ref={targetRef} className="relative inline-block">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, (i + 1.5) / words.length);
        
        return (
          <Word 
            key={i} 
            progress={smoothProgress} 
            range={[start, end]} 
            activeColor={activeColor} 
            mutedColor={mutedColor}
          >
            {word}
          </Word>
        );
      })}
    </span>
  );
}

function Word({ 
  children, 
  progress, 
  range, 
  activeColor, 
  mutedColor 
}: { 
  children: string; 
  progress: any; 
  range: [number, number];
  activeColor: string;
  mutedColor: string;
}) {
  const opacity = useTransform(progress, range, [0.25, 1]); // Start at 25% opacity (grey) to 100% (black)
  
  return (
    <span className="relative inline-block mr-[0.25em]">
      {/* Background layer (always grey) */}
      <span 
        className="absolute inset-0 pointer-events-none select-none" 
        style={{ color: mutedColor, opacity: 0.25 }}
      >
        {children}
      </span>
      {/* Active layer (transitions to black) */}
      <motion.span style={{ opacity, color: activeColor }} className="relative inline-block">
        {children}
      </motion.span>
    </span>
  );
}