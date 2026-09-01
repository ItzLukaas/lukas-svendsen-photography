import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { BookingForm } from "@/components/booking/booking-form";
import { FadeIn } from "@/components/motion/fade-in";
import {
  pageBreadcrumbJsonLd,
  pageMetadata,
  simplePageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book foto, video og content",
  description:
    "Book Lukas Svendsen til foto, video, drone og content. Svar inden for 1 til 2 hverdage.",
  path: "/booking",
});

export default function BookingPage() {
  const jsonLd = simplePageJsonLd({
    path: "/booking",
    name: "Book Lukas Svendsen",
    description:
      "Booking af foto, video, drone og content til forskellige opgaver og behov.",
    type: "WebPage",
    mainEntityId: "service",
  });
  const breadcrumbJsonLd = pageBreadcrumbJsonLd([
    { name: "Forside", path: "/" },
    { name: "Book mig", path: "/booking" },
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
      <div className="mx-auto max-w-[1600px] px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-20 md:px-8 md:pb-28 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14 lg:gap-16">
          <FadeIn className="md:col-span-5 lg:col-span-4">
            <p className="label-meta">Book mig</p>
            <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.45rem,5.5vw,4.25rem)] leading-[0.92] tracking-[-0.03em]">
              Hvad skal du bruge?
            </h1>
            <p className="text-body mt-5 max-w-md">
              Uanset om du skal bruge foto, video, drone eller content, kan du
              skrive kort hvad, hvornår og hvor. Så svarer jeg inden for 1 til 2
              hverdage, og vi finder ud af det sammen.
            </p>

            <div className="mt-10 space-y-2 border-t border-foreground/10 pt-8 text-[0.875rem]">
              <p className="text-muted-ink">Eller skriv direkte</p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium link-quiet"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="pt-2 text-muted-ink">
                Bare et spørgsmål?{" "}
                <Link
                  href="/kontakt"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Kontakt mig
                </Link>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.06} className="min-w-0 md:col-span-7 lg:col-span-8">
            <Suspense
              fallback={
                <div className="border border-foreground/10 px-5 py-16 text-center text-muted-ink md:px-8">
                  Indlæser formular…
                </div>
              }
            >
              <BookingForm />
            </Suspense>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
