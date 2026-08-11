import { ConcertSpotlight } from "@/components/home/concert-spotlight";
import { FeaturedWork } from "@/components/home/featured-work";
import { HomeCta } from "@/components/home/home-cta";
import { HomeHero } from "@/components/home/home-hero";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesStrip } from "@/components/home/services-strip";
import { TrustStats } from "@/components/home/trust-stats";
import { ValueSection } from "@/components/home/value-section";
import { getCollaborationsJsonLd } from "@/lib/data/clients";
import { siteConfig } from "@/lib/site";

/**
 * Homepage story:
 * Hero → Work → Services → Concert → Value → Process → Proof → CTA
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
      <ValueSection />
      <ProcessSection />
      <TrustStats />
      <LogoMarquee />
      <HomeCta />
    </>
  );
}
