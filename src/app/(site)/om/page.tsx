import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { aboutPortrait } from "@/lib/data/projects";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Om Lukas Svendsen | Fotograf og videograf",
  description:
    "Lukas Svendsen er fotograf og videograf med fokus på foto, video, content og drone til virksomheder, organisationer og private i Grindsted, Billund, Vejle, Esbjerg og resten af Danmark.",
  path: "/om",
});

export default function OmPage() {
  const jsonLd = simplePageJsonLd({
    path: "/om",
    name: "Om Lukas Svendsen",
    description:
      "Lukas Svendsen er fotograf og videoproducent med fokus på foto, video, drone og content til forskellige kunder og opgaver.",
    type: "AboutPage",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: "Om mig", path: "/om" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="pt-[calc(var(--chrome-h)+2.5rem)]">
      <section className="mx-auto grid max-w-[1600px] items-start gap-10 px-5 pb-16 md:grid-cols-12 md:gap-14 md:px-8 md:pb-24 lg:px-12">
        <FadeIn className="md:col-span-5 md:sticky md:top-[calc(var(--chrome-h)+1.25rem)]">
          <Photo
            src={aboutPortrait.src}
            alt={aboutPortrait.alt}
            width={aboutPortrait.width}
            height={aboutPortrait.height}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full"
            priority
            quality={90}
          />
        </FadeIn>

        <div className="md:col-span-6 md:col-start-7">
          <FadeIn>
            <p className="label-meta">Om mig</p>
            <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
              Lukas Svendsen
            </h1>
            <p className="mt-4 text-[0.9375rem] text-muted-ink">
              Fotograf og videoproducent
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-9 space-y-5 text-body">
              <p>
                Jeg hedder Lukas Guldager Svendsen. Jeg er 16 år og arbejder som
                fotograf og videoproducent med foto, video, drone og content.
              </p>
              <p>
                Jeg startede med at tage det seriøst i slutningen af 2025, og
                siden har jeg brugt en stor del af min fritid på at udvikle mig,
                investere i mit udstyr og bygge LukasSvendsen.dk op. I dag
                arbejder jeg med virksomheder, organisationer, sport, events,
                koncerter og private, hvor jeg både fotograferer, filmer og
                producerer indhold til blandt andet hjemmesider og sociale
                medier.
              </p>
              <p>
                For mig handler det ikke kun om at få et kamera i hånden og
                trykke på optage. Jeg vil gerne forstå, hvad materialet skal
                bruges til, hvem det skal ramme, og hvordan det bedst kan fortælle
                det, du gerne vil vise. Derfor går jeg til hver opgave med både
                det kreative og det praktiske i tankerne.
              </p>
              <p>
                Jeg er stadig i starten, men jeg har store ambitioner og har ikke
                tænkt mig at stå stille. Jeg lærer hele tiden nyt, prøver nye
                ting og investerer løbende i at blive bedre.
              </p>
              <p>
                Har du en idé, en opgave eller bare noget, du gerne vil have
                sparring på, så tag endelig fat i mig.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/booking" className="btn-solid bg-ink text-paper">
                Book mig
              </Link>
              <Link href="/kontakt" className="btn-ghost">
                Kontakt mig
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
    </>
  );
}
