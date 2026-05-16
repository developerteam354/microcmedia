"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const TwitterIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.15H5.059z" />
  </svg>
);

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

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
              {[
                { icon: TwitterIcon, href: "#", colorClass: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 hover:bg-[#1DA1F2]/10" },
                { icon: InstagramIcon, href: "#", colorClass: "hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10" },
                { icon: LinkedinIcon, href: "#", colorClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10" },
                { icon: YoutubeIcon, href: "#", colorClass: "hover:text-[#FF0000] hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  data-cursor-hover
                  whileHover={{ y: -4, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-10 h-10 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] transition-colors duration-300 ${item.colorClass}`}
                >
                  <item.icon className="w-4 h-4" />
                </motion.a>
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
