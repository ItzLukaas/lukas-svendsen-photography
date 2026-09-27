import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectView } from "@/components/work/project-view";
import { fetchProject, fetchProjects } from "@/lib/content";
import type { Project } from "@/lib/data/projects";
import { en } from "@/lib/i18n/dictionaries/en";
import {
  pageMetadata,
  projectBreadcrumbJsonLd,
  projectCreativeWorkJsonLd,
  shareImageFromCover,
} from "@/lib/seo";
import { projectDocumentTitle, projectMetaDescription } from "@/lib/seo-copy";

type Props = {
  params: Promise<{ slug: string }>;
};

function projectPageTitle(project: Project) {
  const labels = en.projectLabels[project.slug];
  return projectDocumentTitle(
    project,
    "en",
    labels?.title,
    labels?.category
  );
}

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) return { title: "Project" };

  return pageMetadata({
    title: projectPageTitle(project),
    description: projectMetaDescription(project, "en"),
    path: `/en/work/${project.slug}`,
    ...shareImageFromCover(project.cover),
    ogType: "article",
    locale: "en",
  });
}

export default async function EnglishProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) notFound();

  const all = await fetchProjects();
  const index = all.findIndex((item) => item.slug === project.slug);
  const previous =
    index > 0 ? all[index - 1] : all.length > 1 ? all[all.length - 1] : null;
  const next =
    index >= 0 && index < all.length - 1
      ? all[index + 1]
      : all.length > 1
        ? all[0]
        : null;

  const labels = en.projectLabels[project.slug];
  const breadcrumbJsonLd = projectBreadcrumbJsonLd(
    labels?.title ?? project.title,
    project.slug,
    labels?.category ?? project.category,
    project.discipline,
    "en"
  );
  const creativeWorkJsonLd = projectCreativeWorkJsonLd(project, "en", {
    name: labels?.title ?? project.title,
    genre: labels?.category ?? project.category,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkJsonLd),
        }}
      />
      <ProjectView project={project} previous={previous} next={next} />
    </>
  );
}
