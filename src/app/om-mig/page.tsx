import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
                  Jeg er en 16-årig fotograf med passion for at skabe visuelt indhold, der fortæller
                  en historie. Jeg elsker at fange de små detaljer og de ægte øjeblikke, som gør hvert
                  billede unikt — og mit mål er at skabe materiale, folk har lyst til at gemme og se
                  tilbage på i mange år.
                </p>
                <p className={`${sectionBody} text-white/60`}>
                  Jeg arbejder med fotografering, videoproduktion og droneflyvning — til private
                  fester, sport, events, koncerter og virksomheder. Uanset om det er stillbilleder,
                  levende video eller unikke luftperspektiver, går jeg altid efter det samme: kvalitet,
                  kreativitet og historier, der mærkes.
                </p>
                <p className={`${sectionBody} text-white/60`}>
                  Med drone kan jeg levere både foto og video fra luften — perfekt til events, sport,
                  erhverv og locations, hvor perspektivet gør en forskel. Alt samles under ét tag, så du
                  får et sammenhængende visuelt udtryk fra første brief til færdigt materiale.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="mt-14 flex flex-wrap gap-10 sm:gap-12">
                <div>
                  <p className="font-display text-2xl font-light text-white">16</p>
                  <p className="mt-1.5 text-xs tracking-widest text-white/40 uppercase">
                    År gammel
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-light text-white">500+</p>
                  <p className="mt-1.5 text-xs tracking-widest text-white/40 uppercase">
                    Billeder hver måned
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-light text-white">Hjerte</p>
                  <p className="mt-1.5 text-xs tracking-widest text-white/40 uppercase">
                    I hvert billede
                  </p>
                </div>
              </div>
            </ScrollReveal>

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
