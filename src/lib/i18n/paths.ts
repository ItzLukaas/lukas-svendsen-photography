import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Path pairs for pages that exist in both languages.
 * Only list routes that have real translated content.
 */
const localePathMap: Record<string, Partial<Record<Locale, string>>> = {
  "/": { da: "/", en: "/en" },
  "/en": { da: "/", en: "/en" },
  "/arbejde": { da: "/arbejde", en: "/en/work" },
  "/en/work": { da: "/arbejde", en: "/en/work" },
  "/hvad-jeg-laver": { da: "/hvad-jeg-laver", en: "/en/what-i-do" },
  "/en/what-i-do": { da: "/hvad-jeg-laver", en: "/en/what-i-do" },
  "/om": { da: "/om", en: "/en/about" },
  "/en/about": { da: "/om", en: "/en/about" },
  "/kontakt": { da: "/kontakt", en: "/en/contact" },
  "/en/contact": { da: "/kontakt", en: "/en/contact" },
  "/booking": { da: "/booking", en: "/en/booking" },
  "/en/booking": { da: "/booking", en: "/en/booking" },
  "/privatliv": { da: "/privatliv", en: "/en/privacy" },
  "/en/privacy": { da: "/privatliv", en: "/en/privacy" },
};

/** Project detail pages share the same slug across locales. */
function projectLocalePaths(
  pathname: string
): Partial<Record<Locale, string>> | null {
  const daMatch = pathname.match(/^\/arbejde\/([^/]+)$/);
  if (daMatch) {
    const slug = daMatch[1];
    return {
      da: `/arbejde/${slug}`,
      en: `/en/work/${slug}`,
    };
  }
  const enMatch = pathname.match(/^\/en\/work\/([^/]+)$/);
  if (enMatch) {
    const slug = enMatch[1];
    return {
      da: `/arbejde/${slug}`,
      en: `/en/work/${slug}`,
    };
  }
  return null;
}

/** Local SEO landings: /fotograf-grindsted ↔ /en/fotograf-grindsted */
function localAreaLocalePaths(
  pathname: string
): Partial<Record<Locale, string>> | null {
  const daMatch = pathname.match(/^\/fotograf-([^/]+)$/);
  if (daMatch) {
    const slug = daMatch[1];
    return {
      da: `/fotograf-${slug}`,
      en: `/en/fotograf-${slug}`,
    };
  }
  const enMatch = pathname.match(/^\/en\/fotograf-([^/]+)$/);
  if (enMatch) {
    const slug = enMatch[1];
    return {
      da: `/fotograf-${slug}`,
      en: `/en/fotograf-${slug}`,
    };
  }
  return null;
}

function pairedLocalePaths(
  pathname: string
): Partial<Record<Locale, string>> | null {
  return projectLocalePaths(pathname) ?? localAreaLocalePaths(pathname);
}

/**
 * Detect locale from a pathname. Danish is default (no prefix).
 * English lives under `/en` (and `/en/...` pages).
 */
export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return defaultLocale;
}

/** Strip locale prefix for matching against Danish route keys. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

/**
 * Resolve the URL for a locale switch, preserving the page when a
 * translated counterpart exists. Otherwise fall back to that locale's home.
 */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const [pathOnly, query = ""] = pathname.split("?");
  const normalized =
    pathOnly.length > 1 && pathOnly.endsWith("/")
      ? pathOnly.slice(0, -1)
      : pathOnly || "/";

  const dynamicMapped = pairedLocalePaths(normalized)?.[nextLocale];
  if (dynamicMapped) {
    return query ? `${dynamicMapped}?${query}` : dynamicMapped;
  }

  const mapped = localePathMap[normalized]?.[nextLocale];
  if (mapped) {
    return query ? `${mapped}?${query}` : mapped;
  }

  const bare = stripLocalePrefix(normalized);
  const bareMapped = localePathMap[bare]?.[nextLocale];
  if (bareMapped) {
    return query ? `${bareMapped}?${query}` : bareMapped;
  }

  // No translated counterpart yet — go to that locale's homepage.
  return nextLocale === "en" ? "/en" : "/";
}

/** Prefix an internal href for the active locale when a mapping exists. */
export function localizedHref(href: string, locale: Locale): string {
  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  const [pathWithQuery, hash] = href.split("#");
  const [path, query] = (pathWithQuery || "/").split("?");
  const normalized = path || "/";

  const dynamicMapped = pairedLocalePaths(normalized)?.[locale];
  if (dynamicMapped) {
    const withQuery = query ? `${dynamicMapped}?${query}` : dynamicMapped;
    return hash ? `${withQuery}#${hash}` : withQuery;
  }

  const mapped = localePathMap[normalized]?.[locale];

  let next = mapped ?? normalized;
  if (!mapped && locale === "en" && normalized === "/") {
    next = "/en";
  }

  // Hash-only anchors on home should stay on the locale home.
  if (!mapped && locale === "en" && normalized === "" && hash) {
    next = "/en";
  }

  // Local area paths under English: /fotograf-x → /en/fotograf-x
  if (!mapped && locale === "en" && normalized.startsWith("/fotograf-")) {
    next = `/en${normalized}`;
  }

  const withQuery = query ? `${next}?${query}` : next;
  return hash ? `${withQuery}#${hash}` : withQuery;
}

export function resolveLocaleParam(value: string | undefined | null): Locale {
  if (value && isLocale(value)) return value;
  return defaultLocale;
}

/** Danish + English path pair for hreflang / sitemap. */
export function getLocalePathPair(
  pathname: string
): { da: string; en: string } | null {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname || "/";

  const dynamic = pairedLocalePaths(normalized);
  if (dynamic?.da && dynamic?.en) {
    return { da: dynamic.da, en: dynamic.en };
  }

  const mapped = localePathMap[normalized];
  if (mapped?.da && mapped?.en) {
    return { da: mapped.da, en: mapped.en };
  }

  const bare = stripLocalePrefix(normalized);
  const bareMapped = localePathMap[bare];
  if (bareMapped?.da && bareMapped?.en) {
    return { da: bareMapped.da, en: bareMapped.en };
  }

  return null;
}
