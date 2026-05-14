"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.06] shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs text-[#888] font-medium uppercase tracking-widest">Contact</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-5 tracking-tight">
            Let&apos;s Build Something{" "}<span className="font-serif italic text-[#888]">Amazing</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="text-[#888] text-lg max-w-xl mx-auto">
            Ready to elevate your brand? Let&apos;s start a conversation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="lg:col-span-2 space-y-5">
            {[
              { icon: Mail, label: "Email", value: "hello@microcmedia.com", href: "mailto:hello@microcmedia.com" },
              { icon: Phone, label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
              { icon: MapPin, label: "Location", value: "New York, NY — Remote Worldwide", href: "#" },
            ].map((item, i) => (
              <motion.a key={item.label} href={item.href} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} data-cursor-hover className="flex items-center gap-4 bg-white rounded-2xl border border-black/[0.06] p-5 hover:border-black/[0.12] transition-all duration-300 group hover:shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#f8f7f4] border border-black/[0.04] flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-[#666]" />
                </div>
                <div>
                  <div className="text-xs text-[#aaa] mb-0.5">{item.label}</div>
                  <div className="text-sm text-[#444] group-hover:text-[#1a1a1a] transition-colors">{item.value}</div>
                </div>
                <ArrowRight size={16} className="ml-auto text-[#ccc] group-hover:text-[#1a1a1a] group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 }} className="bg-white rounded-2xl border border-black/[0.06] p-5">
              <div className="text-xs text-[#aaa] mb-4 uppercase tracking-widest">Follow Us</div>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map((s) => (
                  <a key={s} href="#" data-cursor-hover className="text-xs px-3 py-2 rounded-lg bg-[#f8f7f4] border border-black/[0.04] text-[#888] hover:text-[#1a1a1a] hover:border-black/[0.12] transition-all">{s}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-black/[0.06] p-8 relative overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6">
                    <Send size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Message Sent!</h3>
                  <p className="text-[#888]">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-[#aaa] mb-2 uppercase tracking-widest">Name</label>
                      <input type="text" required placeholder="John Doe" className="w-full bg-[#f8f7f4] border border-black/[0.06] rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#bbb] focus:outline-none focus:border-[#1a1a1a]/30 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#aaa] mb-2 uppercase tracking-widest">Email</label>
                      <input type="email" required placeholder="john@company.com" className="w-full bg-[#f8f7f4] border border-black/[0.06] rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#bbb] focus:outline-none focus:border-[#1a1a1a]/30 focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#aaa] mb-2 uppercase tracking-widest">Service</label>
                    <select className="w-full bg-[#f8f7f4] border border-black/[0.06] rounded-xl px-4 py-3 text-sm text-[#666] focus:outline-none focus:border-[#1a1a1a]/30 focus:bg-white transition-all appearance-none">
                      <option value="">Select a service</option>
                      <option value="web">Web & App Development</option>
                      <option value="video">Video Production</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="design">Graphic Design</option>
                      <option value="uiux">UI/UX Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#aaa] mb-2 uppercase tracking-widest">Message</label>
                    <textarea required rows={5} placeholder="Tell us about your project..." className="w-full bg-[#f8f7f4] border border-black/[0.06] rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#bbb] focus:outline-none focus:border-[#1a1a1a]/30 focus:bg-white transition-all resize-none" />
                  </div>
                  <button type="submit" data-cursor-hover disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1a1a1a] text-white font-medium hover:bg-[#333] transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
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
