import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HomeInternalLinks } from "@/components/seo/HomeInternalLinks";
import { featuredPhotos, siteConfig } from "@/data/photos";
import { homeJsonLd } from "@/lib/json-ld";
import { sectionDivider } from "@/lib/styles";
import { GallerySkeleton } from "@/components/ui/GallerySkeleton";

import { homeMetadata } from "@/lib/seo";

const homeSectionShell =
  "bg-background px-6 py-20 sm:py-24 lg:px-8 lg:py-32";

export const metadata: Metadata = homeMetadata();

/** Færre billeder på forsiden = færre HTTP-requests ved første load */
const HOME_FEATURED_COUNT = 9;

const HomeStatsSection = dynamic(
  () =>
    import("@/components/sections/HomeStatsSection").then((mod) => ({
      default: mod.HomeStatsSection,
    })),
);

const ClientsSection = dynamic(
  () =>
    import("@/components/sections/ClientsSection").then((mod) => ({
      default: mod.ClientsSection,
    })),
);

const MasonryGallery = dynamic(
  () =>
    import("@/components/MasonryGallery").then((mod) => ({
      default: mod.MasonryGallery,
    })),
  { loading: () => <GallerySkeleton /> },
);

const PhotographyTypesSection = dynamic(() =>
  import("@/components/sections/PhotographyTypesSection").then((mod) => ({
    default: mod.PhotographyTypesSection,
  })),
);

const ApproachSection = dynamic(() =>
  import("@/components/sections/ApproachSection").then((mod) => ({
    default: mod.ApproachSection,
  })),
);

const ProcessSection = dynamic(() =>
  import("@/components/sections/ProcessSection").then((mod) => ({
    default: mod.ProcessSection,
  })),
);

const TestimonialsSection = dynamic(() =>
  import("@/components/sections/TestimonialsSection").then((mod) => ({
    default: mod.TestimonialsSection,
  })),
);

const InquirySection = dynamic(() =>
  import("@/components/sections/InquirySection").then((mod) => ({
    default: mod.InquirySection,
  })),
);

function HomeJsonLd() {
  return <JsonLd data={homeJsonLd()} />;
}

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <HomeStatsSection />
      <ClientsSection />
      <ServicesSection compact />

      <section className={`${homeSectionShell} ${sectionDivider}`}>
        <div className="mx-auto max-w-7xl">
          <MasonryGallery photos={featuredPhotos.slice(0, HOME_FEATURED_COUNT)} showTitle />
          <div className="mt-12 text-center">
            <Link
              href="/portfolio"
              className="group inline-flex min-h-9 items-center gap-2 text-[10px] tracking-[0.2em] text-muted uppercase transition-colors duration-500 ease-premium hover:text-foreground"
            >
              Se hele porteføljen
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <PhotographyTypesSection />
      <ApproachSection />
      <ProcessSection />
      {siteConfig.showTestimonials && <TestimonialsSection />}
      <InquirySection />
      <HomeInternalLinks />
    </>
  );
}
