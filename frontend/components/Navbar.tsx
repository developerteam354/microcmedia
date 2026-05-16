"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{ willChange: "transform" }}
      >
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div
            className={`
              flex items-center justify-between rounded-full transition-all duration-500 py-3 px-4 md:px-5
              ${
                scrolled
                  ? "bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] backdrop-blur-xl border border-[var(--border)] shadow-sm"
                  : "bg-transparent border border-transparent"
              }
            `}
          >
            {/* ── Logo ── */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-[52px] h-[52px] flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Micro C Media Logo"
                  width={52}
                  height={52}
                  quality={100}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-[var(--foreground)] tracking-tight text-base sm:text-lg">
                Micro C <span className="text-[var(--text-muted)]">Media</span>
              </span>
            </a>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-1 bg-[var(--surface-soft)] rounded-full px-1.5 py-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`relative text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                    activeLink === link.label
                      ? "bg-[var(--surface)] text-[var(--foreground)] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                      : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ── CTA ── */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <a
                href="#contact"
                data-cursor-hover
                className="group flex items-center gap-3 px-5 py-2.5 text-sm font-medium rounded-full bg-[var(--button-bg)] text-[var(--button-fg)] hover:bg-[var(--button-hover)] transition-all duration-300 shadow-sm"
              >
                Let&apos;s Collaborate
                <span className="w-5 h-5 rounded-full bg-[var(--button-fg)] text-[var(--button-bg)] flex items-center justify-center">
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>

            {/* ── Mobile toggle ── */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--button-bg)] text-[var(--button-fg)] transition-colors"
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
                      <X size={16} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] bg-[color-mix(in_srgb,var(--background)_95%,transparent)] backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-bold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors tracking-tight"
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
              className="mt-4 px-10 py-3.5 rounded-full bg-[var(--button-bg)] text-[var(--button-fg)] font-semibold hover:bg-[var(--button-hover)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
