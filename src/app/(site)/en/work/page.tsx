import type { Metadata } from "next";

import { WorkIndex } from "@/components/work/work-index";
import { fetchProjects } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo-copy";

const seo = getPageSeo("en");

export const metadata: Metadata = pageMetadata({
  title: seo.arbejde.title,
  description: seo.arbejde.description,
  path: "/en/work",
  locale: "en",
});

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EnglishWorkPage({ searchParams }: Props) {
  const params = await searchParams;
  const kategori =
    typeof params.kategori === "string" && params.kategori
      ? params.kategori
      : "alle";

  const projects = await fetchProjects();
  const jsonLd = collectionPageJsonLd(projects, "en");

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
