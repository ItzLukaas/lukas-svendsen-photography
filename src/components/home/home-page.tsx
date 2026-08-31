import dynamic from "next/dynamic";

import { ConcertSpotlight } from "@/components/home/concert-spotlight";
import { FeaturedWork } from "@/components/home/featured-work";
import { HomeCta } from "@/components/home/home-cta";
import { HomeHero } from "@/components/home/home-hero";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesStrip } from "@/components/home/services-strip";
import { getCollaborationsJsonLd } from "@/lib/data/clients";
import { siteConfig } from "@/lib/site";

const TrustStats = dynamic(() =>
  import("@/components/home/trust-stats").then((mod) => mod.TrustStats)
);
const LogoMarquee = dynamic(() =>
  import("@/components/home/logo-marquee").then((mod) => mod.LogoMarquee)
);

/**
 * Homepage story:
 * Hero → Work → Services → Concert → Process → Proof → CTA
 */
export function HomePage() {
  const collaborationsJsonLd = getCollaborationsJsonLd(siteConfig.url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collaborationsJsonLd),
        }}
      />

      <HomeHero />
      <FeaturedWork />
      <ServicesStrip />
      <ConcertSpotlight />
      <ProcessSection />
      <TrustStats />
      <LogoMarquee />
      <HomeCta />
    </>
  );
}
