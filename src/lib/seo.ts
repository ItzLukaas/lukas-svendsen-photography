import type { Metadata } from "next";
import { siteConfig } from "@/data/photos";

type PageMetaOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  type?: "website" | "article";
  noIndex?: boolean;
  includeCanonical?: boolean;
};

const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — fotograf og videoproducent i Midt- og Syddanmark`,
};

function buildOgImages(options?: Pick<PageMetaOptions, "ogImage" | "ogImageWidth" | "ogImageHeight">) {
  if (!options?.ogImage) {
    return [defaultOgImage];
  }

  return [
    {
      url: options.ogImage,
      width: options.ogImageWidth ?? siteConfig.ogImageWidth,
      height: options.ogImageHeight ?? siteConfig.ogImageHeight,
      alt: `${siteConfig.name}`,
    },
  ];
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  type = "website",
  noIndex = false,
  includeCanonical = true,
}: PageMetaOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const images = buildOgImages({ ogImage, ogImageWidth, ogImageHeight });
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      siteName: siteConfig.name,
      locale: "da_DK",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((image) => image.url),
    },
    alternates: includeCanonical
      ? {
          canonical: url,
        }
      : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function homeMetadata(): Metadata {
  const images = buildOgImages();

  return {
    title: {
      absolute: siteConfig.title,
    },
    description: siteConfig.description,
    keywords: [
      "fotograf Grindsted",
      "fotograf Vejle",
      "fotograf Kolding",
      "eventfotograf",
      "sportsfotograf",
      "videograf",
      "dronefoto",
      "Lukas Svendsen",
      "fotograf Midtjylland",
      "fotograf Syddanmark",
    ],
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: siteConfig.url,
      type: "website",
      siteName: siteConfig.name,
      locale: "da_DK",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: images.map((image) => image.url),
    },
    alternates: {
      canonical: siteConfig.url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function notFoundMetadata(): Metadata {
  return {
    title: "Side ikke fundet",
    description:
      "Siden blev ikke fundet. Gå til forsiden eller se porteføljen på Lukas Svendsen Photography.",
    robots: { index: false, follow: false },
  };
}

export const defaultIcons: Metadata["icons"] = {
  icon: [{ url: "/icon", type: "image/png" }],
  apple: [{ url: "/apple-icon", type: "image/png" }],
};
