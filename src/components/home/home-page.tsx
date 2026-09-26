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
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { homePageJsonLd, introVideoJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const LogoMarquee = dynamic(() =>
  import("@/components/home/logo-marquee").then((mod) => mod.LogoMarquee)
);
const TrustStats = dynamic(() =>
  import("@/components/home/trust-stats").then((mod) => mod.TrustStats)
);

const faqOrder = [
  "what",
  "pricing",
  "areas",
  "brief",
  "delivery",
  "booking",
] as const;

type HomePageProps = {
  locale?: Locale;
};

/**
 * Homepage story:
 * Hero → Trust → Offerings → Business → Work → Process → Meet (DA) → FAQ → CTA
 */
export async function HomePage({ locale: localeProp }: HomePageProps = {}) {
  const locale = localeProp ?? (await getRequestLocale());
  const dict = await getDictionary(locale);
  const isDanish = locale === "da";
  const collaborationsJsonLd = getCollaborationsJsonLd(siteConfig.url);
  const homeJsonLd = homePageJsonLd(locale);
  const introJsonLd = isDanish ? introVideoJsonLd() : null;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqOrder.map((id) => ({
      "@type": "Question",
      name: dict.faq.items[id].question,
      acceptedAnswer: {
        "@type": "Answer",
        text: dict.faq.items[id].answer,
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
      {introJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(introJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HomeHero locale={locale} />
      <TrustStats />
      <LogoMarquee />
      <OfferingsPreview />
      <BusinessSection />
      <FeaturedWork />
      <ConcertSpotlight />
      <ProcessSection />
      {isDanish ? <MeetLukasSection /> : null}
      <FaqSection />
      <HomeCta />
    </>
  );
}
