import type { Metadata } from "next";

import { WorkIndex } from "@/components/work/work-index";
import { fetchProjects } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";

const arbejdeMetadata = pageMetadata({
  title: "Portfolio — sport, koncert og events",
  description:
    "Portfolio med koncert-, sports- og eventfotografi fra Lukas Svendsen — fotograf med base i Grindsted og opgaver i hele Danmark.",
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
