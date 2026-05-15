"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import ScrollTextReveal from "@/components/ScrollTextReveal";

const testimonials = [
  { name: "Sarah Chen", role: "CEO, TechVenture", avatar: "SC", color: "#111111", rating: 5, text: "Micro C Media completely transformed our digital presence. The team's attention to detail and creative vision exceeded every expectation. Our conversion rate increased by 280%." },
  { name: "Marcus Williams", role: "Founder, Elevate Brand", avatar: "MW", color: "#333333", rating: 5, text: "Working with Micro C Media was a game-changer. Their video production team captured our brand story in a way we never thought possible. 500K views in the first week." },
  { name: "Priya Sharma", role: "Marketing Director, NovaCorp", avatar: "PS", color: "#555555", rating: 5, text: "The UI/UX design work they delivered was absolutely stunning. Our app's user retention improved by 65% after the redesign. Professional, creative, and results-driven." },
  { name: "James O'Brien", role: "CMO, GrowthLabs", avatar: "JO", color: "#777777", rating: 5, text: "Their digital marketing strategy was exactly what we needed. Within 3 months, our organic traffic tripled and our social media following grew from 2K to 50K." },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-widest">Testimonials</span>
          </motion.div>

          <ScrollTextReveal
            text="What Our Clients Say"
            variant="color"
            className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] tracking-tight"
            as="h2"
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 md:p-12 relative overflow-hidden min-h-[280px] theme-shadow-card">
            <Quote size={48} className="absolute top-8 right-8 text-[var(--surface-muted)]" />

            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }} className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-8 max-w-3xl">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: testimonials[current].color }}>
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">{testimonials[current].name}</div>
                    <div className="text-sm text-[var(--text-soft)]">{testimonials[current].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-[var(--foreground)]" : "w-1.5 bg-[var(--surface-muted)] hover:bg-[var(--text-soft)]"}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={prev} data-cursor-hover className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} data-cursor-hover className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
