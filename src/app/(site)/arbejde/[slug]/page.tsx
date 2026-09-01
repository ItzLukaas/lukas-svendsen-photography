import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectView } from "@/components/work/project-view";
import { fetchProject, fetchProjects } from "@/lib/content";
import {
  type Project,
} from "@/lib/data/projects";
import {
  pageMetadata,
  projectBreadcrumbJsonLd,
  projectCreativeWorkJsonLd,
  shareImageFromCover,
} from "@/lib/seo";

type Props = PageProps<"/arbejde/[slug]">;

function projectPageTitle(project: Project) {
  const disciplineLabel: Record<Project["discipline"], string> = {
    koncerter: "koncertfotografi",
    sport: "sportsfotografi",
    events: "eventfotografi",
    erhverv: "erhvervsfoto",
    portraetter: "portrætfotografi",
  };
  const kind = disciplineLabel[project.discipline] ?? "fotografi";
  return `${project.title} · ${kind} ${project.year}`;
}

function projectDescription(project: Project) {
  const disciplineSeo: Partial<Record<Project["discipline"], string>> = {
    koncerter: "Foto fra liveoptræden",
    sport: "Foto fra kamp",
    events: "Foto fra arrangement",
    erhverv: "Visuelt materiale",
    portraetter: "Portrætfoto",
  };
  const seoLead = disciplineSeo[project.discipline] ?? "Foto";
  const location = project.location ? ` · ${project.location}` : "";
  const client = project.client ? ` ${project.client}.` : "";
  return `${seoLead}: ${project.excerpt}${location}.${client}`.replace(
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
    title: projectPageTitle(project),
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
