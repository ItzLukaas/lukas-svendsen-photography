import type { Metadata } from "next";

import type { LocalArea } from "@/lib/data/local-areas";
import type { Project } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/config";
import { da } from "@/lib/i18n/dictionaries/da";
import { en } from "@/lib/i18n/dictionaries/en";
import { getLocalePathPair } from "@/lib/i18n/paths";
import { localizeImageAlt } from "@/lib/i18n/localize-content";
import { getPageSeo, pageSeo, pageSeoEn, projectMetaDescription } from "@/lib/seo-copy";
import { siteConfig } from "@/lib/site";
import { introPosterUrl, introVideo } from "@/lib/video/intro";

type PageMetaOptions = {
  /** Full document title — not passed through the root `%s · Name` template */
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Defaults to website; use article for project stories */
  ogType?: "website" | "article";
  /** Active page locale — drives OG locale and optional hreflang pair */
  locale?: Locale;
  /**
   * Explicit hreflang pair. When omitted, derived from `path` via locale map.
   * Pass `false` to skip hreflang (orphan pages).
   */
  languages?: Record<string, string> | false;
};

export function schemaLanguage(locale: Locale) {
  return locale === "en" ? "en-DK" : "da-DK";
}

export function openGraphLocale(locale: Locale) {
  return locale === "en" ? "en_DK" : "da_DK";
}

export function websiteNodeId(locale: Locale) {
  return locale === "en"
    ? `${siteConfig.url}/en#website`
    : `${siteConfig.url}/#website`;
}

export const danishKeywords = [
  "Lukas Svendsen",
  "fotograf",
  "videograf",
  "fotograf Grindsted",
  "videograf Danmark",
  "foto og video",
  "videoproduktion",
  "dronefoto",
  "contentproduktion",
  "sportsfotografi",
  "koncertfotografi",
] as const;

export const englishKeywords = [
  "Lukas Svendsen",
  "photographer Denmark",
  "videographer Denmark",
  "photographer Grindsted",
  "video production Denmark",
  "drone photography",
  "sports photography",
  "concert photography",
  "content production",
] as const;

/** Absolute canonical for a site path (`/` → origin without trailing slash). */
export function canonicalUrl(path: string) {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Bidirectional hreflang cluster — Danish is x-default. */
export function localeLanguageAlternates(daPath: string, enPath: string) {
  return {
    da: canonicalUrl(daPath),
    en: canonicalUrl(enPath),
    "x-default": canonicalUrl(daPath),
  };
}

/** Resolve hreflang languages for a path, or undefined if no EN pair. */
export function languagesForPath(path: string) {
  const pair = getLocalePathPair(path);
  if (!pair) return undefined;
  return localeLanguageAlternates(pair.da, pair.en);
}

/** Primary social / fallback share image — landscape, web-optimized */
export const defaultShareImage = {
  url: "/images/og-share.jpg",
  width: 1200,
  height: 630,
  alt: "Lukas Svendsen, photographer and videographer",
} as const;

/**
 * Prefer landscape covers for social cards; fall back to the shared OG image
 * when the project cover is portrait (poor crop in messengers).
 */
export function shareImageFromCover(cover: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  if (cover.width >= cover.height) {
    return {
      image: cover.src,
      imageAlt: cover.alt,
      imageWidth: cover.width,
      imageHeight: cover.height,
    };
  }

  return {
    image: defaultShareImage.url,
    imageAlt: defaultShareImage.alt,
    imageWidth: defaultShareImage.width,
    imageHeight: defaultShareImage.height,
  };
}

/** Shared page metadata — unique title, description, canonical, OG and Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  image = defaultShareImage.url,
  imageAlt,
  imageWidth = defaultShareImage.width,
  imageHeight = defaultShareImage.height,
  ogType = "website",
  locale = "da",
  languages,
}: PageMetaOptions): Metadata {
  const url = canonicalUrl(path);
  const resolvedLanguages =
    languages === false
      ? undefined
      : (languages ?? languagesForPath(path));
  const ogLocale = openGraphLocale(locale);
  const ogAlternate = locale === "en" ? "da_DK" : "en_DK";
  const resolvedImageAlt =
    imageAlt ??
    (locale === "en"
      ? "Lukas Svendsen, photographer and videographer"
      : "Lukas Svendsen, fotograf og videoproducent");

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      ...(resolvedLanguages ? { languages: resolvedLanguages } : {}),
    },
    openGraph: {
      type: ogType,
      locale: ogLocale,
      alternateLocale: [ogAlternate],
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [
        { url: image, width: imageWidth, height: imageHeight, alt: resolvedImageAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: resolvedImageAlt }],
    },
  };
}

export function projectBreadcrumbJsonLd(
  title: string,
  slug: string,
  _category?: string,
  _discipline?: string,
  locale: Locale = "da"
) {
  const homePath = locale === "en" ? "/en" : "/";
  const workPath = locale === "en" ? "/en/work" : "/arbejde";
  const homeName = locale === "en" ? "Home" : "Forside";
  const workName = locale === "en" ? "Work" : "Arbejde";

  // Canonical breadcrumb path only — no filter query URLs in schema
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeName,
      item: canonicalUrl(homePath),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: workName,
      item: canonicalUrl(workPath),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: title,
      item: canonicalUrl(`${workPath}/${slug}`),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Project as a photographic CreativeWork — truthful fields only.
 */
export function projectCreativeWorkJsonLd(
  project: Project,
  locale: Locale = "da",
  localized?: { name?: string; genre?: string }
) {
  const workPath = locale === "en" ? "/en/work" : "/arbejde";
  const url = `${siteConfig.url}${workPath}/${project.slug}`;
  const collectionId = `${siteConfig.url}${workPath}#collection`;
  const description = projectMetaDescription(project, locale);
  const name = localized?.name ?? project.title;
  const genre = localized?.genre ?? project.category;
  const images = project.images.map((image) => ({
    "@type": "ImageObject" as const,
    contentUrl: `${siteConfig.url}${image.src}`,
    url: `${siteConfig.url}${image.src}`,
    name: localizeImageAlt(image.alt, locale),
    width: image.width,
    height: image.height,
    creator: { "@id": `${siteConfig.url}/#person` },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name,
    headline: name,
    description,
    url,
    inLanguage: schemaLanguage(locale),
    dateCreated: `${project.year}-01-01`,
    copyrightYear: Number(project.year),
    genre,
    creator: { "@id": `${siteConfig.url}/#person` },
    author: { "@id": `${siteConfig.url}/#person` },
    provider: { "@id": `${siteConfig.url}/#service` },
    isPartOf: { "@id": collectionId },
    ...(project.client
      ? {
          about: {
            "@type": "Organization",
            name: project.client,
          },
        }
      : {}),
    ...(project.location
      ? {
          contentLocation: {
            "@type": "Place",
            name: project.location,
            address: {
              "@type": "PostalAddress",
              addressLocality: project.location,
              addressCountry: "DK",
            },
          },
        }
      : {}),
    image: images,
    thumbnailUrl: `${siteConfig.url}${project.cover.src}`,
  };
}

export function collectionPageJsonLd(
  projects: { title: string; slug: string; excerpt: string }[],
  locale: "da" | "en" = "da"
) {
  const seo = locale === "en" ? pageSeoEn : pageSeo;
  const dict = locale === "en" ? en : da;
  const basePath = locale === "en" ? "/en/work" : "/arbejde";
  const url = `${siteConfig.url}${basePath}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: seo.arbejde.title,
    description: seo.arbejde.description,
    url,
    inLanguage: schemaLanguage(locale),
    isPartOf: { "@id": websiteNodeId(locale) },
    about: { "@id": `${siteConfig.url}/#person` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => {
        const labels = dict.projectLabels[
          project.slug as keyof typeof dict.projectLabels
        ] as { title?: string; excerpt?: string } | undefined;
        return {
          "@type": "ListItem",
          position: index + 1,
          url: `${siteConfig.url}${basePath}/${project.slug}`,
          name: labels?.title ?? project.title,
          description: labels?.excerpt ?? project.excerpt,
        };
      }),
    },
  };
}

/** Typed service area entities for LocalBusiness / ProfessionalService */
export const serviceAreaPlaces = [
  { name: "Danmark", type: "Country" as const },
  { name: "Grindsted", type: "City" as const },
  { name: "Billund", type: "City" as const },
  { name: "Give", type: "City" as const },
  { name: "Jelling", type: "City" as const },
  { name: "Bredsten", type: "City" as const },
  { name: "Brande", type: "City" as const },
  { name: "Vejle", type: "City" as const },
  { name: "Vejen", type: "City" as const },
  { name: "Esbjerg", type: "City" as const },
  { name: "Kolding", type: "City" as const },
  { name: "Fredericia", type: "City" as const },
  { name: "Horsens", type: "City" as const },
  { name: "Herning", type: "City" as const },
  { name: "Aarhus", type: "City" as const },
  { name: "Odense", type: "City" as const },
  { name: "Jylland", type: "AdministrativeArea" as const },
];

type SimplePageJsonLdOptions = {
  path: string;
  name: string;
  description: string;
  type: "WebPage" | "AboutPage" | "ContactPage";
  /** Prefer LocalBusiness for contact/booking pages */
  mainEntityId?: "person" | "service";
};

/** Page-level WebPage / AboutPage / ContactPage linked into the entity graph */
export function simplePageJsonLd({
  path,
  name,
  description,
  type,
  mainEntityId = "person",
  locale = "da",
}: SimplePageJsonLdOptions & { locale?: "da" | "en" }) {
  const url = `${siteConfig.url}${path}`;
  const entity =
    mainEntityId === "service"
      ? { "@id": `${siteConfig.url}/#service` }
      : { "@id": `${siteConfig.url}/#person` };

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: schemaLanguage(locale),
    isPartOf: { "@id": websiteNodeId(locale) },
    about: { "@id": `${siteConfig.url}/#person` },
    mainEntity: entity,
  };
}

/** Compact breadcrumb for marketing pages (no filter query URLs) */
export function pageBreadcrumbJsonLd(
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item:
        crumb.path === "/"
          ? siteConfig.url
          : `${siteConfig.url}${crumb.path}`,
    })),
  };
}

/** Local landing page — WebPage with geographic context */
export function localAreaPageJsonLd(area: LocalArea, locale: Locale = "da") {
  const path = area.path.startsWith("/en/")
    ? area.path
    : locale === "en"
      ? `/en${area.path}`
      : area.path;
  const url = canonicalUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: area.headline,
    description: area.metaDescription,
    inLanguage: schemaLanguage(locale),
    isPartOf: { "@id": websiteNodeId(locale) },
    about: { "@id": `${siteConfig.url}/#person` },
    mainEntity: { "@id": `${siteConfig.url}/#service` },
    contentLocation: {
      "@type": "Place",
      name: area.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.city,
        addressCountry: "DK",
      },
    },
  };
}

/** Homepage WebPage — primary broad SEO landing */
export function homePageJsonLd(locale: Locale = "da") {
  const seo = locale === "en" ? pageSeoEn : pageSeo;
  const path = locale === "en" ? "/en" : "/";
  const url = canonicalUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#homepage`,
    url,
    name: seo.home.title,
    description: seo.home.description,
    inLanguage: schemaLanguage(locale),
    isPartOf: { "@id": websiteNodeId(locale) },
    about: { "@id": `${siteConfig.url}/#person` },
    mainEntity: { "@id": `${siteConfig.url}/#service` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/images/hero-handbold-maalnet-super-cup.jpg`,
      caption:
        locale === "en"
          ? "Sports photography — handball seen through the goal net"
          : "Sportsfoto — håndbold set gennem målnettet",
    },
  };
}

/** Intro film on the homepage — facts only, no invented duration or view counts */
export function introVideoJsonLd(locale: Locale = "da") {
  const poster = introPosterUrl();
  const isEnglish = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${siteConfig.url}/#intro-video`,
    name: isEnglish
      ? "Lukas Svendsen – Introduction"
      : introVideo.title,
    description: isEnglish
      ? "A short personal introduction — who I am, what I do, and how I work."
      : introVideo.description,
    thumbnailUrl: poster ? [poster] : undefined,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    creator: { "@id": `${siteConfig.url}/#person` },
    inLanguage: isEnglish ? "en-DK" : "da-DK",
    isPartOf: {
      "@id": isEnglish
        ? `${siteConfig.url}/en#homepage`
        : `${siteConfig.url}/#homepage`,
    },
  };
}

/** Schema.org hours from siteConfig — never emit closes: "24:00" */
export function openingHoursJsonLd() {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;

  return siteConfig.openingHours.map((rule) => ({
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: rule.days.map((day) => dayNames[day]),
    opens: `${String(rule.open).padStart(2, "0")}:00`,
    closes:
      rule.close >= 24
        ? "23:59"
        : `${String(rule.close).padStart(2, "0")}:00`,
  }));
}

const englishSiteDescription =
  "Photographer and videographer in Grindsted, Denmark. Lukas Svendsen creates photography, video, content and drone work for businesses, organisations and private clients across Jutland and the rest of Denmark.";

function localizedAreaServed(locale: Locale) {
  return serviceAreaPlaces.map((place) => ({
    "@type": place.type,
    name:
      locale === "en" && place.name === "Danmark"
        ? "Denmark"
        : locale === "en" && place.name === "Jylland"
          ? "Jutland"
          : place.name,
  }));
}

/** Root metadata defaults — pages override title, description, canonical and OG via pageMetadata. */
export function rootLayoutMetadata(locale: Locale): Metadata {
  const seo = getPageSeo(locale);
  const url = locale === "en" ? canonicalUrl("/en") : siteConfig.url;
  const imageAlt =
    locale === "en"
      ? "Lukas Svendsen, photographer and videographer"
      : "Lukas Svendsen, fotograf og videoproducent";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seo.home.title,
      template: `%s · ${siteConfig.name}`,
    },
    description: seo.home.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    keywords: [...(locale === "en" ? englishKeywords : danishKeywords)],
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      alternateLocale: [locale === "en" ? "da_DK" : "en_DK"],
      url,
      siteName: siteConfig.name,
      title: seo.home.title,
      description: seo.home.description,
      images: [
        {
          url: "/images/og-share.jpg",
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.home.title,
      description: seo.home.description,
      images: [{ url: "/images/og-share.jpg", alt: imageAlt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/brand/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/brand/apple-icon.svg", sizes: "180x180" }],
    },
  };
}

/** Site-wide entity graph — language-specific copy, shared Person/Organization IDs. */
export function rootEntityGraphJsonLd(locale: Locale) {
  const isEnglish = locale === "en";
  const description = isEnglish ? englishSiteDescription : siteConfig.description;
  const areaServed = localizedAreaServed(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Person", "Photographer"],
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        alternateName: ["Lukas Guldager Svendsen", "Lukas Svendsen Photography"],
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        jobTitle: isEnglish
          ? "Photographer and videographer"
          : "Fotograf og videograf",
        knowsLanguage: ["da", "en"],
        description,
        image: `${siteConfig.url}/images/about-lukas-2026.jpg`,
        homeLocation: {
          "@type": "Place",
          name: "Grindsted",
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.location.street,
            postalCode: siteConfig.location.postalCode,
            addressLocality: siteConfig.location.city,
            addressRegion: "Syddanmark",
            addressCountry: "DK",
          },
        },
        knowsAbout: isEnglish
          ? [
              "Photography",
              "Video production",
              "Drone production",
              "Content production",
              "Sports photography",
              "Concert photography",
              "Event photography",
              "Business photography",
            ]
          : [
              "Fotografering",
              "Videoproduktion",
              "Droneproduktion",
              "Contentproduktion",
              "Sportsfotografi",
              "Koncertfotografi",
              "Eventfotografi",
              "Virksomhedsfotografering",
            ],
        worksFor: { "@id": `${siteConfig.url}/#organization` },
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.facebook,
          siteConfig.social.linkedin,
        ],
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/brand/apple-icon.svg`,
          width: 180,
          height: 180,
        },
        image: `${siteConfig.url}/images/og-share.jpg`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        founder: { "@id": `${siteConfig.url}/#person` },
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.location.street,
          postalCode: siteConfig.location.postalCode,
          addressLocality: siteConfig.location.city,
          addressRegion: "Syddanmark",
          addressCountry: "DK",
        },
        areaServed,
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.facebook,
          siteConfig.social.linkedin,
        ],
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness", "Photographer"],
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        alternateName: [
          "Lukas Svendsen Photography",
          "Lukas Svendsen Fotograf og Videoproducent",
        ],
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        image: `${siteConfig.url}/images/about-lukas-2026.jpg`,
        description,
        provider: { "@id": `${siteConfig.url}/#person` },
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.location.street,
          postalCode: siteConfig.location.postalCode,
          addressLocality: siteConfig.location.city,
          addressRegion: "Syddanmark",
          addressCountry: "DK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 55.761746,
          longitude: 8.953157,
        },
        areaServed,
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.facebook,
          siteConfig.social.linkedin,
        ],
        openingHoursSpecification: openingHoursJsonLd(),
        serviceType: isEnglish
          ? [
              "Photography",
              "Video production",
              "Drone production",
              "Content production",
              "Sports photography",
              "Concert and event photography",
            ]
          : [
              "Fotografering",
              "Videoproduktion",
              "Droneproduktion",
              "Contentproduktion",
              "Sportsfotografi",
              "Koncert- og eventfotografi",
            ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isEnglish
            ? "Photography, video, drone and content"
            : "Foto, video, drone og content",
          itemListElement: isEnglish
            ? [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Photography",
                    description:
                      "Professional stills for businesses, organisations and private clients who need clear, usable imagery.",
                    areaServed,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Video production",
                    description:
                      "Film and moving images for communication, campaigns and digital channels, ready to use after delivery.",
                    areaServed,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Drone production",
                    description:
                      "Aerial photography and video as part of a photo or film job when the brief needs a view from above.",
                    areaServed,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Content production",
                    description:
                      "Visual material for web, social media and ongoing communication, produced so it can be used in practice.",
                    areaServed,
                  },
                },
              ]
            : [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Fotografering",
                    description:
                      "Professionelle stillebilleder til virksomheder, organisationer og private, der har brug for materiale med et klart og professionelt udtryk.",
                    areaServed,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Videoproduktion",
                    description:
                      "Film og bevægeligt materiale til kommunikation, kampagner og digitale kanaler, der skal kunne bruges direkte efter levering.",
                    areaServed,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Droneproduktion",
                    description:
                      "Luftfoto og luftvideo som en naturlig del af foto og videoproduktion, når opgaven kræver perspektiv fra oven.",
                    areaServed,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Contentproduktion",
                    description:
                      "Visuelt materiale til web, sociale medier og løbende kommunikation, produceret så det kan bruges i praksis.",
                    areaServed,
                  },
                },
              ],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteNodeId(locale),
        url: isEnglish ? `${siteConfig.url}/en` : siteConfig.url,
        name: siteConfig.name,
        description,
        inLanguage: schemaLanguage(locale),
        publisher: { "@id": `${siteConfig.url}/#organization` },
        about: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };
}
