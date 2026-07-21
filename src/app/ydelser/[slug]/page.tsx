import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DronePage } from "@/components/seo/DronePage";
import { FotograferingPage } from "@/components/seo/FotograferingPage";
import { VideoproduktionPage } from "@/components/seo/VideoproduktionPage";
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
    keywords:
      service.slug === "fotografering"
        ? [
            "fotograf",
            "eventfotograf",
            "sportfotograf",
            "sportsfotograf",
            "koncertfotograf",
            "festivalfotograf",
            "erhvervsfotograf",
            "fotografering",
            "Lukas Svendsen",
          ]
        : [service.name, "fotograf", "videograf", "Lukas Svendsen"],
  });
}

export default async function YdelsePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getSeoServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Forside", path: "/" },
    { name: "Ydelser", path: "/ydelser" },
    { name: service.name, path: `/ydelser/${service.slug}` },
  ];

  if (service.slug === "fotografering") {
    return <FotograferingPage service={service} breadcrumbs={breadcrumbs} />;
  }

  if (service.slug === "videoproduktion") {
    return <VideoproduktionPage service={service} breadcrumbs={breadcrumbs} />;
  }

  if (service.slug === "drone") {
    return <DronePage service={service} breadcrumbs={breadcrumbs} />;
  }

  notFound();
}
