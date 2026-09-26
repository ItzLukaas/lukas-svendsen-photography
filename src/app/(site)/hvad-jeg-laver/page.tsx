import type { Metadata } from "next";
import Link from "next/link";

import { FaqSection } from "@/components/home/faq-section";
import { FadeIn } from "@/components/motion/fade-in";
import {
  businessAudiencePoints,
  businessOfferingsIntro,
  offerings,
  offeringsIntro,
  privateOfferingsIntro,
} from "@/lib/data/offerings";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { pageSeo } from "@/lib/seo-copy";

export const metadata: Metadata = pageMetadata({
  title: pageSeo.hvadJegLaver.title,
  description: pageSeo.hvadJegLaver.description,
  path: "/hvad-jeg-laver",
});

export default function HvadJegLaverPage() {
  const jsonLd = simplePageJsonLd({
    path: "/hvad-jeg-laver",
    name: "Hvad jeg laver",
    description: pageSeo.hvadJegLaver.description,
    type: "WebPage",
    mainEntityId: "service",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: "Hvad jeg laver", path: "/hvad-jeg-laver" },
  ]);

  const business = offerings.filter((item) => item.audience !== "private");
  const privateOffer = offerings.find((item) => item.audience === "private");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className="pt-[calc(var(--chrome-h)+2.5rem)]">
        <section className="mx-auto max-w-[1600px] px-5 pb-12 md:px-8 md:pb-16 lg:px-12">
          <FadeIn>
            <nav
              aria-label="Brødkrumme"
              className="text-[0.75rem] tracking-[0.02em] text-muted-ink"
            >
              <ol className="m-0 flex list-none flex-wrap items-baseline gap-x-0 gap-y-1 p-0">
                <li className="after:mx-3 after:opacity-25 after:content-['/']">
                  <Link
                    href="/"
                    className="transition-opacity duration-300 hover:opacity-55"
                  >
                    Forside
                  </Link>
                </li>
                <li className="text-ink/70" aria-current="page">
                  Hvad jeg laver
                </li>
              </ol>
            </nav>

            <p className="label-meta mt-8">{offeringsIntro.eyebrow}</p>
            <h1 className="mt-3 max-w-[14ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
              {offeringsIntro.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-muted-ink md:text-[1.0625rem]">
              {offeringsIntro.body}
            </p>
          </FadeIn>
        </section>

        <section
          id="virksomheder"
          aria-labelledby="business-offerings-heading"
          className="scroll-mt-[calc(var(--chrome-h)+1rem)] border-t border-foreground/8"
        >
          <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section-sm)] md:px-8 lg:px-12">
            <FadeIn>
              <p className="label-meta">{businessOfferingsIntro.eyebrow}</p>
              <h2
                id="business-offerings-heading"
                className="heading-strip mt-3 max-w-[18ch] font-display"
              >
                {businessOfferingsIntro.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-muted-ink md:text-[1.0625rem]">
                {businessOfferingsIntro.body}
              </p>
            </FadeIn>

            <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
              <ul className="m-0 list-none space-y-10 p-0 md:col-span-7">
                {business.map((item, index) => (
                  <li key={item.id}>
                    <FadeIn delay={Math.min(0.04 + index * 0.04, 0.16)}>
                      <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted-ink">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-display text-[1.35rem] leading-[1.15] tracking-[-0.025em] md:text-[1.5rem]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-muted-ink">
                        {item.summary}
                      </p>
                    </FadeIn>
                  </li>
                ))}
              </ul>

              <FadeIn delay={0.08} className="md:col-span-4 md:col-start-9">
                <div className="border-t border-foreground/10 pt-5">
                  <p className="label-meta">Typiske opgaver</p>
                  <ul className="mt-4 m-0 list-none space-y-0 p-0">
                    {businessAudiencePoints.map((point) => (
                      <li
                        key={point}
                        className="border-b border-foreground/8 py-3 text-[0.875rem] leading-[1.5] text-ink last:border-0"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link href="/booking" className="btn-solid mt-7">
                    Start en opgave
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {privateOffer ? (
          <section
            id="privat"
            aria-labelledby="private-offerings-heading"
            className="scroll-mt-[calc(var(--chrome-h)+1rem)] border-t border-foreground/8"
          >
            <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section-sm)] md:px-8 lg:px-12">
              <FadeIn>
                <p className="label-meta">{privateOfferingsIntro.eyebrow}</p>
                <h2
                  id="private-offerings-heading"
                  className="heading-strip mt-3 font-display"
                >
                  {privateOffer.title}
                </h2>
                <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.7] text-muted-ink md:text-[1.0625rem]">
                  {privateOffer.summary}
                </p>
                <div
                  className="mt-6 h-px w-12 bg-foreground/15"
                  aria-hidden
                />
                <p className="mt-6">
                  <Link href="/booking" className="btn-ghost">
                    Book en privat opgave
                  </Link>
                </p>
              </FadeIn>
            </div>
          </section>
        ) : null}

        <FaqSection />

        <section className="border-t border-foreground/8">
          <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section-sm)] md:px-8 lg:px-12">
            <FadeIn>
              <p className="label-meta">Næste skridt</p>
              <h2 className="heading-strip mt-3 font-display">
                Klar til at snakke om din opgave?
              </h2>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.65] text-muted-ink">
                Fortæl kort, hvad du skal bruge — så finder vi ud af resten.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/booking" className="btn-solid">
                  Book mig
                </Link>
                <Link href="/kontakt" className="btn-ghost">
                  Kontakt
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}
