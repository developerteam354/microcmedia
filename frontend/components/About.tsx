"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import ScrollTextReveal from "@/components/ScrollTextReveal";

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

  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-widest">About Us</span>
            </motion.div>

            {/* ── Headings ── */}
            <div className="mb-6">
              <ScrollTextReveal
                text="We Build Brands That"
                variant="color"
                className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] tracking-tight leading-tight"
                as="h2"
              />
              <ScrollTextReveal
                text="Stand Out"
                variant="color"
                serif
                className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight"
                as="h2"
              />
            </div>

            <ScrollTextReveal
              text="Micro C Media is a full-service creative agency born from a passion for exceptional digital experiences. We combine strategic thinking with creative execution."
              variant="color"
              className="text-[var(--foreground)] text-lg leading-relaxed mb-6"
              as="p"
            />

            <ScrollTextReveal
              text="From startups to established enterprises, we partner with ambitious brands to craft digital solutions that drive growth and create lasting impact."
              variant="color"
              className="text-[var(--foreground)] leading-relaxed mb-10"
              as="p"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {values.map((value, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-sm text-[var(--text-muted)]">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-8 overflow-hidden theme-shadow-soft">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {["V", "A", "M", "K", "R"].map((letter, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--surface)] flex items-center justify-center text-xs font-bold text-white" style={{ background: `hsl(0, 0%, ${22 + i * 12}%)` }}>
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--foreground)]">40+ Creatives</div>
                    <div className="text-xs text-[var(--text-soft)]">Across 3 continents</div>
                  </div>
                </div>

                <div className="h-px bg-[var(--border)]" />

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Avg. Project ROI", value: "3.2x" },
                    { label: "Client Retention", value: "94%" },
                    { label: "Avg. Delivery Time", value: "3 wks" },
                    { label: "NPS Score", value: "72" },
                  ].map((m) => (
                    <div key={m.label} className="bg-[var(--surface-soft)] rounded-xl p-4 border border-[var(--border)]">
                      <div className="text-2xl font-bold text-[var(--foreground)] mb-1">{m.value}</div>
                      <div className="text-xs text-[var(--text-soft)]">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-[var(--border)]" />

                <div>
                  <div className="text-xs text-[var(--text-soft)] mb-3 uppercase tracking-widest">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "Figma", "After Effects", "Node.js", "Tailwind"].map((t) => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text-muted)]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-4 py-3 shadow-lg"
            >
              <div className="text-xs text-[var(--text-soft)] mb-0.5">Est.</div>
              <div className="text-lg font-bold text-[var(--foreground)]">2019</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
