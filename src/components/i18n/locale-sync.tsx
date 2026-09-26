"use client";

import { usePathname } from "next/navigation";
import { useMemo, type ReactNode } from "react";

import { LocaleProvider } from "@/components/i18n/locale-provider";
import type { Dictionary } from "@/lib/i18n/dictionaries/da";
import { getLocaleFromPathname } from "@/lib/i18n/paths";

/**
 * Picks da/en from the URL so chrome stays correct on /en
 * even when the site layout is statically rendered.
 */
export function LocaleSync({
  daDict,
  enDict,
  children,
}: {
  daDict: Dictionary;
  enDict: Dictionary;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const dict = useMemo(
    () => (locale === "en" ? enDict : daDict),
    [locale, daDict, enDict]
  );

  return (
    <LocaleProvider locale={locale} dict={dict}>
      {children}
    </LocaleProvider>
  );
}
