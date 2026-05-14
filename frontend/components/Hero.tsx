"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const heroWords = [
  { text: "Crafting", italic: false },
  { text: "digital", italic: true },
  { text: "experiences", italic: false },
  { text: "that", italic: false },
  { text: "inspire", italic: true },
];

const rotatingWords = ["inspire", "convert", "delight", "elevate", "captivate"];

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f4] via-[#f5f3ee] to-[#f8f7f4] pointer-events-none" />

      {/* Decorative floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft warm circle */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[15%] w-72 h-72 bg-gradient-to-br from-amber-100/40 to-orange-50/20 rounded-full blur-[80px]"
        />
        {/* Subtle blue circle */}
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-gradient-to-br from-blue-50/30 to-indigo-50/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.06] shadow-sm mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-[#888] font-medium">
            Premium Creative Agency
          </span>
        </motion.div>

        {/* Main headline with word-by-word reveal + italic serif words */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.08] mb-8 tracking-tight"
          style={{ perspective: "600px" }}
        >
          {heroWords.map((word, i) => {
            // The last word "inspire" will be the rotating animated word
            if (i === heroWords.length - 1) {
              return (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-3 md:mr-5 overflow-hidden"
                >
                  <span className="relative inline-block">
                    <motion.span
                      key={rotatingWords[currentWord]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="font-serif italic text-[#888] inline-block"
                    >
                      {rotatingWords[currentWord]}
                    </motion.span>
                  </span>
                </motion.span>
              );
            }

            return (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-3 md:mr-5"
              >
                {word.italic ? (
                  <span className="font-serif italic text-[#888]">{word.text}</span>
                ) : (
                  <span className="text-[#1a1a1a]">{word.text}</span>
                )}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-[#888] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We transform ideas into stunning digital realities through innovative
          design, development, and marketing strategies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            data-cursor-hover
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a1a1a] text-white font-medium overflow-hidden transition-all duration-300 hover:bg-[#333] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02]"
          >
            <span className="relative z-10">Get Started</span>
            <span className="relative z-10 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </span>
          </a>

          <a
            href="#work"
            data-cursor-hover
            className="group px-8 py-4 rounded-full bg-white border border-black/[0.08] text-[#1a1a1a] font-medium hover:border-black/20 transition-all duration-300 hover:shadow-lg"
          >
            <span className="flex items-center gap-2">
              View Our Work
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform text-[#888]"
              />
            </span>
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {["#7c3aed", "#3b82f6", "#ec4899", "#10b981"].map(
                (color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#f8f7f4] flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: color }}
                  >
                    {["S", "M", "P", "J"][i]}
                  </div>
                )
              )}
            </div>
            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-[#888]">
              Trusted by <strong className="text-[#1a1a1a]">200+</strong> clients
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-[#1a1a1a]/15 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-[#1a1a1a]/40 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
