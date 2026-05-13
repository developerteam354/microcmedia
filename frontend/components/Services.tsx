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

const services = [
  {
    icon: Code2,
    title: "Web & App Development",
    description:
      "We build blazing-fast, scalable web and mobile applications using cutting-edge technologies. From MVPs to enterprise platforms.",
    tags: ["React", "Next.js", "Node.js", "Mobile"],
    gradient: "from-violet-600/20 to-blue-600/10",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/40",
    glowColor: "rgba(124, 58, 237, 0.3)",
  },
  {
    icon: Video,
    title: "Video Production & Editing",
    description:
      "Cinematic storytelling through professional video production, motion graphics, and post-production editing that captivates audiences.",
    tags: ["Cinematography", "Motion Graphics", "Color Grading"],
    gradient: "from-pink-600/20 to-rose-600/10",
    iconColor: "text-pink-400",
    borderHover: "hover:border-pink-500/40",
    glowColor: "rgba(236, 72, 153, 0.3)",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that grow your brand, increase conversions, and deliver measurable ROI across all digital channels.",
    tags: ["SEO", "Social Media", "PPC", "Analytics"],
    gradient: "from-emerald-600/20 to-teal-600/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/40",
    glowColor: "rgba(52, 211, 153, 0.3)",
  },
  {
    icon: Palette,
    title: "Poster & Graphic Design",
    description:
      "Visually striking designs that communicate your brand story. From print collateral to digital assets that leave a lasting impression.",
    tags: ["Branding", "Print", "Digital Assets", "Illustration"],
    gradient: "from-orange-600/20 to-amber-600/10",
    iconColor: "text-orange-400",
    borderHover: "hover:border-orange-500/40",
    glowColor: "rgba(251, 146, 60, 0.3)",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "Human-centered design that transforms complex problems into intuitive, beautiful interfaces. Research-backed, pixel-perfect execution.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    gradient: "from-blue-600/20 to-cyan-600/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/40",
    glowColor: "rgba(59, 130, 246, 0.3)",
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
      className={`group relative rounded-2xl glass border border-white/[0.07] ${service.borderHover} transition-all duration-500 p-7 overflow-hidden cursor-pointer`}
      style={{
        ["--glow" as string]: service.glowColor,
      }}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          boxShadow: `inset 0 0 60px var(--glow)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-5">
          <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <service.icon size={22} className={service.iconColor} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/55 leading-relaxed mb-5 group-hover:text-white/70 transition-colors">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white/[0.06] text-white/50 border border-white/[0.06] group-hover:border-white/10 group-hover:text-white/60 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/80 transition-colors">
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
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-widest">
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            Our{" "}
            <span className="gradient-text">Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
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
