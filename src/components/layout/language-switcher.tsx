"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import { locales, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  /** Larger tap targets for mobile menu */
  size?: "nav" | "menu";
};

/** Danish flag — SVG so it renders identically on Windows, macOS and mobile. */
function FlagDenmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 16"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="22" height="16" fill="#C8102E" />
      <rect x="6.6" y="0" width="2.8" height="16" fill="#fff" />
      <rect x="0" y="6.6" width="22" height="2.8" fill="#fff" />
    </svg>
  );
}

/** British flag — simplified Union Jack for crisp small sizes. */
function FlagUnitedKingdom({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 v30M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function LocaleFlag({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-[2.5px] shadow-[inset_0_0_0_1px_rgb(23_23_22_/_0.1)]",
        className
      )}
    >
      {locale === "en" ? (
        <FlagUnitedKingdom className="block h-full w-full" />
      ) : (
        <FlagDenmark className="block h-full w-full" />
      )}
    </span>
  );
}

/**
 * Compact pill locale selector — SVG flags (no emoji / no DK·GB codes).
 */
export function LanguageSwitcher({
  className,
  size = "nav",
}: LanguageSwitcherProps) {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const isMenu = size === "menu";
  const activeName = dict.language[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "da";
    const clear = window.setTimeout(() => {
      document.documentElement.removeAttribute("data-locale-switch");
    }, 400);
    return () => window.clearTimeout(clear);
  }, [locale]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target || !rootRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = useCallback(
    (next: Locale) => {
      setOpen(false);
      if (next === locale) return;
      document.documentElement.setAttribute("data-locale-switch", "1");
      router.push(switchLocalePath(pathname, next));
    },
    [locale, pathname, router]
  );

  function onTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      setOpen(true);
      window.requestAnimationFrame(() => {
        const active = listRef.current?.querySelector<HTMLElement>(
          '[aria-selected="true"]'
        );
        (
          active ?? listRef.current?.querySelector<HTMLElement>("[role=option]")
        )?.focus();
      });
    }
  }

  function onListKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const options = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>("[role=option]") ?? []
    );
    if (options.length === 0) return;

    const index = options.indexOf(document.activeElement as HTMLElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      options[(index + 1) % options.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      options[(index - 1 + options.length) % options.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      options[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      options[options.length - 1]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={`${dict.language.label}: ${activeName}`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "group inline-flex items-center gap-1.5 border border-foreground/12 bg-paper/90 text-ink shadow-[0_1px_2px_rgb(23_23_22_/_0.04)] transition-[border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:border-foreground/20 hover:bg-paper hover:shadow-[0_2px_8px_rgb(23_23_22_/_0.06)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
          open &&
            "border-foreground/22 bg-paper shadow-[0_2px_10px_rgb(23_23_22_/_0.08)]",
          isMenu
            ? "min-h-11 rounded-full px-3"
            : "min-h-8 rounded-full px-2 py-1"
        )}
      >
        <LocaleFlag
          locale={locale}
          className={isMenu ? "h-[14px] w-[19px]" : "h-[12px] w-[16px]"}
        />
        <span
          aria-hidden
          className={cn(
            "inline-flex text-muted-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open && "rotate-180"
          )}
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            className="opacity-70"
          >
            <path
              d="M1 1.25L5 4.75L9 1.25"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={listboxId}
        ref={listRef}
        role="listbox"
        aria-label={dict.language.label}
        hidden={!open}
        onKeyDown={onListKeyDown}
        className={cn(
          "absolute z-50 min-w-[10.75rem] overflow-hidden rounded-xl border border-foreground/12 bg-paper shadow-[0_8px_28px_rgb(23_23_22_/_0.1)]",
          "origin-top transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
          isMenu ? "bottom-full left-0 mb-2" : "top-full right-0 mt-2"
        )}
      >
        <ul className="m-0 list-none p-1">
          {locales.map((code) => {
            const active = locale === code;
            const href = switchLocalePath(pathname, code);
            const label = dict.language[code];

            return (
              <li key={code} role="none">
                <Link
                  href={href}
                  hrefLang={code}
                  lang={code}
                  role="option"
                  aria-selected={active}
                  tabIndex={open ? 0 : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    select(code);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[0.8125rem] tracking-[0.01em] transition-[background-color,color] duration-200",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink",
                    active
                      ? "bg-ink/[0.05] font-medium text-ink"
                      : "text-muted-ink hover:bg-ink/[0.035] hover:text-ink"
                  )}
                >
                  <LocaleFlag locale={code} className="h-[12px] w-[16px]" />
                  <span className="flex-1 leading-none">{label}</span>
                  {active ? (
                    <span
                      aria-hidden
                      className="text-[0.65rem] text-muted-ink"
                    >
                      ✓
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
