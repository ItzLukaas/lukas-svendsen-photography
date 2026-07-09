import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingTemplate } from "@/components/seo/SeoLandingTemplate";
import { getSeoServiceBySlug, seoServices } from "@/data/seo-services";
import { pageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seoServices.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getSeoServiceBySlug(slug);

  if (!service) {
    return { title: "Side ikke fundet", robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/ydelser/${service.slug}`,
    keywords: [service.name, "fotograf", "videograf", "Lukas Svendsen"],
  });
}

export default async function YdelsePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getSeoServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedLinks = seoServices
    .filter((item) => item.slug !== service.slug)
    .slice(0, 4)
    .map((item) => ({
      href: `/ydelser/${item.slug}`,
      label: item.name,
    }));

  return (
    <SeoLandingTemplate
      breadcrumbs={[
        { name: "Forside", path: "/" },
        { name: "Ydelser", path: "/ydelser" },
        { name: service.name, path: `/ydelser/${service.slug}` },
      ]}
      label="Ydelser"
      h1={service.h1}
      intro={service.intro}
      paragraphs={service.paragraphs}
      highlights={service.benefits}
      faqs={service.faqs}
      relatedLinks={relatedLinks}
      path={`/ydelser/${service.slug}`}
      metaDescription={service.metaDescription}
      pageTitle={service.title}
    />
  );
}
