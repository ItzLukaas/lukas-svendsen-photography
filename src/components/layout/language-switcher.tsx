"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "@/components/i18n/locale-provider";
import { switchLocalePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
};

/**
 * Visible, crawlable language switcher.
 * Each option is a real URL to the matching translation — not a JS text swap.
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const daHref = switchLocalePath(pathname, "da");
  const enHref = switchLocalePath(pathname, "en");

  return (
    <nav
      aria-label={dict.language.label}
      className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", className)}
    >
      <Link
        href={daHref}
        hrefLang="da"
        lang="da"
        aria-current={locale === "da" ? "page" : undefined}
        className={cn(
          "text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-300",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
          locale === "da"
            ? "text-ink"
            : "text-muted-ink hover:text-ink"
        )}
      >
        {dict.language.da}
      </Link>
      <span className="text-[0.75rem] text-muted-ink/45" aria-hidden>
        |
      </span>
      <Link
        href={enHref}
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
        className={cn(
          "text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-300",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
          locale === "en"
            ? "text-ink"
            : "text-muted-ink hover:text-ink"
        )}
      >
        {dict.language.en}
      </Link>
    </nav>
  );
}
