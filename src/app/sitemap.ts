import type { MetadataRoute } from "next";

import { fetchProjects } from "@/lib/content";
import { getGeneratedGallery } from "@/lib/data/generated-images";
import { localAreas } from "@/lib/data/local-areas";
import { localeLanguageAlternates } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/** Stable lastModified for mostly-static marketing routes */
const SITE_REVISED = new Date("2026-09-26");

function pairedEntry(
  daPath: string,
  enPath: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
): MetadataRoute.Sitemap {
  const languages = localeLanguageAlternates(daPath, enPath);
  const daUrl = languages.da;
  const enUrl = languages.en;

  return [
    {
      url: daUrl,
      lastModified: SITE_REVISED,
      changeFrequency,
      priority,
      alternates: { languages },
    },
    {
      url: enUrl,
      lastModified: SITE_REVISED,
      changeFrequency,
      priority: Math.max(priority - 0.05, 0.5),
      alternates: { languages },
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const projects = await fetchProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    ...pairedEntry("/", "/en", 1, "weekly"),
    ...pairedEntry("/arbejde", "/en/work", 0.9, "weekly"),
    ...pairedEntry("/hvad-jeg-laver", "/en/what-i-do", 0.9),
    ...pairedEntry("/om", "/en/about", 0.8),
    ...pairedEntry("/kontakt", "/en/contact", 0.8),
    ...pairedEntry("/booking", "/en/booking", 0.85),
    ...pairedEntry("/privatliv", "/en/privacy", 0.3, "yearly"),
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const generated = getGeneratedGallery(project.slug);
    const lastModified = generated?.updatedAt
      ? new Date(generated.updatedAt)
      : new Date(`${project.year}-08-01`);
    const daPath = `/arbejde/${project.slug}`;
    const enPath = `/en/work/${project.slug}`;
    const languages = localeLanguageAlternates(daPath, enPath);
    const priority = project.featured ? 0.75 : 0.65;

    return [
      {
        url: `${base}${daPath}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: `${base}${enPath}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: priority - 0.05,
        alternates: { languages },
      },
    ];
  });

  // Local SEO landings — Danish + English pairs
  const localRoutes: MetadataRoute.Sitemap = localAreas.flatMap((area) => {
    const daPath = area.path;
    const enPath = `/en${area.path}`;
    const priority = area.slug === "grindsted" ? 0.88 : 0.82;
    return pairedEntry(daPath, enPath, priority);
  });

  return [...staticRoutes, ...localRoutes, ...projectRoutes];
}
