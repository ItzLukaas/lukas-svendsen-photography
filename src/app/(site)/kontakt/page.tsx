import type { Metadata } from "next";
import Link from "next/link";

import { ContactCard } from "@/components/contact/contact-card";
import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/motion/fade-in";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakt Lukas Svendsen for foto, video og content. Email, telefon og kontaktformular.",
  path: "/kontakt",
});

export default function KontaktPage() {
  const jsonLd = simplePageJsonLd({
    path: "/kontakt",
    name: "Kontakt Lukas Svendsen",
    description:
      "Kontakt Lukas Svendsen for foto, video, drone og content.",
    type: "ContactPage",
    mainEntityId: "service",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: "Kontakt", path: "/kontakt" },
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
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-20 md:grid-cols-12 md:gap-16 md:px-8 md:pb-28 lg:px-12">
        <div className="md:col-span-5">
          <FadeIn>
            <p className="label-meta">Kontakt mig</p>
            <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
              Skriv til mig
            </h1>
            <p className="text-body mt-6 max-w-md">
              Har du et spørgsmål, en idé eller en opgave? Skriv kort, så vender
              jeg tilbage. Uanset om du er privatperson, virksomhed eller
              organisation.
            </p>
            <p className="text-body mt-4 max-w-md">
              Klar til at booke?{" "}
              <Link
                href="/booking"
                className="link-quiet font-medium text-foreground underline underline-offset-4"
              >
                Book mig
              </Link>
              .
            </p>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-8 md:mt-10">
            <ContactCard />
          </FadeIn>
        </div>

        <FadeIn delay={0.06} className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </FadeIn>
      </div>
    </>
  );
}
