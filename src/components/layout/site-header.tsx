"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { localizedHref } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function isNavActive(pathname: string, href: string, hash: string) {
  if (href.startsWith("/#")) {
    return (pathname === "/" || pathname === "/en") && hash === href.slice(1);
  }
  if (href === "/" || href === "/en") {
    return pathname === "/" || pathname === "/en";
  }
  if (href === "/arbejde" || href === "/en/work") {
    return (
      pathname === "/arbejde" ||
      pathname.startsWith("/arbejde/") ||
      pathname === "/en/work" ||
      pathname.startsWith("/en/work/")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [navPath, setNavPath] = useState(pathname);

  const homeHref = localizedHref("/", locale);

  const navLinks = [
    { href: localizedHref("/arbejde", locale), label: dict.nav.work },
    {
      href: localizedHref("/hvad-jeg-laver", locale),
      label: dict.nav.whatIDo,
    },
    { href: localizedHref("/om", locale), label: dict.nav.about },
    { href: localizedHref("/kontakt", locale), label: dict.nav.contact },
  ] as const;

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
    pathname === "/booking" ||
    pathname.startsWith("/booking/") ||
    pathname === "/en/booking" ||
    pathname.startsWith("/en/booking/");

  const linkClass = (active: boolean) =>
    cn(
      "link-nav text-[0.8125rem] font-medium tracking-[0.02em] transition-[color,font-weight] duration-300",
      active ? "font-semibold text-ink" : "text-muted-ink hover:text-ink"
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />

      <div className="border-b border-foreground/8 bg-paper text-foreground shadow-[0_1px_0_rgb(23_23_22_/_0.04)]">
        <div className="relative mx-auto flex h-[var(--header-h)] max-w-[1600px] items-center justify-between px-5 md:px-8 lg:px-12">
          <Link
            href={homeHref}
            className="font-display relative z-10 shrink-0 text-[1.05rem] leading-none tracking-[-0.025em] text-ink transition-opacity duration-300 hover:opacity-65 md:text-[1.15rem]"
            aria-label={`${siteConfig.name}, ${dict.nav.home}`}
          >
            {siteConfig.name}
          </Link>

          <nav
            className="relative z-10 hidden items-center gap-5 md:flex lg:gap-7"
            aria-label="Primary"
          >
            {navLinks.map((item) => {
              const active = isNavActive(pathname, item.href, hash);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass(active)}
                >
                  {item.label}
                </Link>
              );
            })}

            <LanguageSwitcher className="ml-1 lg:ml-2" />

            <Link
              href={localizedHref("/booking", locale)}
              className="btn-nav-cta ml-0.5 bg-ink text-paper"
              aria-current={bookingActive ? "page" : undefined}
            >
              {dict.nav.bookMe}
            </Link>
          </nav>

          <div className="relative z-50 flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="-mr-1 flex h-11 w-11 items-center justify-center text-foreground"
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? dict.language.menuClose : dict.language.menuOpen}
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
        <nav className="flex flex-col px-5 pt-2" aria-label={dict.language.menuOpen}>
          {navLinks.map((item) => {
            const active = isNavActive(pathname, item.href, hash);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-display border-b border-foreground/10 py-5 text-[clamp(1.85rem,8vw,2.5rem)] leading-none tracking-[-0.03em] text-foreground transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-12 left-5 right-5 space-y-6">
          <Link
            href={localizedHref("/booking", locale)}
            className="btn-solid w-full justify-center"
            aria-current={bookingActive ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {dict.nav.bookMe}
          </Link>
          <p className="text-center text-sm text-muted-ink">{siteConfig.email}</p>
        </div>
      </div>
    </header>
  );
}
