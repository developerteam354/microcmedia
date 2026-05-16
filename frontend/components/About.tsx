"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Globe2, Sparkles, Award, Shield, Zap } from "lucide-react";
import ScrollTextReveal from "@/components/ScrollTextReveal";

const values = [
  { title: "Creative Excellence", desc: "Crafting unique digital experiences that resonate.", icon: Sparkles },
  { title: "Data-Driven Strategy", desc: "Measurable results backed by deep analytics.", icon: Zap },
  { title: "Transparent Growth", desc: "Clear communication and honest partnerships.", icon: Shield },
  { title: "Global Perspective", desc: "Diverse talent delivering world-class solutions.", icon: Globe2 },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle background decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-violet-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
            >
              <Award size={14} className="text-violet-500" />
              <span className="text-xs text-violet-500 font-bold uppercase tracking-widest">Since 2019</span>
            </motion.div>

            <div className="mb-8">
              <ScrollTextReveal
                text="We are a Modern"
                variant="color"
                className="text-5xl md:text-6xl font-bold text-[var(--foreground)] tracking-tight mb-2"
                as="h2"
              />
              <ScrollTextReveal
                text="Creative Agency"
                variant="color"
                serif
                className="text-5xl md:text-6xl font-bold tracking-tight text-violet-500"
                as="h2"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-[var(--text-muted)] leading-relaxed mb-12 max-w-xl"
            >
              Micro C Media combines strategic thinking with exceptional design to help ambitious brands grow in the digital age. We believe in the power of creativity to solve complex business challenges.
            </motion.p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center group-hover:bg-violet-500 group-hover:border-violet-500 transition-all duration-300">
                    <v.icon size={18} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-base font-bold text-[var(--foreground)]">{v.title}</h4>
                  <p className="text-sm text-[var(--text-soft)] leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="relative">
            {/* Main Image/Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square md:aspect-[4/5] rounded-[3rem] bg-[var(--surface-soft)] border border-[var(--border)] overflow-hidden shadow-2xl group"
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                alt="Creative Agency" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
              
              {/* Floating Stat Card Inside */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-8 left-8 right-8 bg-[var(--surface)]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-black text-[var(--foreground)] tracking-tighter">94%</div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--text-soft)] font-bold">Retention Rate</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={24} />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Orbiting Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 bg-violet-600 rounded-[2rem] shadow-2xl shadow-violet-500/40 flex flex-col items-center justify-center text-white p-4 text-center z-10"
            >
              <div className="text-2xl md:text-3xl font-black">3.2x</div>
              <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight opacity-80 leading-none">Average ROI</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] shadow-2xl flex flex-col items-center justify-center p-4 text-center z-10"
            >
              <div className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tighter">40+</div>
              <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight text-[var(--text-soft)] leading-none">Experts</div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
