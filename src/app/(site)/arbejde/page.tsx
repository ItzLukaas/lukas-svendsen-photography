import type { Metadata } from "next";
import { Suspense } from "react";

import { WorkIndex } from "@/components/work/work-index";
import { fetchProjects } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio — Fotograf i Grindsted",
  description:
    "Se portfolio med festival-, koncert-, sport- og eventfotografi fra Lukas Svendsen i Grindsted — også opgaver i Billund, Esbjerg, Vejle og hele Jylland.",
  path: "/arbejde",
  image: "/images/festival.jpg",
  imageAlt:
    "Festivalfotografi af fotograf Lukas Svendsen fra Grindsted",
});

export default async function ArbejdePage() {
  const projects = await fetchProjects();
  const jsonLd = collectionPageJsonLd(projects);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1600px] px-5 pt-36 text-muted-ink md:px-8 lg:px-12">
            Henter arbejde…
          </div>
        }
      >
        <WorkIndex projects={projects} />
      </Suspense>
    </>
  );
}
