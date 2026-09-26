import type { Locale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";
import { da, type Dictionary } from "@/lib/i18n/dictionaries/da";
import { en } from "@/lib/i18n/dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = {
  da,
  en,
};

export async function getDictionary(locale: Locale = defaultLocale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export type { Dictionary };
