"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = siteConfig.nav.filter((item) => item.href !== "/booking");

function isNavActive(pathname: string, href: string, hash: string) {
  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.slice(1);
  }
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [navPath, setNavPath] = useState(pathname);

  if (pathname !== navPath) {
    setNavPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    const root = document.getElementById("site-scroll");
    const onScroll = () => {
      const y = root?.scrollTop ?? window.scrollY;
      setScrolled(y > 36);
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
    if (!open) return;

    const menu = document.getElementById("mobil-menu");
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () =>
      menu
        ? Array.from(
            menu.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      const button = document.querySelector<HTMLElement>(
        'button[aria-controls="mobil-menu"]'
      );
      (previouslyFocused ?? button)?.focus?.();
    };
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

  const bookingActive =
    pathname === "/booking" || pathname.startsWith("/booking/");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />

      <div
        className={cn(
          "relative border-b border-foreground/8 text-foreground transition-[background-color,backdrop-filter] duration-500 ease-out",
          scrolled
            ? "bg-paper/92 backdrop-blur-md"
            : "bg-paper"
        )}
      >
        <div className="relative mx-auto flex h-[var(--header-h)] max-w-[1600px] items-center justify-between px-5 md:px-8 lg:px-12">
          <Link
            href="/"
            className="font-display relative z-10 shrink-0 text-[1.05rem] leading-none tracking-[-0.025em] transition-opacity duration-300 hover:opacity-65 md:text-[1.15rem]"
            aria-label={`${siteConfig.name} — forsiden`}
          >
            {siteConfig.name}
          </Link>

          <nav
            className="relative z-10 hidden items-center gap-7 md:flex lg:gap-9"
            aria-label="Primær navigation"
          >
            {navLinks.map((item) => {
              const active = isNavActive(pathname, item.href, hash);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-nav text-[0.8125rem] tracking-[0.02em]",
                    active
                      ? "font-semibold text-ink"
                      : "font-medium text-muted-ink hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/booking"
              className="btn-nav-cta ml-0.5 bg-ink text-paper"
              aria-current={bookingActive ? "page" : undefined}
            >
              Book mig
            </Link>
          </nav>

          <button
            type="button"
            className="relative z-50 -mr-1 flex h-11 w-11 items-center justify-center text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobil-menu"
            aria-label={open ? "Luk menu" : "Åbn menu"}
            onClick={() => setOpen((value) => !value)}
          >
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
      </div>

      <div
        id="mobil-menu"
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? "Menu" : undefined}
        hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-paper transition-[opacity,visibility] duration-300 md:hidden",
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        )}
      >
        <div className="h-[var(--chrome-h)]" />
        <nav className="flex flex-col px-5 pt-2" aria-label="Mobil navigation">
          {navLinks.map((item) => {
            const active = isNavActive(pathname, item.href, hash);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-display border-b border-foreground/10 py-5 text-[clamp(1.85rem,8vw,2.5rem)] leading-none tracking-[-0.03em] text-foreground transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-35 hover:opacity-100"
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
            Book mig
          </Link>
          <p className="mt-5 text-center text-sm text-muted-ink">
            {siteConfig.email}
          </p>
        </div>
      </div>
    </header>
  );
}
