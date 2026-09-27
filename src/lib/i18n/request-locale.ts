import { headers } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { getLocaleFromPathname } from "@/lib/i18n/paths";

export const LOCALE_HEADER = "x-locale";
export const PATHNAME_HEADER = "x-pathname";

export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const value = headerStore.get(LOCALE_HEADER);
  if (value && isLocale(value)) return value;

  const pathname = headerStore.get(PATHNAME_HEADER);
  if (pathname) return getLocaleFromPathname(pathname);

  return defaultLocale;
}

export async function getRequestPathname(): Promise<string> {
  const headerStore = await headers();
  return headerStore.get(PATHNAME_HEADER) || "/";
}
