"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  // 3D Tilt Logic
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Tweak the output range for subtle 3D float (e.g. max 5 degrees rotation)
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }
  
  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

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

        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8, delay: 0.3 }} 
          className="relative group [perspective:1200px]"
        >
          
          {/* Animated Background Aura (Theme responsive: vibrant in light, subtle in dark) */}
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-[2.5rem] blur-2xl opacity-15 group-hover:opacity-30 dark:opacity-5 dark:group-hover:opacity-10 transition duration-1000 group-hover:duration-500 pointer-events-none" />

          {/* Main Animated 3D Box */}
          <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: "preserve-3d" 
            }}
            className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 md:p-12 relative overflow-hidden min-h-[280px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          >
            
            {/* Subtle inner floating glows */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle animated border sweep effect */}
            <div 
              className="absolute inset-0 rounded-3xl pointer-events-none p-[1px]"
              style={{
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 dark:via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            </div>

            <Quote size={48} className="absolute top-8 right-8 text-[var(--surface-muted)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 [transform:translateZ(30px)]" />

            <AnimatePresence mode="wait">
              <motion.div 
                key={current} 
                initial={{ opacity: 0, x: 30 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -30 }} 
                transition={{ duration: 0.4 }} 
                className="relative z-10 [transform:translateZ(40px)]"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-8 max-w-3xl">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md ring-1 ring-white/10" style={{ background: testimonials[current].color }}>
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">{testimonials[current].name}</div>
                    <div className="text-sm text-[var(--text-soft)]">{testimonials[current].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex items-center justify-between mt-8 relative z-10 px-2">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-[var(--foreground)] shadow-sm" : "w-1.5 bg-[var(--surface-muted)] hover:bg-[var(--text-soft)]"}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={prev} data-cursor-hover className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] hover:shadow-md transition-all hover:-translate-x-0.5" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} data-cursor-hover className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] hover:shadow-md transition-all hover:translate-x-0.5" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
