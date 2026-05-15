"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
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
              <motion.a key={item.label} href={item.href} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} data-cursor-hover className="flex items-center gap-4 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-5 hover:border-[var(--border-strong)] transition-all duration-300 group hover:shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-[var(--text-muted)]" />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-soft)] mb-0.5">{item.label}</div>
                  <div className="text-sm text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors">{item.value}</div>
                </div>
                <ArrowRight size={16} className="ml-auto text-[var(--text-soft)] group-hover:text-[var(--foreground)] group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 }} className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-5">
              <div className="text-xs text-[var(--text-soft)] mb-4 uppercase tracking-widest">Follow Us</div>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map((s) => (
                  <a key={s} href="#" data-cursor-hover className="text-xs px-3 py-2 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all">{s}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-3">
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 relative overflow-hidden theme-shadow-card">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6">
                    <Send size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Message Sent!</h3>
                  <p className="text-[var(--text-muted)]">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-[var(--text-soft)] mb-2 uppercase tracking-widest">Name</label>
                      <input type="text" required placeholder="John Doe" className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-soft)] focus:outline-none focus:border-[var(--border-strong)] focus:bg-[var(--surface)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-soft)] mb-2 uppercase tracking-widest">Email</label>
                      <input type="email" required placeholder="john@company.com" className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-soft)] focus:outline-none focus:border-[var(--border-strong)] focus:bg-[var(--surface)] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-soft)] mb-2 uppercase tracking-widest">Service</label>
                    <select className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-strong)] focus:bg-[var(--surface)] transition-all appearance-none">
                      <option value="">Select a service</option>
                      <option value="web">Web & App Development</option>
                      <option value="video">Video Production</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="design">Graphic Design</option>
                      <option value="uiux">UI/UX Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-soft)] mb-2 uppercase tracking-widest">Message</label>
                    <textarea required rows={5} placeholder="Tell us about your project..." className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--text-soft)] focus:outline-none focus:border-[var(--border-strong)] focus:bg-[var(--surface)] transition-all resize-none" />
                  </div>
                  <button type="submit" data-cursor-hover disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--button-bg)] text-[var(--button-fg)] font-medium hover:bg-[var(--button-hover)] transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (<>Send Message <Send size={16} /></>)}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
