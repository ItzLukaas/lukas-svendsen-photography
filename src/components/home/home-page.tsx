import dynamic from "next/dynamic";

import { BusinessSection } from "@/components/home/business-section";
import { ConcertSpotlight } from "@/components/home/concert-spotlight";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturedWork } from "@/components/home/featured-work";
import { HomeCta } from "@/components/home/home-cta";
import { HomeHero } from "@/components/home/home-hero";
import { MeetLukasSection } from "@/components/home/meet-lukas-section";
import { OfferingsPreview } from "@/components/home/offerings-preview";
import { ProcessSection } from "@/components/home/process-section";
import { getCollaborationsJsonLd } from "@/lib/data/clients";
import { faqItems } from "@/lib/data/faq";
import { homePageJsonLd, introVideoJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const LogoMarquee = dynamic(() =>
  import("@/components/home/logo-marquee").then((mod) => mod.LogoMarquee)
);
const TrustStats = dynamic(() =>
  import("@/components/home/trust-stats").then((mod) => mod.TrustStats)
);

/**
 * Homepage story:
 * Hero → Trust → Offerings → Business → Work → Process → Meet → FAQ → CTA
 */
export function HomePage() {
  const collaborationsJsonLd = getCollaborationsJsonLd(siteConfig.url);
  const homeJsonLd = homePageJsonLd();
  const introJsonLd = introVideoJsonLd();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(introJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HomeHero />
      <TrustStats />
      <LogoMarquee />
      <OfferingsPreview />
      <BusinessSection />
      <FeaturedWork />
      <ConcertSpotlight />
      <ProcessSection />
      <MeetLukasSection />
      <FaqSection />
      <HomeCta />
    </>
  );
}
