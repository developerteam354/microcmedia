"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const values = [
  "Creative excellence in every pixel",
  "Data-driven strategies that convert",
  "Transparent communication always",
  "On-time delivery, every time",
  "Cutting-edge technology stack",
  "Long-term partnership mindset",
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-28 px-6 relative overflow-hidden"
    >
      {/* Background orb */}
      <motion.div
        style={{ y }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/60 font-medium uppercase tracking-widest">
                About Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              We Build Brands That{" "}
              <span className="gradient-text">Stand Out</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/55 text-lg leading-relaxed mb-6"
            >
              Micro C Media is a full-service creative agency born from a
              passion for exceptional digital experiences. We combine strategic
              thinking with creative execution to help brands connect with their
              audiences in meaningful ways.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/40 leading-relaxed mb-10"
            >
              From startups to established enterprises, we partner with
              ambitious brands to craft digital solutions that drive growth,
              inspire loyalty, and create lasting impact.
            </motion.p>

            {/* Values list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {values.map((value, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={16} className="text-violet-400 shrink-0" />
                  <span className="text-sm text-white/60">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl glass-strong border border-white/10 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-blue-900/10 pointer-events-none" />

              {/* Floating elements */}
              <div className="relative z-10 space-y-6">
                {/* Team avatars */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {["V", "A", "M", "K", "R"].map((letter, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-[#050508] flex items-center justify-center text-xs font-bold text-white"
                        style={{
                          background: `hsl(${i * 60 + 240}, 70%, 50%)`,
                        }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      40+ Creatives
                    </div>
                    <div className="text-xs text-white/40">
                      Across 3 continents
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06]" />

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Avg. Project ROI", value: "3.2x" },
                    { label: "Client Retention", value: "94%" },
                    { label: "Avg. Delivery Time", value: "3 wks" },
                    { label: "NPS Score", value: "72" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="glass rounded-xl p-4 border border-white/[0.06]"
                    >
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-white/40">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06]" />

                {/* Tech stack */}
                <div>
                  <div className="text-xs text-white/40 mb-3 uppercase tracking-widest">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "Figma",
                      "After Effects",
                      "Node.js",
                      "Tailwind",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-full glass border border-white/[0.08] text-white/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-5 glass-strong border border-white/10 rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="text-xs text-white/60 mb-0.5">Est.</div>
              <div className="text-lg font-bold gradient-text">2019</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
