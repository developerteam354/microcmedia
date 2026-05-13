"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVenture",
    avatar: "SC",
    color: "#7c3aed",
    rating: 5,
    text: "Micro C Media completely transformed our digital presence. The team's attention to detail and creative vision exceeded every expectation. Our conversion rate increased by 280% within the first quarter.",
  },
  {
    name: "Marcus Williams",
    role: "Founder, Elevate Brand",
    avatar: "MW",
    color: "#3b82f6",
    rating: 5,
    text: "Working with Micro C Media was a game-changer. Their video production team captured our brand story in a way we never thought possible. The results speak for themselves — 500K views in the first week.",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director, NovaCorp",
    avatar: "PS",
    color: "#ec4899",
    rating: 5,
    text: "The UI/UX design work they delivered was absolutely stunning. Our app's user retention improved by 65% after the redesign. The team is professional, creative, and genuinely cares about results.",
  },
  {
    name: "James O'Brien",
    role: "CMO, GrowthLabs",
    avatar: "JO",
    color: "#10b981",
    rating: 5,
    text: "Their digital marketing strategy was exactly what we needed. Within 3 months, our organic traffic tripled and our social media following grew from 2K to 50K. Incredible ROI.",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-widest">
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
          >
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="glass-strong rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden min-h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-transparent pointer-events-none" />

            {/* Quote icon */}
            <Quote
              size={48}
              className="absolute top-8 right-8 text-white/[0.04]"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-amber-400 fill-amber-400"
                      />
                    )
                  )}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-3xl">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{
                      background: testimonials[current].color,
                    }}
                  >
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-white/40">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-violet-500"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                data-cursor-hover
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                data-cursor-hover
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
