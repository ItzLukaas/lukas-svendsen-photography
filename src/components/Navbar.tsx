"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/data/photos";
import { EASE } from "@/lib/motion";

const navLinks = [
  { href: "/", label: "Forside" },
  { href: "/portfolio", label: "Portefølje" },
  { href: "/referencer", label: "Referencer" },
  { href: "/ydelser", label: "Ydelser" },
  { href: "/om-mig", label: "Om mig" },
];

const navCtaClass =
  "inline-flex min-h-11 items-center justify-center rounded-sm border border-foreground/20 px-6 py-2.5 text-[10px] tracking-[0.28em] text-foreground uppercase transition-[color,background-color,transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-px hover:border-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-sm)]";

function MenuToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Luk navigation" : "Åbn navigation"}
      aria-expanded={open}
      className="flex h-11 w-11 items-center justify-center md:hidden"
    >
      <span className="relative block h-3.5 w-7" aria-hidden="true">
        <span
          className={`absolute left-0 block h-[2px] w-7 rounded-full bg-foreground transition-all duration-300 ease-premium ${
            open ? "top-[7px] rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] block h-[2px] rounded-full bg-foreground transition-all duration-300 ease-premium ${
            open ? "w-0 opacity-0" : "w-7"
          }`}
        />
        <span
          className={`absolute left-0 block h-[2px] w-7 rounded-full bg-foreground transition-all duration-300 ease-premium ${
            open ? "top-[7px] -rotate-45" : "top-[14px]"
          }`}
        />
      </span>
    </button>
  );
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative py-1 text-[11px] tracking-[0.22em] uppercase transition-all duration-300 ease-premium hover:-translate-y-px ${
        isActive ? "text-foreground" : "text-muted hover:text-foreground/85"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      {!isActive && (
        <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-foreground/30 transition-all duration-300 ease-premium group-hover:w-full group-hover:opacity-60" />
      )}
      {isActive && (
        <m.span
          layoutId="nav-active"
          className="absolute -bottom-1.5 left-0 h-px w-full bg-foreground/70"
          transition={{ duration: 0.4, ease: EASE }}
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isSolid = scrolled || !isHome;
  const isKontaktActive = pathname === "/kontakt";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-premium ${
          isSolid
            ? "border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] shadow-[var(--shadow-md)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:h-[80px] lg:px-10"
          aria-label="Hovednavigation"
        >
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-display text-[15px] tracking-[0.18em] text-foreground uppercase transition-opacity duration-300 ease-premium hover:opacity-65 lg:text-base lg:tracking-[0.22em]"
          >
            {siteConfig.name}
          </Link>

          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-10 lg:gap-12">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                />
              ))}
            </div>

            <span className="mx-6 h-4 w-px bg-border" aria-hidden="true" />

            <ThemeToggle className="mr-4" />

            <Link
              href="/kontakt"
              className={`${navCtaClass} ${isKontaktActive ? "border-foreground bg-primary text-primary-foreground" : ""}`}
              aria-current={isKontaktActive ? "page" : undefined}
            >
              Kontakt mig
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MenuToggle open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-[var(--overlay)] backdrop-blur-2xl will-change-opacity md:hidden"
          >
            <div className="flex h-[72px] items-center justify-end gap-2 px-6">
              <ThemeToggle />
              <MenuToggle open={mobileOpen} onClick={() => setMobileOpen(false)} />
            </div>

            <nav
              className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-24"
              aria-label="Mobilnavigation"
            >
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <m.div
                    key={link.href}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.06 + i * 0.05,
                      duration: 0.45,
                      ease: EASE,
                    }}
                    className="will-change-transform"
                  >
                    <Link
                      href={link.href}
                      className={`flex min-h-11 items-center font-display text-3xl font-light tracking-[0.12em] uppercase transition-colors duration-300 ease-premium ${
                        isActive ? "text-foreground" : "text-muted hover:text-foreground/75"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </m.div>
                );
              })}

              <m.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.3,
                  duration: 0.45,
                  ease: EASE,
                }}
                className="mt-6"
              >
                <Link
                  href="/kontakt"
                  className={`${navCtaClass} px-10 py-3.5 text-[11px] tracking-[0.3em] ${
                    isKontaktActive ? "border-foreground bg-primary text-primary-foreground" : ""
                  }`}
                  aria-current={isKontaktActive ? "page" : undefined}
                >
                  Kontakt mig
                </Link>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
