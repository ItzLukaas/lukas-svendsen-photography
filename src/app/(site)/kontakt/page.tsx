import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakt fotograf Lukas Svendsen i Grindsted. Spørgsmål om koncert-, event- eller virksomhedsfotografi i Esbjerg, Vejle, Billund, Kolding og hele Jylland.",
  path: "/kontakt",
  image: "/images/about.jpg",
  imageAlt: "Portræt af fotograf Lukas Svendsen fra Grindsted",
  imageWidth: 1650,
  imageHeight: 2200,
});

export default function KontaktPage() {
  return (
    <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pt-24 pb-20 md:grid-cols-12 md:gap-16 md:px-8 md:pt-28 md:pb-28 lg:px-12">
      <FadeIn className="md:col-span-5">
        <p className="label-meta">Kontakt mig</p>
        <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
          Lad os snakke.
        </h1>
        <p className="text-body mt-6 max-w-md">
          Har du et spørgsmål, en idé eller bare lyst til at høre, om jeg kan
          hjælpe — uanset om opgaven er i Esbjerg, Vejle eller resten af
          Jylland? Skriv kort — jeg vender tilbage.
        </p>
        <p className="text-body mt-4 max-w-md">
          Er du klar til at booke en produktion? Gå til{" "}
          <Link
            href="/booking"
            className="link-quiet font-medium text-foreground underline underline-offset-4"
          >
            Booking
          </Link>
          .
        </p>
        <div className="mt-11 space-y-2.5 text-[0.9375rem] font-medium">
          <p>
            <a href={`mailto:${siteConfig.email}`} className="link-quiet">
              {siteConfig.email}
            </a>
          </p>
          {siteConfig.phoneDisplay ? (
            <p>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="link-quiet"
              >
                {siteConfig.phoneDisplay}
              </a>
            </p>
          ) : null}
          <p className="text-[0.8125rem] font-normal text-muted-ink">
            Grindsted · Jylland
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.06} className="md:col-span-6 md:col-start-7">
        <ContactForm />
      </FadeIn>
    </div>
  );
}
