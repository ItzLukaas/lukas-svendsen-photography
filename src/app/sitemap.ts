import type { MetadataRoute } from "next";
import { photos, siteConfig } from "@/data/photos";
import { seoCities } from "@/data/seo-cities";
import { seoServices } from "@/data/seo-services";
import { references } from "@/data/references";
import { SITE_LAST_MODIFIED, absoluteAssetUrl } from "@/lib/json-ld";

export const revalidate = 86_400;

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
    url: absoluteAssetUrl(path),
    lastModified: options.lastModified ?? SITE_LAST_MODIFIED,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    images: options.images,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const featuredPortfolioImages = photos
    .filter((photo) => photo.featured)
    .slice(0, 12)
    .map((photo) => absoluteAssetUrl(photo.src));

  const homepageImages = [absoluteAssetUrl(siteConfig.ogImage), ...featuredPortfolioImages];

  return [
    entry("/", {
      priority: 1,
      changeFrequency: "weekly",
      images: homepageImages,
    }),
    entry("/portfolio", {
      priority: 0.9,
      changeFrequency: "weekly",
      images: featuredPortfolioImages,
    }),
    entry("/referencer", {
      priority: 0.85,
      changeFrequency: "monthly",
      images: references.map((reference) => absoluteAssetUrl(reference.coverImage.src)),
    }),
    ...references.map((reference) =>
      entry(`/referencer/${reference.slug}`, {
        priority: 0.8,
        changeFrequency: "monthly",
        lastModified: SITE_LAST_MODIFIED,
        images: [
          absoluteAssetUrl(reference.coverImage.src),
          ...reference.gallery.slice(0, 6).map((galleryImage) => absoluteAssetUrl(galleryImage.src)),
        ],
      }),
    ),
    entry("/om-mig", {
      priority: 0.8,
      changeFrequency: "monthly",
      images: [absoluteAssetUrl(siteConfig.ogImage)],
    }),
    entry("/kontakt", {
      priority: 0.85,
      changeFrequency: "monthly",
    }),
    entry("/omraader", {
      priority: 0.75,
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
        images: [absoluteAssetUrl(siteConfig.ogImage)],
      }),
    ),
    ...seoCities.map((city) =>
      entry(`/${city.slug}`, {
        priority: 0.7,
        changeFrequency: "monthly",
        lastModified: city.lastModified,
        images: [absoluteAssetUrl(siteConfig.ogImage)],
      }),
    ),
  ];
}
