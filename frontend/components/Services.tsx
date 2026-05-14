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
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    hoverBorder: "hover:border-violet-200",
  },
  {
    icon: Video,
    title: "Video Production & Editing",
    description:
      "Cinematic storytelling through professional video production, motion graphics, and post-production editing that captivates audiences.",
    tags: ["Cinematography", "Motion Graphics", "Color Grading"],
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    hoverBorder: "hover:border-rose-200",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that grow your brand, increase conversions, and deliver measurable ROI across all digital channels.",
    tags: ["SEO", "Social Media", "PPC", "Analytics"],
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-200",
  },
  {
    icon: Palette,
    title: "Poster & Graphic Design",
    description:
      "Visually striking designs that communicate your brand story. From print collateral to digital assets that leave a lasting impression.",
    tags: ["Branding", "Print", "Digital Assets", "Illustration"],
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    hoverBorder: "hover:border-amber-200",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "Human-centered design that transforms complex problems into intuitive, beautiful interfaces. Research-backed, pixel-perfect execution.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-200",
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
      className={`group relative rounded-2xl bg-white border border-black/[0.06] ${service.hoverBorder} transition-all duration-500 p-7 overflow-hidden cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1`}
    >
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-5">
          <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <service.icon size={22} className={service.iconColor} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#888] leading-relaxed mb-5 group-hover:text-[#666] transition-colors">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[#f8f7f4] text-[#888] border border-black/[0.04] group-hover:border-black/[0.08] transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-2 text-sm text-[#aaa] group-hover:text-[#1a1a1a] transition-colors">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.06] shadow-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs text-[#888] font-medium uppercase tracking-widest">
              What We Do
            </span>
          </motion.div>

          {/* ── ScrollTextReveal heading ── */}
          <div className="flex flex-wrap justify-center gap-x-[0.28em] mb-5">
            <ScrollTextReveal
              text="Our"
              variant="slide"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a1a] tracking-tight"
              as="h2"
              delay={0.1}
            />
            <ScrollTextReveal
              text="Services"
              variant="slide"
              serif
              className="text-4xl sm:text-5xl md:text-6xl tracking-tight"
              as="h2"
              delay={0.2}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#888] text-lg max-w-xl mx-auto"
          >
            End-to-end creative solutions that elevate your brand and drive
            real business results.
          </motion.p>
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