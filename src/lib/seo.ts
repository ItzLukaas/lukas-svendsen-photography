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

/** Primary social / fallback share image — landscape, photography-first */
export const defaultShareImage = {
  url: "/images/projects/varde-open-air/00-dsc08572-cover.jpg",
  width: 3600,
  height: 2400,
  alt: "Publikum til Varde Open Air — fotografi af Lukas Svendsen",
} as const;

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
  category?: string,
  discipline?: string
) {
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
  ];

  if (category && discipline) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: category,
      item: `${siteConfig.url}/arbejde?kategori=${discipline}`,
    });
    items.push({
      "@type": "ListItem",
      position: 4,
      name: title,
      item: `${siteConfig.url}/arbejde/${slug}`,
    });
  } else {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: title,
      item: `${siteConfig.url}/arbejde/${slug}`,
    });
  }

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
    dateCreated: project.year,
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
  { name: "Vejle", type: "City" as const },
  { name: "Esbjerg", type: "City" as const },
  { name: "Kolding", type: "City" as const },
  { name: "Herning", type: "City" as const },
  { name: "Jylland", type: "AdministrativeArea" as const },
  { name: "Danmark", type: "Country" as const },
];

type SimplePageJsonLdOptions = {
  path: string;
  name: string;
  description: string;
  type: "WebPage" | "AboutPage" | "ContactPage";
};

/** Page-level WebPage / AboutPage / ContactPage linked into the entity graph */
export function simplePageJsonLd({
  path,
  name,
  description,
  type,
}: SimplePageJsonLdOptions) {
  const url = `${siteConfig.url}${path}`;
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
    mainEntity: { "@id": `${siteConfig.url}/#person` },
  };
}
