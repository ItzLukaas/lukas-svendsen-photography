import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocalAreaView } from "@/components/local/local-area-view";
import {
  getLocalAreaByPath,
  localAreaSlugs,
} from "@/lib/data/local-areas";
import {
  localAreaPageJsonLd,
  pageBreadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";

type Props = PageProps<"/[localSlug]">;

export function generateStaticParams() {
  return localAreaSlugs.map((slug) => ({ localSlug: `fotograf-${slug}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { localSlug } = await params;
  const area = getLocalAreaByPath(localSlug);
  if (!area) return { title: "Side ikke fundet" };

  return pageMetadata({
    title: area.title,
    description: area.metaDescription,
    path: area.path,
  });
}

export default async function LocalAreaPage({ params }: Props) {
  const { localSlug } = await params;
  const area = getLocalAreaByPath(localSlug);
  if (!area) notFound();

  const jsonLd = localAreaPageJsonLd(area);
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: area.headline, path: area.path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LocalAreaView area={area} />
    </>
  );
}

/** Prevent unrelated dynamic slugs from being pre-rendered */
export const dynamicParams = false;
