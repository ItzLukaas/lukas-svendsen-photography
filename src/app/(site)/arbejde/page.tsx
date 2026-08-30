import type { Metadata } from "next";

import { WorkIndex } from "@/components/work/work-index";
import { fetchProjects } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio — koncertfotograf, sportsfotograf og events",
  description:
    "Portfolio med koncertfotografi, sportsfotografi og eventfoto fra Lukas Svendsen — fotograf i Grindsted. Festival, håndbold, koncerter og events i Billund, Esbjerg, Vejle og Jylland.",
  path: "/arbejde",
});

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
