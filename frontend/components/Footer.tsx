"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Services: [
    "Web Development",
    "Video Production",
    "Digital Marketing",
    "Graphic Design",
    "UI/UX Design",
  ],
  Company: ["About", "Work", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden border-t border-white/[0.05]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg animated-border p-[1.5px]">
                <div className="w-full h-full rounded-[6px] bg-[#050508] flex items-center justify-center">
                  <span className="text-xs font-bold gradient-text">MC</span>
                </div>
              </div>
              <span className="font-semibold text-white tracking-tight">
                Micro C Media
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              A premium creative agency crafting digital experiences that
              inspire, engage, and convert.
            </p>
            <div className="flex gap-3">
              {["TW", "IG", "LI", "DR"].map((s) => (
                <a
                  key={s}
                  href="#"
                  data-cursor-hover
                  className="w-9 h-9 rounded-lg glass border border-white/[0.07] flex items-center justify-center text-xs text-white/40 hover:text-white hover:border-violet-500/30 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/35 hover:text-white/70 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Micro C Media. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Crafted with{" "}
            <span className="text-violet-400">♥</span> by Micro C Media
          </p>
        </div>
      </div>
    </footer>
  );
}
