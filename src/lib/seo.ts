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
  alt: `${siteConfig.name} — fotograf, videograf og dronepilot i Grindsted og Billund`,
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
  const homeTitle = "Fotograf i Grindsted | Foto, video og droneflyvning";
  const homeDescription =
    "Fotograf i Grindsted og Billund. Fotografering, videoproduktion og droneflyvning for private og virksomheder i hele Danmark.";

  return {
    title: {
      absolute: homeTitle,
    },
    description: homeDescription,
    keywords: [
      "fotograf Danmark",
      "fotograf Grindsted",
      "fotograf Billund",
      "fotograf Vejle",
      "fotograf Kolding",
      "fotografering",
      "videoproduktion",
      "drone",
      "Lukas Svendsen",
      "fotograf Midtjylland",
      "fotograf Syddanmark",
    ],
    openGraph: {
      title: homeTitle,
      description: homeDescription,
      url: siteConfig.url,
      type: "website",
      siteName: siteConfig.name,
      locale: "da_DK",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: homeDescription,
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
