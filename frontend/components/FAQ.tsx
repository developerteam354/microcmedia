"use client";
import { useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import ScrollTextReveal from "@/components/ScrollTextReveal";

const faqs = [
  { question: "What types of projects do you specialize in?", answer: "We specialize in web and mobile app development, video production, digital marketing campaigns, graphic design, and UI/UX design. We work with startups, SMEs, and enterprise clients across various industries." },
  { question: "How long does a typical project take?", answer: "Project timelines vary based on scope and complexity. A simple website typically takes 2–4 weeks, while a full-scale web application can take 2–4 months. We provide detailed timelines during our initial consultation." },
  { question: "What is your pricing model?", answer: "We offer flexible pricing models including fixed-price projects, monthly retainers, and hourly engagements. Contact us for a custom quote tailored to your specific needs." },
  { question: "Do you offer ongoing support after project completion?", answer: "Yes, we offer comprehensive post-launch support and maintenance packages. We believe in building long-term partnerships with our clients." },
  { question: "How do you handle revisions and feedback?", answer: "Our process includes structured feedback rounds at key milestones. Most projects include 2–3 revision rounds, with additional revisions available as needed." },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <Accordion.Item 
      value={`item-${index}`} 
      className="relative group perspective-[1200px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      ref={itemRef}
    >
      {/* Background Glow Aura */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500 rounded-2xl blur-xl transition-all duration-700 pointer-events-none ${isHovered ? "opacity-30 dark:opacity-15 scale-105" : "opacity-0 scale-95"}`} />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden data-[state=open]:border-violet-500/50 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10"
      >
        <Accordion.Header>
          <Accordion.Trigger 
            data-cursor-hover 
            className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left group/trigger outline-none"
          >
            <span className="text-sm md:text-base font-medium text-[var(--text-muted)] group-hover/trigger:text-[var(--foreground)] group-data-[state=open]:text-[var(--foreground)] transition-colors duration-300 pr-4">
              {faq.question}
            </span>
            <div className="w-8 h-8 rounded-full bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover/trigger:bg-violet-600 group-hover/trigger:border-violet-600 group-hover/trigger:text-white transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-violet-600 group-data-[state=open]:border-violet-600 group-data-[state=open]:text-white shadow-sm">
              <Plus size={18} className="transition-transform duration-300" />
            </div>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=open]:animate-[slideDown_0.4s_cubic-bezier(0.87,_0,_0.13,_1)] data-[state=closed]:animate-[slideUp_0.4s_cubic-bezier(0.87,_0,_0.13,_1)]">
          <div className="px-7 pb-6 text-sm md:text-base text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)]/50 pt-5 bg-gradient-to-b from-transparent to-[var(--surface-soft)]/20">
            {faq.answer}
          </div>
        </Accordion.Content>
      </motion.div>
    </Accordion.Item>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-32 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 dark:bg-violet-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.6 }} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-widest">FAQ</span>
          </motion.div>

          <ScrollTextReveal
            text="Common Questions"
            variant="color"
            className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-4"
            as="h2"
          />
          <p className="text-[var(--text-muted)] max-w-lg mx-auto text-sm md:text-base">
            Everything you need to know about our process, pricing, and how we work together.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-5">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}

