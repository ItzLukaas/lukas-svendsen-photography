"use client";

import { m } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { EASE } from "@/lib/motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Skift til mørk tilstand" : "Skift til lys tilstand"}
      className={`theme-toggle group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/50 text-muted transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-premium hover:-translate-y-px hover:border-foreground/20 hover:text-foreground hover:shadow-[var(--shadow-sm)] md:h-10 md:w-10 ${className}`}
    >
      <m.span
        key={theme}
        initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="flex items-center justify-center"
        aria-hidden="true"
      >
        {isLight ? (
          <Moon size={15} strokeWidth={1.5} />
        ) : (
          <Sun size={15} strokeWidth={1.5} />
        )}
      </m.span>
    </button>
  );
}
