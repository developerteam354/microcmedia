"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import ScrollTextReveal from "@/components/ScrollTextReveal";

const testimonials = [
  { name: "Sarah Chen", role: "CEO, TechVenture", avatar: "SC", color: "#7c3aed", rating: 5, text: "Micro C Media completely transformed our digital presence. The team's attention to detail and creative vision exceeded every expectation. Our conversion rate increased by 280%." },
  { name: "Marcus Williams", role: "Founder, Elevate Brand", avatar: "MW", color: "#3b82f6", rating: 5, text: "Working with Micro C Media was a game-changer. Their video production team captured our brand story in a way we never thought possible. 500K views in the first week." },
  { name: "Priya Sharma", role: "Marketing Director, NovaCorp", avatar: "PS", color: "#ec4899", rating: 5, text: "The UI/UX design work they delivered was absolutely stunning. Our app's user retention improved by 65% after the redesign. Professional, creative, and results-driven." },
  { name: "James O'Brien", role: "CMO, GrowthLabs", avatar: "JO", color: "#10b981", rating: 5, text: "Their digital marketing strategy was exactly what we needed. Within 3 months, our organic traffic tripled and our social media following grew from 2K to 50K." },
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.06] shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-xs text-[#888] font-medium uppercase tracking-widest">Testimonials</span>
          </motion.div>

          <ScrollTextReveal
            text="What Our Clients Say"
            variant="color"
            className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] tracking-tight"
            as="h2"
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
          <div className="bg-white rounded-3xl border border-black/[0.06] p-8 md:p-12 relative overflow-hidden min-h-[280px] shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
            <Quote size={48} className="absolute top-8 right-8 text-black/[0.04]" />

            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }} className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-[#444] leading-relaxed mb-8 max-w-3xl">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: testimonials[current].color }}>
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a1a1a]">{testimonials[current].name}</div>
                    <div className="text-sm text-[#aaa]">{testimonials[current].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-[#1a1a1a]" : "w-1.5 bg-black/[0.12] hover:bg-black/[0.25]"}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={prev} data-cursor-hover className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-[#888] hover:text-[#1a1a1a] hover:border-black/[0.15] transition-all" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} data-cursor-hover className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-[#888] hover:text-[#1a1a1a] hover:border-black/[0.15] transition-all" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
