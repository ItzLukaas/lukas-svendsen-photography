import {
  getFeaturedProjects,
  getProject,
  getProjectsByDiscipline,
  projects as seedProjects,
  type Project,
} from "@/lib/data/projects";
import { hasSanity, sanityClient } from "@/lib/sanity/client";
import {
  projectBySlugQuery,
  projectsQuery,
} from "@/lib/sanity/queries";
import type { DisciplineSlug } from "@/lib/site";

export async function fetchProjects(): Promise<Project[]> {
  const published = (items: Project[]) =>
    items.filter((project) => project.images.length > 0);

  if (!hasSanity || !sanityClient) return published(seedProjects);
  try {
    const data = await sanityClient.fetch<Project[]>(projectsQuery);
    return published(data?.length ? data : seedProjects);
  } catch {
    return published(seedProjects);
  }
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  if (!hasSanity || !sanityClient) return getProject(slug);
  try {
    const data = await sanityClient.fetch<Project | null>(projectBySlugQuery, {
      slug,
    });
    return data ?? getProject(slug);
  } catch {
    return getProject(slug);
  }
}

export async function fetchFeaturedProjects() {
  const all = await fetchProjects();
  const featured = all.filter((project) => project.featured);
  return featured.length ? featured : getFeaturedProjects();
}

export async function fetchProjectsByDiscipline(
  discipline?: DisciplineSlug | "alle"
) {
  const all = await fetchProjects();
  if (!discipline || discipline === "alle") return all;
  const filtered = all.filter((project) => project.discipline === discipline);
  return filtered.length ? filtered : getProjectsByDiscipline(discipline);
}
