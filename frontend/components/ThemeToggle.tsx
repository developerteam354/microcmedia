"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const getTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
};

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("microc-theme-change", onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener("microc-theme-change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("microc-theme", nextTheme);
    window.dispatchEvent(new Event("microc-theme-change"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      data-cursor-hover
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "white" : "black"} theme`}
      aria-pressed={isDark}
      className="relative flex h-9 w-16 items-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] p-1 transition-colors"
    >
      <span
        className={`absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--button-bg)] text-[var(--button-fg)] shadow-sm transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
      <span className="sr-only">{isDark ? "Black theme" : "White theme"}</span>
    </button>
  );
}
