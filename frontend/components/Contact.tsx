"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Phone, ArrowRight, ChevronDown } from "lucide-react";
import ScrollTextReveal from "@/components/ScrollTextReveal";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface-soft)]/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-widest">Contact</span>
          </motion.div>

          <ScrollTextReveal
            text="Let's Build Something Amazing"
            variant="color"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-5 tracking-tight"
            as="h2"
          />

          <ScrollTextReveal
            text="Ready to elevate your brand? Let's start a conversation."
            variant="color"
            className="text-[var(--foreground)] text-lg max-w-xl mx-auto"
            as="p"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="lg:col-span-2 space-y-5">
            {[
              { icon: Mail, label: "Email", value: "hello@microcmedia.com", href: "mailto:hello@microcmedia.com" },
              { icon: Phone, label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
              { icon: MapPin, label: "Location", value: "New York, NY — Remote Worldwide", href: "#" },
            ].map((item, i) => (
              <motion.a key={item.label} href={item.href} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} data-cursor-hover className="flex items-center gap-4 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-5 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-violet-500 group-hover:border-violet-500 transition-all duration-300 shadow-sm">
                  <item.icon size={18} className="text-[var(--text-muted)] group-hover:!text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-soft)] mb-0.5 group-hover:text-[var(--foreground)] opacity-70 transition-colors">{item.label}</div>
                  <div className="text-sm text-[var(--text-muted)] group-hover:text-[var(--foreground)] font-medium transition-colors">{item.value}</div>
                </div>
                <ArrowRight size={16} className="ml-auto text-[var(--text-soft)] group-hover:!text-violet-500 group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 }} className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6">
              <div className="text-xs text-[var(--text-soft)] mb-4 uppercase tracking-widest font-medium">Follow Us</div>
              <div className="flex flex-wrap gap-3">
                {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map((s) => (
                  <motion.a 
                    key={s} 
                    href="#" 
                    data-cursor-hover 
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="text-xs px-4 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:border-violet-500 hover:shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-all duration-300 font-medium"
                  >
                    {s}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-3 relative group perspective-[1200px]">
            
            {/* Animated Background Aura for Form Card (Vastly increased visibility for light mode) */}
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 dark:opacity-5 dark:group-hover:opacity-15 transition duration-1000 group-hover:duration-500 pointer-events-none" />

            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 relative overflow-hidden theme-shadow-card backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              
              {/* Subtle inner floating glows (Greatly increased visibility for light mode) */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-violet-500/50 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-500/50 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Subtle animated border sweep effect */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none p-[1px]"
                style={{
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 dark:via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full py-16 text-center relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6"
                  >
                    <Send size={28} className="text-emerald-600 dark:text-emerald-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Message Sent!</h3>
                  <p className="text-[var(--text-muted)]">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6 relative z-10"
                  initial={isInView ? "visible" : "hidden"}
                  animate={isInView ? "visible" : "hidden"}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
                      <label className="block text-xs text-[var(--text-soft)] mb-2 uppercase tracking-widest font-medium">Name</label>
                      <input type="text" required placeholder="John Doe" className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--text-soft)] focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/30 dark:focus:ring-violet-500/10 focus:bg-[var(--surface)] transition-all duration-300 shadow-sm" />
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
                      <label className="block text-xs text-[var(--text-soft)] mb-2 uppercase tracking-widest font-medium">Email</label>
                      <input type="email" required placeholder="john@company.com" className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--text-soft)] focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/30 dark:focus:ring-violet-500/10 focus:bg-[var(--surface)] transition-all duration-300 shadow-sm" />
                    </motion.div>
                  </div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
                    <label className="block text-xs text-[var(--text-soft)] mb-2 uppercase tracking-widest font-medium">Service</label>
                    <div className="relative">
                      <select className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm text-[var(--text-muted)] focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/30 dark:focus:ring-violet-500/10 focus:bg-[var(--surface)] transition-all duration-300 appearance-none shadow-sm">
                        <option value="">Select a service</option>
                        <option value="web">Web & App Development</option>
                        <option value="video">Video Production</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="design">Graphic Design</option>
                        <option value="uiux">UI/UX Design</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <ChevronDown size={16} className="text-[var(--text-muted)]" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
                    <label className="block text-xs text-[var(--text-soft)] mb-2 uppercase tracking-widest font-medium">Message</label>
                    <textarea required rows={5} placeholder="Tell us about your project..." className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--text-soft)] focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/30 dark:focus:ring-violet-500/10 focus:bg-[var(--surface)] transition-all duration-300 resize-none shadow-sm" />
                  </motion.div>
                  <motion.button 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
                    transition={{ duration: 0.5 }}
                    type="submit" 
                    data-cursor-hover 
                    disabled={loading} 
                    className="relative overflow-hidden w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--button-bg)] text-[var(--button-fg)] font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.6)] dark:hover:shadow-[0_8px_25px_rgba(139,92,246,0.25)] hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {/* Animated shine sweep on button hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent skew-x-12" />
                    
                    {loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-[var(--button-fg)]/30 border-t-[var(--button-fg)] rounded-full relative z-10" />
                    ) : (
                      <span className="relative z-10 flex items-center gap-2">
                        Send Message 
                        <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
