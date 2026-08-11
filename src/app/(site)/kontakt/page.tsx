import type { Metadata } from "next";
import Link from "next/link";

import { ContactCard } from "@/components/contact/contact-card";
import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/motion/fade-in";
import { pageMetadata, simplePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Skriv til Lukas Svendsen. Email, telefon og formular — hurtig respons på spørgsmål om foto, video og booking.",
  path: "/kontakt",
  image: "/images/about.jpg",
  imageAlt: "Portræt af fotograf Lukas Svendsen fra Grindsted",
  imageWidth: 1650,
  imageHeight: 2200,
});

export default function KontaktPage() {
  const jsonLd = simplePageJsonLd({
    path: "/kontakt",
    name: "Kontakt Lukas Svendsen",
    description:
      "Kontakt fotograf Lukas Svendsen i Grindsted via formular, email eller telefon.",
    type: "ContactPage",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-20 md:grid-cols-12 md:gap-16 md:px-8 md:pb-28 lg:px-12">
        <div className="md:col-span-5">
          <FadeIn>
            <p className="label-meta">Kontakt mig</p>
            <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
              Skriv til mig
            </h1>
            <p className="text-body mt-6 max-w-md">
              Spørgsmål, idé eller job — skriv kort, så svarer jeg. Jeg er i
              Grindsted og tager jobs i hele Jylland.
            </p>
            <p className="text-body mt-4 max-w-md">
              Klar til at booke?{" "}
              <Link
                href="/booking"
                className="link-quiet font-medium text-foreground underline underline-offset-4"
              >
                Book mig her
              </Link>
              .
            </p>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-10 max-w-md md:mt-12">
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
