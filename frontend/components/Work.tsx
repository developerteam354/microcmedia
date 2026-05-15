"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import StickyImageStack from "@/components/StickyImageStack";
import ScrollTextReveal from "@/components/ScrollTextReveal";

const projects = [
  {
    src: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&q=90",
    alt: "Lumière E-Commerce",
    label: "01",
    tag: "Web Development",
    year: "2024",
    description:
      "Full-stack storefront with headless CMS, edge-cached product pages, and a 94/100 Lighthouse score.",
  },
  {
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=90",
    alt: "Forma Brand Film",
    label: "02",
    tag: "Video Production",
    year: "2024",
    description:
      "60-second hero film for a luxury furniture launch — concept, shoot, colour grade, and sound design.",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90",
    alt: "Vela SaaS Dashboard",
    label: "03",
    tag: "UI / UX Design",
    year: "2023",
    description:
      "End-to-end product design for a B2B analytics platform serving 12,000+ monthly active users.",
  },
  {
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=90",
    alt: "Apex Growth Campaign",
    label: "04",
    tag: "Digital Marketing",
    year: "2023",
    description:
      "Cross-channel paid strategy that grew MRR by 340% in six months with a 3.8× blended ROAS.",
  },
];

export default function Work() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="work" className="relative">
      {/* ── Section header — normal flow, full padding ── */}
      <div className="py-20 px-6 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div ref={titleRef} className="text-center mb-12 md:mb-20">
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-[0.14em]">
                Selected work
              </span>
            </motion.div>

            {/* Heading */}
            <div className="flex flex-wrap justify-center items-baseline gap-x-[0.3em] mb-6">
              <ScrollTextReveal
                text="Things we've"
                variant="color"
                className="text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-[var(--foreground)] tracking-tight leading-[1.1]"
                as="h2"
              />
              <ScrollTextReveal
                text="built"
                variant="color"
                serif
                className="text-4xl sm:text-5xl md:text-[3.75rem] tracking-tight leading-[1.1]"
                as="h2"
              />
            </div>

            <ScrollTextReveal
              text="A curated selection of projects spanning product design, development, and brand storytelling."
              variant="color"
              className="text-[var(--foreground)] text-lg max-w-lg mx-auto leading-relaxed"
              as="p"
            />
          </div>
        </div>
      </div>

      {/*
             * ── Sticky stack ──────────────────────────────────────────────
             * The StickyImageStack handles its own height and sticky
             * behaviour internally. We let it be full-width here and
             * constrain the cards with inset padding inside the component.
             */}
      <StickyImageStack images={projects} slotHeight={100} />

      {/* ── CTA — normal flow, sits below the sticky section ── */}
      <div className="py-14 px-6 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#contact"
              data-cursor-hover
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--button-bg)] text-[var(--button-fg)] text-sm font-medium hover:bg-[var(--button-hover)] transition-colors duration-300 shadow-lg shadow-black/10"
            >
              Start a project
              <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <ArrowUpRight size={11} className="text-[var(--button-fg)]" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
