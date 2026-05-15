"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Video,
  TrendingUp,
  Palette,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import ScrollTextReveal from "@/components/ScrollTextReveal";

const services = [
  {
    icon: Code2,
    title: "Web & App Development",
    description:
      "We build blazing-fast, scalable web and mobile applications using cutting-edge technologies. From MVPs to enterprise platforms.",
    tags: ["React", "Next.js", "Node.js", "Mobile"],
    iconBg: "bg-[var(--surface-soft)]",
    iconColor: "text-[var(--foreground)]",
    hoverBorder: "hover:border-[var(--border-strong)]",
  },
  {
    icon: Video,
    title: "Video Production & Editing",
    description:
      "Cinematic storytelling through professional video production, motion graphics, and post-production editing that captivates audiences.",
    tags: ["Cinematography", "Motion Graphics", "Color Grading"],
    iconBg: "bg-[var(--surface-soft)]",
    iconColor: "text-[var(--foreground)]",
    hoverBorder: "hover:border-[var(--border-strong)]",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that grow your brand, increase conversions, and deliver measurable ROI across all digital channels.",
    tags: ["SEO", "Social Media", "PPC", "Analytics"],
    iconBg: "bg-[var(--surface-soft)]",
    iconColor: "text-[var(--foreground)]",
    hoverBorder: "hover:border-[var(--border-strong)]",
  },
  {
    icon: Palette,
    title: "Poster & Graphic Design",
    description:
      "Visually striking designs that communicate your brand story. From print collateral to digital assets that leave a lasting impression.",
    tags: ["Branding", "Print", "Digital Assets", "Illustration"],
    iconBg: "bg-[var(--surface-soft)]",
    iconColor: "text-[var(--foreground)]",
    hoverBorder: "hover:border-[var(--border-strong)]",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "Human-centered design that transforms complex problems into intuitive, beautiful interfaces. Research-backed, pixel-perfect execution.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    iconBg: "bg-[var(--surface-soft)]",
    iconColor: "text-[var(--foreground)]",
    hoverBorder: "hover:border-[var(--border-strong)]",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-cursor-hover
      className={`group relative rounded-2xl bg-[var(--surface)] border border-[var(--border)] ${service.hoverBorder} transition-all duration-500 p-7 overflow-hidden cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1`}
    >
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-5">
          <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <service.icon size={22} className={service.iconColor} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 group-hover:text-[var(--foreground)] transition-colors">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[var(--surface-soft)] text-[var(--text-muted)] border border-[var(--border)] group-hover:border-[var(--border-strong)] transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-soft)] group-hover:text-[var(--foreground)] transition-colors">
          <span>Learn more</span>
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-widest">
              What We Do
            </span>
          </motion.div>

          {/* ── Headings ── */}
          <div className="flex flex-wrap justify-center gap-x-[0.28em] mb-5">
            <ScrollTextReveal
              text="Our"
              variant="color"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] tracking-tight"
              as="h2"
            />
            <ScrollTextReveal
              text="Services"
              variant="color"
              serif
              className="text-4xl sm:text-5xl md:text-6xl tracking-tight"
              as="h2"
            />
          </div>

          <ScrollTextReveal
            text="End-to-end creative solutions that elevate your brand and drive meaningful results."
            variant="color"
            className="text-[var(--foreground)] text-lg max-w-xl mx-auto"
            as="p"
          />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-4xl mx-auto">
          {services.slice(3).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
