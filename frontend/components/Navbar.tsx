"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  // Whether the user has scrolled past the threshold
  const [scrolled, setScrolled] = useState(false);
  // Smart hide/show: true = visible, false = hidden
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        // Mark as scrolled once past 50px
        setScrolled(currentY > 50);

        // Smart hide: hide when scrolling down fast (delta > 6),
        // show when scrolling up or near the top
        if (currentY < 80) {
          setVisible(true);
        } else if (delta > 6) {
          // Scrolling down — hide
          setVisible(false);
          // Close mobile menu if open
          setMenuOpen(false);
        } else if (delta < -4) {
          // Scrolling up — show
          setVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        // Entry animation on mount
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.3 },
        }}
        // Always on top — z-[100] beats hero orbs, modals, etc.
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{ willChange: "transform" }}
      >
        {/* Inner pill that changes style on scroll */}
        <div
          className={`
            mx-3 mt-3 rounded-2xl transition-all duration-500
            ${
              scrolled
                ? // Scrolled: solid dark glass with visible border + tighter padding
                  "bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-3 px-5"
                : // Top of page: very subtle, almost invisible
                  "bg-black/20 backdrop-blur-sm border border-white/[0.04] py-4 px-5"
            }
          `}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* ── Logo ── */}
            <a href="#" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-lg animated-border p-[1.5px]">
                <div className="w-full h-full rounded-[6px] bg-[#050508] flex items-center justify-center">
                  <span className="text-xs font-bold gradient-text">MC</span>
                </div>
              </div>
              <span className="font-semibold text-white tracking-tight text-sm">
                Micro C Media
              </span>
            </a>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
            </nav>

            {/* ── CTA ── */}
            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                data-cursor-hover
                className="relative px-5 py-2 text-sm font-medium rounded-full overflow-hidden group"
              >
                {/* Animated gradient border */}
                <span className="absolute inset-0 animated-border rounded-full p-[1.5px]">
                  <span className="absolute inset-[1.5px] rounded-full bg-[#050508] group-hover:bg-violet-950/60 transition-colors duration-300" />
                </span>
                <span className="relative gradient-text">Get in Touch</span>
              </a>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg glass border border-white/10 text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] bg-black/80 flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {/* Decorative orb */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-700/20 rounded-full blur-[100px] pointer-events-none" />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-bold text-white/80 hover:text-white transition-colors tracking-tight"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: navLinks.length * 0.07 + 0.05, duration: 0.35 }}
              className="mt-4 px-10 py-3.5 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-500 transition-colors shadow-[0_0_30px_rgba(124,58,237,0.5)]"
              onClick={() => setMenuOpen(false)}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
