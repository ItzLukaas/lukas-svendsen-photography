import dynamic from "next/dynamic";

import { ConcertSpotlight } from "@/components/home/concert-spotlight";
import { FeaturedWork } from "@/components/home/featured-work";
import { HomeAboutPreview } from "@/components/home/home-about-preview";
import { HomeCta } from "@/components/home/home-cta";
import { HomeHero } from "@/components/home/home-hero";
import { ProcessSection } from "@/components/home/process-section";
import { getCollaborationsJsonLd } from "@/lib/data/clients";
import { homePageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const LogoMarquee = dynamic(() =>
  import("@/components/home/logo-marquee").then((mod) => mod.LogoMarquee)
);
const TrustStats = dynamic(() =>
  import("@/components/home/trust-stats").then((mod) => mod.TrustStats)
);

/**
 * Homepage story:
 * Hero → Work → Portfolio spotlight → Process → Proof → About → CTA
 */
export function HomePage() {
  const collaborationsJsonLd = getCollaborationsJsonLd(siteConfig.url);
  const homeJsonLd = homePageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collaborationsJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <HomeHero />
      <FeaturedWork />
      <ConcertSpotlight />
      <ProcessSection />
      <TrustStats />
      <LogoMarquee />
      <HomeAboutPreview />
      <HomeCta />
    </>
  );
}
