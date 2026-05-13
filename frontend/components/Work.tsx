"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A modern, high-performance e-commerce platform with real-time inventory and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    color: "violet",
  },
  {
    title: "Brand Campaign Video",
    category: "Video Production",
    description:
      "Cinematic brand story that increased engagement by 340% across social platforms.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    tags: ["Cinematography", "Motion Graphics"],
    color: "pink",
  },
  {
    title: "SaaS Dashboard",
    category: "UI/UX Design",
    description:
      "Intuitive analytics dashboard with real-time data visualization and custom reporting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Figma", "React", "D3.js"],
    color: "blue",
  },
  {
    title: "Social Media Growth",
    category: "Digital Marketing",
    description:
      "Comprehensive social strategy that grew follower base by 500% in 6 months.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    tags: ["Instagram", "TikTok", "Content Strategy"],
    color: "emerald",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorMap: Record<string, string> = {
    violet: "group-hover:border-violet-500/40",
    pink: "group-hover:border-pink-500/40",
    blue: "group-hover:border-blue-500/40",
    emerald: "group-hover:border-emerald-500/40",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-cursor-hover
      className={`group relative rounded-2xl glass border border-white/[0.07] ${colorMap[project.color]} transition-all duration-500 overflow-hidden cursor-pointer`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center"
          >
            <ExternalLink size={20} className="text-white" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">
          {project.category}
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed mb-4 group-hover:text-white/60 transition-colors">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white/[0.05] text-white/40 border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="py-28 px-6 relative overflow-hidden"
    >
      {/* Parallax background element */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-widest">
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            Featured{" "}
            <span className="gradient-text">Work</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            A selection of projects that showcase our expertise and creative
            approach.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            data-cursor-hover
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all duration-300 text-sm font-medium"
          >
            View All Projects
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
