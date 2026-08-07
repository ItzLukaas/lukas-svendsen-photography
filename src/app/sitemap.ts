import type { MetadataRoute } from "next";

import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/arbejde`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/om`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/kontakt`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/booking`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/arbejde/${project.slug}`,
    lastModified: new Date(`${project.year}-12-01`),
    changeFrequency: "monthly",
    priority: project.featured ? 0.75 : 0.65,
  }));

  return [...staticRoutes, ...projectRoutes];
}
