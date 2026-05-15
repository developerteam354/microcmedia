"use client";
import Image from "next/image";

const footerLinks = {
  Services: ["Web Development", "Video Production", "Digital Marketing", "Graphic Design", "UI/UX Design"],
  Company: ["About", "Work", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden border-t border-[var(--border)]">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-soft)]/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Micro C Media Logo"
                  width={48}
                  height={48}
                  quality={100}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-[var(--foreground)] tracking-tight text-lg">
                Micro C <span className="text-[var(--text-muted)]">Media</span>
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs mb-6">
              A premium creative agency crafting digital experiences that
              inspire, engage, and convert.
            </p>
            <div className="flex gap-3">
              {["TW", "IG", "LI", "DR"].map((s) => (
                <a
                  key={s}
                  href="#"
                  data-cursor-hover
                  className="w-9 h-9 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-soft)]">
            © {new Date().getFullYear()} Micro C Media. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-soft)]">
            Crafted with{" "}
            <span className="text-rose-400">♥</span> by Micro C Media
          </p>
        </div>
      </div>
    </footer>
  );
}
