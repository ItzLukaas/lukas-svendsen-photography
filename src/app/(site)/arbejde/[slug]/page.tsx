import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectView } from "@/components/work/project-view";
import { fetchProject, fetchProjects } from "@/lib/content";
import {
  sortProjectsForMasonry,
  type Project,
} from "@/lib/data/projects";
import {
  pageMetadata,
  projectBreadcrumbJsonLd,
  projectCreativeWorkJsonLd,
  shareImageFromCover,
} from "@/lib/seo";

type Props = PageProps<"/arbejde/[slug]">;

function projectDescription(project: Project) {
  const location = project.location ? ` — ${project.location}` : "";
  const client = project.client ? ` ${project.client}.` : "";
  return `${project.excerpt}${location}.${client} Fotografi af Lukas Svendsen.`.replace(
    /\.\./g,
    "."
  );
}

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) return { title: "Projekt" };

  return pageMetadata({
    title: project.title,
    description: projectDescription(project),
    path: `/arbejde/${project.slug}`,
    ...shareImageFromCover(project.cover),
    ogType: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) notFound();

  const all = sortProjectsForMasonry(await fetchProjects());
  const index = all.findIndex((item) => item.slug === project.slug);
  const previous =
    index > 0 ? all[index - 1] : all.length > 1 ? all[all.length - 1] : null;
  const next =
    index >= 0 && index < all.length - 1
      ? all[index + 1]
      : all.length > 1
        ? all[0]
        : null;

  const breadcrumbJsonLd = projectBreadcrumbJsonLd(
    project.title,
    project.slug,
    project.category,
    project.discipline
  );
  const workJsonLd = projectCreativeWorkJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd) }}
      />
      <ProjectView project={project} previous={previous} next={next} />
    </>
  );
}
