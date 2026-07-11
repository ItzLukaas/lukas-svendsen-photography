"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
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
  "inline-flex min-h-11 items-center justify-center border border-white/25 px-6 py-2.5 text-[10px] tracking-[0.28em] text-white uppercase transition-[color,background-color,transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-px hover:border-white hover:bg-white hover:text-[#0a0a0a] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]";

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
          className={`absolute left-0 block h-[2px] w-7 rounded-full bg-white transition-all duration-500 ease-premium ${
            open ? "top-[7px] rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] block h-[2px] rounded-full bg-white transition-all duration-500 ease-premium ${
            open ? "w-0 opacity-0" : "w-7"
          }`}
        />
        <span
          className={`absolute left-0 block h-[2px] w-7 rounded-full bg-white transition-all duration-500 ease-premium ${
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
      className={`group relative py-1 text-[11px] tracking-[0.22em] uppercase transition-all duration-500 ease-premium hover:-translate-y-px ${
        isActive ? "text-white" : "text-white/45 hover:text-white/85"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      {!isActive && (
        <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-white/40 transition-all duration-500 ease-premium group-hover:w-full group-hover:opacity-60" />
      )}
      {isActive && (
        <m.span
          layoutId="nav-active"
          className="absolute -bottom-1.5 left-0 h-px w-full bg-white/80"
          transition={{ duration: 0.5, ease: EASE }}
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
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-700 ease-premium ${
          isSolid
            ? "border-b border-white/[0.08] bg-[#0a0a0a]/82 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_12px_48px_rgba(0,0,0,0.38)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:h-[80px] lg:px-10"
          aria-label="Hovednavigation"
        >
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-display text-[15px] tracking-[0.18em] text-white uppercase transition-opacity duration-500 ease-premium hover:opacity-65 lg:text-base lg:tracking-[0.22em]"
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

            <span className="mx-8 h-4 w-px bg-white/10" aria-hidden="true" />

            <Link
              href="/kontakt"
              className={`${navCtaClass} ${isKontaktActive ? "border-white bg-white text-[#0a0a0a]" : ""}`}
              aria-current={isKontaktActive ? "page" : undefined}
            >
              Kontakt mig
            </Link>
          </div>

          <MenuToggle open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-[#0a0a0a]/97 backdrop-blur-2xl will-change-opacity md:hidden"
          >
            <div className="flex h-[72px] items-center justify-end px-6">
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
                      duration: 0.55,
                      ease: EASE,
                    }}
                    className="will-change-transform"
                  >
                    <Link
                      href={link.href}
                      className={`flex min-h-11 items-center font-display text-3xl font-light tracking-[0.12em] uppercase transition-colors duration-500 ease-premium ${
                        isActive ? "text-white" : "text-white/35 hover:text-white/75"
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
                  duration: 0.55,
                  ease: EASE,
                }}
                className="mt-6"
              >
                <Link
                  href="/kontakt"
                  className={`${navCtaClass} px-10 py-3.5 text-[11px] tracking-[0.3em] ${
                    isKontaktActive ? "border-white bg-white text-[#0a0a0a]" : ""
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
