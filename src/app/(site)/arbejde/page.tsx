import type { Metadata } from "next";

import { WorkIndex } from "@/components/work/work-index";
import { fetchProjects } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";

const arbejdeMetadata = pageMetadata({
  title: "Arbejde",
  description:
    "Udvalgte foto- og videoprojekter fra Lukas Svendsen. Fotograf og videoproducent.",
  path: "/arbejde",
});

export async function generateMetadata(): Promise<Metadata> {
  // Filter URLs share one canonical — avoids duplicate content for ?kategori=
  return arbejdeMetadata;
}

type Props = PageProps<"/arbejde">;

export default async function ArbejdePage({ searchParams }: Props) {
  const params = await searchParams;
  const kategori =
    typeof params.kategori === "string" && params.kategori
      ? params.kategori
      : "alle";

  const projects = await fetchProjects();
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
