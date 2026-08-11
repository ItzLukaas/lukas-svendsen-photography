import type { Metadata } from "next";

import { WorkIndex } from "@/components/work/work-index";
import { fetchProjects } from "@/lib/content";
import { sortProjectsPortraitFirst } from "@/lib/data/projects";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio — Festival, sport & events",
  description:
    "Portfolio fra Lukas Svendsen — festival, koncert, sport og event. Fra Grindsted og ud i Jylland.",
  path: "/arbejde",
});

type Props = PageProps<"/arbejde">;

export default async function ArbejdePage({ searchParams }: Props) {
  const params = await searchParams;
  const kategori =
    typeof params.kategori === "string" && params.kategori
      ? params.kategori
      : "alle";

  const projects = sortProjectsPortraitFirst(await fetchProjects());
  const jsonLd = collectionPageJsonLd(projects);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkIndex projects={projects} initialKategori={kategori} />
    </>
  );
}
