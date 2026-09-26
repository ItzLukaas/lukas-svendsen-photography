import { headers } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

export const LOCALE_HEADER = "x-locale";

export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const value = headerStore.get(LOCALE_HEADER);
  if (value && isLocale(value)) return value;
  return defaultLocale;
}
