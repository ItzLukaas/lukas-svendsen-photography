import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySkeleton } from "@/components/ui/GallerySkeleton";
import { featuredPhotos, siteConfig } from "@/data/photos";
import { homeJsonLd } from "@/lib/json-ld";
import { sectionDivider, sectionShell, linkSubtle } from "@/lib/styles";
import { homeMetadata } from "@/lib/seo";

export const metadata: Metadata = homeMetadata();

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
      <ClientsSection />
      <ServicesSection />

      <section className={`${sectionShell} ${sectionDivider}`}>
        <div className="mx-auto max-w-7xl">
          <MasonryGallery photos={featuredPhotos} showTitle />
          <div className="mt-16 text-center">
            <Link href="/portfolio" className={linkSubtle}>
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
    </>
  );
}
