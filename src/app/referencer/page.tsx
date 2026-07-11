import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ReferenceCard } from "@/components/references/ReferenceCard";
import { references, referencesPageMeta } from "@/data/references";
import { siteConfig } from "@/data/photos";
import { absoluteAssetUrl } from "@/lib/json-ld";
import { sectionBody, sectionLabel } from "@/lib/styles";
import { pageMetadata } from "@/lib/seo";

const referenceOrder = [
  "kif-kolding",
  "fredericia-handboldklub",
  "esbjerg-streetfood",
] as const;

const referenceOrderMap = new Map(referenceOrder.map((slug, index) => [slug, index]));
const orderedReferences = [...references].sort(
  (a, b) =>
    (referenceOrderMap.get(a.slug as (typeof referenceOrder)[number]) ?? Number.MAX_SAFE_INTEGER) -
    (referenceOrderMap.get(b.slug as (typeof referenceOrder)[number]) ?? Number.MAX_SAFE_INTEGER),
);

export const metadata: Metadata = {
  ...pageMetadata({
    title: referencesPageMeta.title,
    description: referencesPageMeta.description,
    path: "/referencer",
    keywords: [
      "fotograf referencer",
      "sportsfotografi",
      "content creation",
      "virksomhedsfotografi",
      "Lukas Svendsen",
    ],
  }),
};

function ReferencesJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: referencesPageMeta.heroTitle,
    description: referencesPageMeta.heroDescription,
    url: `${siteConfig.url}/referencer`,
    numberOfItems: orderedReferences.length,
    itemListElement: orderedReferences.map((ref, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: ref.title,
        description: ref.metaDescription,
        url: `${siteConfig.url}/referencer/${ref.slug}`,
        image: absoluteAssetUrl(ref.coverImage.src),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ReferencerPage() {
  return (
    <>
      <ReferencesJsonLd />
      <div className="min-h-screen bg-background">
        <section className="px-6 pt-36 pb-20 lg:px-8 lg:pt-44 lg:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <Breadcrumbs
              items={[
                { name: "Forside", path: "/" },
                { name: "Referencer", path: "/referencer" },
              ]}
            />
            <ScrollReveal>
              <p className={sectionLabel}>Projekter</p>
              <AnimatedHeading
                as="h1"
                className="font-display text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl"
              >
                {referencesPageMeta.heroTitle}
              </AnimatedHeading>
              <p className={`mx-auto mt-8 max-w-2xl ${sectionBody}`}>
                {referencesPageMeta.heroDescription}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-foreground/5 px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-3 lg:gap-10">
            {orderedReferences.map((reference, index) => (
              <ReferenceCard
                key={reference.slug}
                reference={reference}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
