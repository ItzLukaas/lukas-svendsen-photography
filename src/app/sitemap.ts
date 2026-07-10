import type { MetadataRoute } from "next";
import { photos, siteConfig } from "@/data/photos";
import { seoCities } from "@/data/seo-cities";
import { seoServices } from "@/data/seo-services";
import { references } from "@/data/references";
import { SITE_LAST_MODIFIED } from "@/lib/json-ld";

type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(
  path: string,
  options: {
    priority: number;
    changeFrequency: SitemapEntry["changeFrequency"];
    lastModified?: string;
    images?: string[];
  },
): SitemapEntry {
  return {
    url: `${siteConfig.url}${path}`,
    lastModified: options.lastModified ?? SITE_LAST_MODIFIED,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    images: options.images,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioImages = photos.slice(0, 12).map((photo) => `${siteConfig.url}${photo.src}`);

  return [
    entry("/", {
      priority: 1,
      changeFrequency: "weekly",
      images: [`${siteConfig.url}${siteConfig.ogImage}`, ...portfolioImages],
    }),
    entry("/portfolio", {
      priority: 0.9,
      changeFrequency: "weekly",
      images: portfolioImages,
    }),
    entry("/referencer", {
      priority: 0.85,
      changeFrequency: "monthly",
    }),
    ...references.map((reference) =>
      entry(`/referencer/${reference.slug}`, {
        priority: 0.8,
        changeFrequency: "monthly",
        images: [
          reference.coverImage.src.startsWith("http")
            ? reference.coverImage.src
            : `${siteConfig.url}${reference.coverImage.src}`,
        ],
      }),
    ),
    entry("/om-mig", {
      priority: 0.8,
      changeFrequency: "monthly",
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    }),
    entry("/kontakt", {
      priority: 0.85,
      changeFrequency: "monthly",
    }),
    entry("/privatlivspolitik", {
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: "2026-07-10",
    }),
    entry("/ydelser", {
      priority: 0.85,
      changeFrequency: "monthly",
    }),
    ...seoServices.map((service) =>
      entry(`/ydelser/${service.slug}`, {
        priority: 0.75,
        changeFrequency: "monthly",
        lastModified: service.lastModified,
      }),
    ),
    ...seoCities.map((city) =>
      entry(`/${city.slug}`, {
        priority: 0.7,
        changeFrequency: "monthly",
        lastModified: city.lastModified,
        images: [`${siteConfig.url}${siteConfig.ogImage}`],
      }),
    ),
  ];
}
