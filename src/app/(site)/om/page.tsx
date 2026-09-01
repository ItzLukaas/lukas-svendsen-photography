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
  title: "Om mig",
  description:
    "Lukas Svendsen laver foto, video og content til private og erhverv. Fotograf og videoproducent fra Grindsted med opgaver i hele Danmark.",
  path: "/om",
});

export default function OmPage() {
  const jsonLd = simplePageJsonLd({
    path: "/om",
    name: "Om Lukas Svendsen",
    description:
      "Lukas Svendsen laver foto, video og content til private og erhverv fra Grindsted.",
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
              Foto, video og content · Grindsted
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-9 space-y-5 text-body">
              <p>
                Jeg hedder Lukas Svendsen. Fulde navn Lukas Guldager Svendsen.
                Jeg er 16 år, kommer fra Grindsted og laver foto, video, drone
                og content til private og erhverv.
              </p>
              <p>
                Det kan være en konfirmation, portrætter, virksomhedsvideo,
                produktfoto, et event eller content til SoMe. Ét job eller en
                større produktion. Jeg møder op, holder hovedet koldt og
                leverer materiale, der kan bruges med det samme.
              </p>
              <p>
                Book mig, hvis du har en opgave. Så tager vi den derfra.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-16 border-t border-foreground/10 pt-11">
              <h2 className="label-meta">Mere</h2>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <Link
                    href="/#services"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Hvad jeg laver
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fotograf-grindsted"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Fotograf Grindsted
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fotograf-billund"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Fotograf Billund
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fotograf-vejle"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Fotograf Vejle
                  </Link>
                </li>
                <li>
                  <Link
                    href="/arbejde?kategori=portraetter"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Portrætfoto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/arbejde?kategori=sport"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Sportsfoto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/arbejde?kategori=koncerter"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Koncertfoto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/arbejde"
                    className="font-display text-[1.65rem] leading-none tracking-[-0.02em] transition-opacity duration-300 hover:opacity-55 md:text-[2rem]"
                  >
                    Arbejde
                  </Link>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
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
