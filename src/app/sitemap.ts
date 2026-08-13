import type { MetadataRoute } from "next";

import { fetchProjects } from "@/lib/content";
import { getGeneratedGallery } from "@/lib/data/generated-images";
import { siteConfig } from "@/lib/site";

/** Stable lastModified for mostly-static marketing routes */
const SITE_REVISED = new Date("2026-08-13");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const projects = await fetchProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: SITE_REVISED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/arbejde`,
      lastModified: SITE_REVISED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/om`,
      lastModified: SITE_REVISED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/kontakt`,
      lastModified: SITE_REVISED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/booking`,
      lastModified: SITE_REVISED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => {
    const generated = getGeneratedGallery(project.slug);
    const lastModified = generated?.updatedAt
      ? new Date(generated.updatedAt)
      : new Date(`${project.year}-08-01`);

    return {
      url: `${base}/arbejde/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.75 : 0.65,
    };
  });

  return [...staticRoutes, ...projectRoutes];
}
