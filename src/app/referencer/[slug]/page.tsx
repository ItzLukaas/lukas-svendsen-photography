import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReferenceTemplate } from "@/components/references/ReferenceTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getReferenceBySlug,
  references,
} from "@/data/references";
import {
  breadcrumbJsonLd,
  referenceArticleJsonLd,
  absoluteAssetUrl,
} from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return references.map((ref) => ({ slug: ref.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const reference = getReferenceBySlug(slug);

  if (!reference) {
    return { title: "Reference ikke fundet", robots: { index: false, follow: false } };
  }

  const path = `/referencer/${reference.slug}`;

  return pageMetadata({
    title: reference.title,
    description: reference.metaDescription,
    path,
    type: "article",
    ogImage: absoluteAssetUrl(reference.coverImage.src),
    ogImageWidth: reference.coverImage.width,
    ogImageHeight: reference.coverImage.height,
    keywords: [
      reference.title,
      "fotograf reference",
      reference.location,
      ...reference.tags,
      "Lukas Svendsen",
    ],
  });
}

export default async function ReferencePage({ params }: PageProps) {
  const { slug } = await params;
  const reference = getReferenceBySlug(slug);

  if (!reference) {
    notFound();
  }

  const path = `/referencer/${reference.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Forside", path: "/" },
          { name: "Referencer", path: "/referencer" },
          { name: reference.title, path },
        ])}
      />
      <JsonLd
        data={referenceArticleJsonLd({
          title: reference.title,
          description: reference.metaDescription,
          path,
          coverImage: reference.coverImage,
        })}
      />
      <div className="min-h-screen bg-[#0a0a0a]">
        <ReferenceTemplate reference={reference} />
      </div>
    </>
  );
}
