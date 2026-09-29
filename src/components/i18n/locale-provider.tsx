"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/da";
import { da } from "@/lib/i18n/dictionaries/da";
import { en } from "@/lib/i18n/dictionaries/en";
import { getLocaleFromPathname } from "@/lib/i18n/paths";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
};

const dictionaries: Record<Locale, Dictionary> = { da, en };

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Locale follows the URL on every client navigation.
 *
 * The shared (site) layout can stay mounted across / ↔ /en soft navigations,
 * so we must NOT trust only the server-provided initial locale — otherwise
 * header/footer/forms keep the previous language until a hard refresh.
 */
export function LocaleProvider({
  locale: initialLocale,
  dict: initialDict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const dict = dictionaries[locale] ?? dictionaries.da;

  // Prefer URL-derived locale; fall back to SSR props on first paint mismatch edge cases
  const resolvedLocale =
    locale || initialLocale || ("da" as Locale);
  const resolvedDict =
    dictionaries[resolvedLocale] ?? initialDict ?? dictionaries.da;

  const value = useMemo(
    () => ({ locale: resolvedLocale, dict: resolvedDict }),
    [resolvedLocale, resolvedDict]
  );

  useEffect(() => {
    document.documentElement.lang = resolvedLocale === "en" ? "en" : "da";
  }, [resolvedLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

/** Safe for components that may render outside the provider during build. */
export function useLocaleOptional() {
  return useContext(LocaleContext);
}
