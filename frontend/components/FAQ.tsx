"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What types of projects do you specialize in?",
    answer:
      "We specialize in a wide range of digital projects including web and mobile app development, video production, digital marketing campaigns, graphic design, and UI/UX design. We work with startups, SMEs, and enterprise clients across various industries.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A simple website typically takes 2–4 weeks, while a full-scale web application or comprehensive brand campaign can take 2–4 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing models including fixed-price projects, monthly retainers, and hourly engagements. Pricing depends on project scope, complexity, and timeline. Contact us for a custom quote tailored to your specific needs.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes, we offer comprehensive post-launch support and maintenance packages. We believe in building long-term partnerships with our clients and provide ongoing support, updates, and optimization services.",
  },
  {
    question: "How do you handle revisions and feedback?",
    answer:
      "Our process includes structured feedback rounds at key milestones. We use collaborative tools to gather and implement feedback efficiently. Most projects include 2–3 revision rounds, with additional revisions available as needed.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-widest">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
          >
            Common{" "}
            <span className="gradient-text">Questions</span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="glass rounded-2xl border border-white/[0.07] overflow-hidden data-[state=open]:border-violet-500/30 transition-all duration-300"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    data-cursor-hover
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  >
                    <span className="text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                      {faq.question}
                    </span>
                    <Plus
                      size={18}
                      className="text-white/40 shrink-0 group-data-[state=open]:rotate-45 transition-transform duration-300 group-hover:text-violet-400"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-[slideDown_0.3s_ease] data-[state=closed]:animate-[slideUp_0.3s_ease]">
                  <div className="px-6 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/[0.05] pt-4">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
