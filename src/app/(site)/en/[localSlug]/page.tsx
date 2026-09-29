import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocalAreaView } from "@/components/local/local-area-view";
import {
  getLocalAreaByPath,
  localAreaSlugs,
} from "@/lib/data/local-areas";
import { localizeLocalArea } from "@/lib/data/local-areas-i18n";
import {
  localAreaPageJsonLd,
  pageBreadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";

type Props = {
  params: Promise<{ localSlug: string }>;
};

export function generateStaticParams() {
  return localAreaSlugs.map((slug) => ({ localSlug: `fotograf-${slug}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { localSlug } = await params;
  const base = getLocalAreaByPath(localSlug);
  if (!base) return { title: "Page not found" };

  const area = localizeLocalArea(base, "en");

  return pageMetadata({
    title: area.title,
    description: area.metaDescription,
    path: area.path,
    locale: "en",
  });
}

export default async function EnglishLocalAreaPage({ params }: Props) {
  const { localSlug } = await params;
  const base = getLocalAreaByPath(localSlug);
  if (!base) notFound();

  const area = localizeLocalArea(base, "en");
  const jsonLd = localAreaPageJsonLd(area, "en");
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Home", path: "/en" },
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
      <LocalAreaView area={base} />
    </>
  );
}

export const dynamicParams = false;
