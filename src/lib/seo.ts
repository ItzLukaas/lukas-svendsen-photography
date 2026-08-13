import type { Metadata } from "next";

import type { Project } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

type PageMetaOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Defaults to website; use article for project stories */
  ogType?: "website" | "article";
};

/** Primary social / fallback share image — landscape, web-optimized */
export const defaultShareImage = {
  url: "/images/og-share.jpg",
  width: 1200,
  height: 630,
  alt: "Hvid kirke under blå himmel — fotografi af Lukas Svendsen",
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

/** Shared page metadata — titles use root template `%s · Lukas Svendsen`. */
export function pageMetadata({
  title,
  description,
  path,
  image = defaultShareImage.url,
  imageAlt = defaultShareImage.alt,
  imageWidth = defaultShareImage.width,
  imageHeight = defaultShareImage.height,
  ogType = "website",
}: PageMetaOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} · ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      images: [
        { url: image, width: imageWidth, height: imageHeight, alt: imageAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}

export function projectBreadcrumbJsonLd(
  title: string,
  slug: string,
  _category?: string,
  _discipline?: string
) {
  // Canonical breadcrumb path only — no filter query URLs in schema
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Forside",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Arbejde",
      item: `${siteConfig.url}/arbejde`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: title,
      item: `${siteConfig.url}/arbejde/${slug}`,
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
export function projectCreativeWorkJsonLd(project: Project) {
  const url = `${siteConfig.url}/arbejde/${project.slug}`;
  const images = project.images.map((image) => ({
    "@type": "ImageObject" as const,
    contentUrl: `${siteConfig.url}${image.src}`,
    url: `${siteConfig.url}${image.src}`,
    name: image.alt,
    width: image.width,
    height: image.height,
    creator: { "@id": `${siteConfig.url}/#person` },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.title,
    headline: project.title,
    description: project.excerpt,
    url,
    dateCreated: `${project.year}-01-01`,
    copyrightYear: Number(project.year),
    genre: project.category,
    creator: { "@id": `${siteConfig.url}/#person` },
    author: { "@id": `${siteConfig.url}/#person` },
    provider: { "@id": `${siteConfig.url}/#service` },
    isPartOf: { "@id": `${siteConfig.url}/arbejde#collection` },
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
  projects: { title: string; slug: string; excerpt: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/arbejde#collection`,
    name: "Portfolio — Lukas Svendsen",
    description:
      "Portfolio med festival-, koncert-, sport- og eventfotografi fra Lukas Svendsen i Grindsted — også Billund, Esbjerg, Vejle og Jylland.",
    url: `${siteConfig.url}/arbejde`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#person` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/arbejde/${project.slug}`,
        name: project.title,
        description: project.excerpt,
      })),
    },
  };
}

/** Typed service area entities for LocalBusiness / ProfessionalService */
export const serviceAreaPlaces = [
  { name: "Grindsted", type: "City" as const },
  { name: "Billund", type: "City" as const },
  { name: "Give", type: "City" as const },
  { name: "Vejle", type: "City" as const },
  { name: "Vejen", type: "City" as const },
  { name: "Esbjerg", type: "City" as const },
  { name: "Kolding", type: "City" as const },
  { name: "Fredericia", type: "City" as const },
  { name: "Herning", type: "City" as const },
  { name: "Jylland", type: "AdministrativeArea" as const },
  { name: "Danmark", type: "Country" as const },
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
}: SimplePageJsonLdOptions) {
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
    inLanguage: "da-DK",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
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
