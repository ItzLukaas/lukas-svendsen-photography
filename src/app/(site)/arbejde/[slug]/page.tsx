import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectView } from "@/components/work/project-view";
import { fetchProject, fetchProjects } from "@/lib/content";
import type { Project } from "@/lib/data/projects";
import { pageMetadata, projectBreadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = PageProps<"/arbejde/[slug]">;

function projectDescription(project: Project) {
  const location = project.location ? ` — ${project.location}` : "";
  return `${project.excerpt}${location}. Fotografi af Lukas Svendsen.`;
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
    image: project.cover.src,
    imageAlt: project.cover.alt,
    imageWidth: project.cover.width,
    imageHeight: project.cover.height,
  });
}

export default async function ProjectPage({ params }: Props) {
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

  const breadcrumbJsonLd = projectBreadcrumbJsonLd(project.title, project.slug);
  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: project.cover.alt,
    contentUrl: `${siteConfig.url}${project.cover.src}`,
    width: project.cover.width,
    height: project.cover.height,
    creator: { "@id": `${siteConfig.url}/#person` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }}
      />
      <ProjectView project={project} previous={previous} next={next} />
    </>
  );
}
