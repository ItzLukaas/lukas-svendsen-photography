"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = siteConfig.nav.filter((item) => item.href !== "/booking");

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.getElementById("site-scroll");
    const onScroll = () => {
      const y = root?.scrollTop ?? window.scrollY;
      setScrolled(y > 48);
    };
    onScroll();
    root?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const root = document.getElementById("site-scroll");
    if (root) {
      root.style.overflowY = open ? "hidden" : "scroll";
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      if (root) root.style.overflowY = "scroll";
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled && !open;
  const solid = scrolled || open || !isHome;
  const bookingActive =
    pathname === "/booking" || pathname.startsWith("/booking/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500 ease-out",
        solid
          ? "border-b border-foreground/10 bg-paper text-foreground"
          : "border-b border-transparent bg-transparent text-white"
      )}
    >
      {overHero ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-transparent"
          aria-hidden
        />
      ) : null}

      <div className="relative mx-auto flex h-[4.25rem] max-w-[1600px] items-center justify-between px-5 md:h-[5rem] md:px-8 lg:px-12">
        <Link
          href="/"
          className="font-display shrink-0 text-[1.15rem] leading-none tracking-[-0.025em] transition-opacity duration-[400ms] hover:opacity-70 md:text-[1.35rem]"
          aria-label={`${siteConfig.name} — forsiden`}
        >
          {siteConfig.name}
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex lg:gap-10"
          aria-label="Primær navigation"
        >
          {navLinks.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[0.8125rem] tracking-[0.03em] transition-opacity duration-[400ms]",
                  active
                    ? "font-semibold opacity-100"
                    : "font-medium opacity-50 hover:opacity-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/booking"
            className={cn(
              "btn-nav-cta ml-1",
              overHero
                ? "bg-paper text-ink"
                : "bg-ink text-paper"
            )}
            aria-current={bookingActive ? "page" : undefined}
          >
            Booking
          </Link>
        </nav>

        <button
          type="button"
          className={cn(
            "relative z-50 -mr-1 flex h-11 w-11 items-center justify-center md:hidden",
            overHero ? "text-white" : "text-foreground"
          )}
          aria-expanded={open}
          aria-controls="mobil-menu"
          aria-label={open ? "Luk menu" : "Åbn menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Luk" : "Menu"}</span>
          <span className="relative flex h-3 w-[18px] flex-col justify-between">
            <span
              className={cn(
                "block h-[1.5px] w-full bg-current transition-transform duration-300 ease-out",
                open && "translate-y-[5.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-full bg-current transition-transform duration-300 ease-out",
                open && "-translate-y-[5.5px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobil-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-40 bg-paper transition-[opacity,visibility] duration-300 md:hidden",
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-[4.25rem] items-center px-5">
          <Link
            href="/"
            className="font-display text-[1.15rem] tracking-[-0.02em] text-foreground transition-opacity hover:opacity-70"
            aria-label={`${siteConfig.name} — forsiden`}
            onClick={() => setOpen(false)}
          >
            {siteConfig.name}
          </Link>
        </div>
        <nav
          className="flex flex-col px-5 pt-10"
          aria-label="Mobil navigation"
        >
          {navLinks.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-display border-b border-foreground/10 py-6 text-[clamp(2.1rem,9vw,2.75rem)] leading-none tracking-[-0.03em] text-foreground transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-40 hover:opacity-100"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-12 left-5 right-5">
          <Link
            href="/booking"
            className="btn-solid w-full justify-center bg-ink text-paper"
            aria-current={bookingActive ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Booking
          </Link>
          <p className="mt-5 text-center text-sm text-muted-ink">
            {siteConfig.email}
          </p>
        </div>
      </div>
    </header>
  );
}
