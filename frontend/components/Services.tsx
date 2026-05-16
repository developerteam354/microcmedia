"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  Video,
  TrendingUp,
  Palette,
  Layers,
  ArrowUpRight,
  X,
  CheckCircle2,
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
  onClick,
}: {
  service: (typeof services)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  // Spotlight effect
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${service.title}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onClick={onClick}
      data-cursor-hover
      className={`group relative rounded-3xl bg-[var(--surface)] border border-[var(--border)] ${service.hoverBorder} transition-all duration-500 p-8 overflow-hidden cursor-pointer hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1`}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
        }}
      />

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
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedService]);

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
            <ServiceCard key={service.title} service={service} index={i} onClick={() => setSelectedService(service)} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-4xl mx-auto">
          {services.slice(3).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i + 3} onClick={() => setSelectedService(service)} />
          ))}
        </div>
      </div>

      {/* Modern Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] cursor-pointer"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedService.title}`}
                className="w-full max-w-2xl bg-[var(--surface)] rounded-[2.5rem] border border-[var(--border)] overflow-hidden shadow-2xl pointer-events-auto relative"
              >
                {/* Premium Background for Modal */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/5 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
                
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-[var(--surface-soft)] text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors z-20"
                >
                  <X size={20} />
                </button>

                <div className="p-10 md:p-14 relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-6 mb-8"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${selectedService.iconBg} flex items-center justify-center shadow-lg shadow-violet-500/10`}>
                      <selectedService.icon size={32} className={selectedService.iconColor} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[var(--foreground)] tracking-tight">
                        {selectedService.title}
                      </h3>
                      <p className="text-violet-500 font-medium">Professional Service</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-10">
                      {selectedService.description} We bring years of expertise and a passion for excellence to every project, ensuring your vision is translated into a powerful digital reality.
                    </p>

                    <div className="space-y-4 mb-10">
                      <div className="text-sm font-semibold uppercase tracking-widest text-[var(--text-soft)]">Key Features</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["Premium Quality", "On-time Delivery", "Scalable Solutions", "Dedicated Support"].map((feature) => (
                          <div key={feature} className="flex items-center gap-3 text-[var(--foreground)]">
                            <CheckCircle2 size={18} className="text-violet-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-12">
                      {selectedService.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm px-4 py-1.5 rounded-full bg-[var(--surface-soft)] text-[var(--text-muted)] border border-[var(--border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button 
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-violet-600 text-white font-semibold hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Start Project
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
