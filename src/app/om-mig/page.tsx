import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutStats } from "@/components/sections/AboutStats";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { webPageJsonLd } from "@/lib/json-ld";
import { btnPrimary, sectionBody, sectionLabel, sectionTitle } from "@/lib/styles";
import { IMAGE_QUALITY } from "@/lib/image";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Om mig",
  description:
    "Lær Lukas Svendsen at kende — 16-årig fotograf, videograf og dronepilot. Fotografering, videoproduktion og droneflyvning til private, sport, events og erhverv.",
  path: "/om-mig",
  keywords: [
    "om mig",
    "fotograf",
    "videograf",
    "dronepilot",
    "Lukas Svendsen",
    "fotografering",
    "videoproduktion",
    "droneflyvning",
  ],
});

export default function OmMigPage() {
  const description =
    "Lær Lukas Svendsen at kende — 16-årig fotograf, videograf og dronepilot. Fotografering, videoproduktion og droneflyvning til private, sport, events og erhverv.";

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: "Om mig",
          description,
          path: "/om-mig",
        })}
      />
      <div className="min-h-screen bg-[#0a0a0a] pt-28">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <Breadcrumbs
          items={[
            { name: "Forside", path: "/" },
            { name: "Om mig", path: "/om-mig" },
          ]}
        />
        <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-28">
          <ScrollReveal direction="left">
            <div className="mx-auto w-full max-w-sm lg:max-w-md lg:mx-0">
              <div className="border border-white/15 p-2.5 sm:p-3">
                <div className="group relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
                  <OptimizedImage
                    src="/images/IMG_3454.webp"
                    alt="Portræt af fotograf Lukas Svendsen — fotograf, videograf og dronepilot"
                    fill
                    priority
                    quality={IMAGE_QUALITY.hero}
                    className="object-cover object-[50%_15%] transition-transform duration-700 ease-premium group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 80vw, 400px"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <p className={sectionLabel}>Om mig</p>
              <h1 className={sectionTitle}>Hej, jeg er Lukas</h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="mt-8 space-y-6">
                <p className={`${sectionBody} text-white/60`}>
                  Jeg er 16 år og brænder for fotografering og videoproduktion. Jeg elsker at fange de
                  små detaljer og de ægte øjeblikke, der gør hvert billede unikt — og mit mål er at
                  lave materiale, du har lyst til at gemme og se igen om mange år.
                </p>
                <p className={`${sectionBody} text-white/60`}>
                  Jeg tilbyder fotografering, videoproduktion og droneflyvning — til private fester,
                  sport, events, koncerter og virksomheder. Uanset om det er fotografering, videoproduktion eller
                  droneflyvning, går jeg altid efter det samme: god kvalitet og billeder, der føles
                  rigtige.
                </p>
                <p className={`${sectionBody} text-white/60`}>
                  Med droneflyvning kan jeg levere både luftfoto og luftvideo — godt til events, sport,
                  erhverv og locations, hvor perspektivet gør en forskel. Det hele kan samles i én
                  produktion, så du får et ensartet resultat.
                </p>
              </div>
            </ScrollReveal>

            <AboutStats />

            <ScrollReveal delay={0.35}>
              <Link href="/kontakt" className={`mt-14 ${btnPrimary}`}>
                Kontakt mig
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
