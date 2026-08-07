import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { BookingForm } from "@/components/booking/booking-form";
import { FadeIn } from "@/components/motion/fade-in";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Booking — Fotograf i Grindsted",
  description:
    "Book fotografi, videoproduktion eller droneproduktion med Lukas Svendsen i Grindsted. Professionelle produktioner til koncerter, events og virksomheder i Jylland.",
  path: "/booking",
  image: "/images/festival.jpg",
  imageAlt: "Festivalfotografi — book fotograf Lukas Svendsen i Grindsted",
});

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-24 pb-20 md:px-8 md:pt-28 md:pb-28 lg:px-12">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14 lg:gap-16">
        <FadeIn className="md:col-span-5 lg:col-span-4">
          <p className="label-meta">Booking</p>
          <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.45rem,5.5vw,4.25rem)] leading-[0.92] tracking-[-0.03em]">
            Book en produktion.
          </h1>
          <p className="text-body mt-5 max-w-md">
            Fortæl mig kort om opgaven. Jeg er baseret i Grindsted og arbejder i
            hele Jylland — og vender tilbage med afklaring og næste skridt.
          </p>

          <ol className="mt-9 max-w-md space-y-4 text-[0.875rem] leading-[1.6] text-muted-ink">
            <li className="flex gap-3.5">
              <span className="label-meta shrink-0 pt-0.5">01</span>
              <span>Send type, dato og lokation.</span>
            </li>
            <li className="flex gap-3.5">
              <span className="label-meta shrink-0 pt-0.5">02</span>
              <span>Jeg vender tilbage inden for 1–2 hverdage.</span>
            </li>
            <li className="flex gap-3.5">
              <span className="label-meta shrink-0 pt-0.5">03</span>
              <span>Vi aftaler scope — og jeg leverer.</span>
            </li>
          </ol>

          <div className="mt-10 space-y-2 border-t border-foreground/10 pt-8 text-[0.875rem]">
            <p className="text-muted-ink">Direkte kontakt</p>
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium link-quiet"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="pt-2 text-muted-ink">
              Hellere bare snakke først?{" "}
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
  );
}
