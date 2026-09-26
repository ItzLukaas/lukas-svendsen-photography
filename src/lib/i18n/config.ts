export const locales = ["da", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "da";

export const localeNames: Record<Locale, string> = {
  da: "Dansk",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Marker for copy the owner has not supplied yet — never invent translations. */
export const TRANSLATION_NEEDED = "[TRANSLATION NEEDED]";
