"use client";

import { useLocale } from "@/components/i18n/locale-provider";

/** Accessible skip link — follows active locale. */
export function SkipToContent() {
  const { dict } = useLocale();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink focus:outline focus:outline-2 focus:outline-ink focus:outline-offset-2"
    >
      {dict.skipToContent}
    </a>
  );
}
