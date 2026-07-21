import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityLandingPage } from "@/components/seo/CityLandingPage";
import {
  getSeoCityBySlug,
  isSeoCitySlug,
  seoCities,
  cityPath,
} from "@/data/seo-cities";
import { notFoundMetadata, pageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seoCities.map((city) => ({ slug: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isSeoCitySlug(slug)) {
    return notFoundMetadata();
  }

  const city = getSeoCityBySlug(slug)!;

  return pageMetadata({
    title: city.title,
    description: city.metaDescription,
    path: cityPath(city),
    keywords: [
      `fotograf ${city.preposition} ${city.name}`,
      `eventfotograf ${city.name}`,
      `sportfotograf ${city.name}`,
      `sportsfotograf ${city.name}`,
      `koncertfotograf ${city.name}`,
      `festivalfotograf ${city.name}`,
      `erhvervsfotograf ${city.name}`,
      `videograf ${city.name}`,
      `dronefoto ${city.name}`,
    ],
  });
}

export default async function SeoCityRoutePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isSeoCitySlug(slug)) {
    notFound();
  }

  const city = getSeoCityBySlug(slug)!;

  return <CityLandingPage city={city} />;
}
