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
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-widest">
              Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Amazing</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Ready to elevate your brand? Let&apos;s start a conversation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-5"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "hello@microcmedia.com",
                href: "mailto:hello@microcmedia.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+1 (555) 000-0000",
                href: "tel:+15550000000",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "New York, NY — Remote Worldwide",
                href: "#",
              },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                data-cursor-hover
                className="flex items-center gap-4 glass rounded-2xl border border-white/[0.07] p-5 hover:border-violet-500/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-0.5">{item.label}</div>
                  <div className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {item.value}
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto text-white/20 group-hover:text-violet-400 group-hover:translate-x-1 transition-all"
                />
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="glass rounded-2xl border border-white/[0.07] p-5"
            >
              <div className="text-xs text-white/40 mb-4 uppercase tracking-widest">
                Follow Us
              </div>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      data-cursor-hover
                      className="text-xs px-3 py-2 rounded-lg glass border border-white/[0.07] text-white/50 hover:text-white hover:border-violet-500/30 transition-all"
                    >
                      {social}
                    </a>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="glass-strong rounded-3xl border border-white/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-transparent pointer-events-none" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-6">
                    <Send size={24} className="text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-white/50">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-white/40 mb-2 uppercase tracking-widest">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 uppercase tracking-widest">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-widest">
                      Service
                    </label>
                    <select
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all appearance-none"
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" className="bg-[#0a0a0f]">
                        Select a service
                      </option>
                      <option value="web" className="bg-[#0a0a0f]">
                        Web & App Development
                      </option>
                      <option value="video" className="bg-[#0a0a0f]">
                        Video Production
                      </option>
                      <option value="marketing" className="bg-[#0a0a0f]">
                        Digital Marketing
                      </option>
                      <option value="design" className="bg-[#0a0a0f]">
                        Graphic Design
                      </option>
                      <option value="uiux" className="bg-[#0a0a0f]">
                        UI/UX Design
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-widest">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor-hover
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
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
