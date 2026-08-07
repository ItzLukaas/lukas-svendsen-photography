import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type PageMetaOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

/** Shared page metadata — titles use root template `%s · Lukas Svendsen`. */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/hero-poster.jpg",
  imageAlt = "Fotografi af Lukas Svendsen — fotograf i Grindsted",
  imageWidth = 1920,
  imageHeight = 1080,
}: PageMetaOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} · ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
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

export function projectBreadcrumbJsonLd(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
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
    ],
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
      "Portfolio med festival-, koncert-, sport- og eventfotografi fra fotograf Lukas Svendsen i Grindsted — også opgaver i Billund, Esbjerg, Vejle og hele Jylland.",
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
  { name: "Vejle", type: "City" as const },
  { name: "Esbjerg", type: "City" as const },
  { name: "Kolding", type: "City" as const },
  { name: "Herning", type: "City" as const },
  { name: "Jylland", type: "AdministrativeArea" as const },
  { name: "Danmark", type: "Country" as const },
];
