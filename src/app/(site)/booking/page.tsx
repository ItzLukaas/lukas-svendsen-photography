import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { BookingForm } from "@/components/booking/booking-form";
import { FadeIn } from "@/components/motion/fade-in";
import { pageMetadata } from "@/lib/seo";

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
    <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pt-24 pb-20 md:grid-cols-12 md:gap-16 md:px-8 md:pt-28 md:pb-28 lg:px-12">
      <FadeIn className="md:col-span-5">
        <p className="label-meta">Booking</p>
        <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
          Book en produktion.
        </h1>
        <p className="text-body mt-6 max-w-md">
          Klar til fotografi, video eller drone? Jeg er baseret i Grindsted og
          arbejder i hele Jylland. Udfyld formularen med det vigtigste — jeg
          vender tilbage med afklaring og næste skridt.
        </p>

        <ol className="mt-10 max-w-md space-y-5 text-[0.9375rem] leading-[1.6] text-muted-ink">
          <li className="flex gap-4">
            <span className="label-meta shrink-0 pt-0.5">01</span>
            <span>Send forespørgslen med type, dato og lokation.</span>
          </li>
          <li className="flex gap-4">
            <span className="label-meta shrink-0 pt-0.5">02</span>
            <span>Jeg vender tilbage for at afklare scope og timing.</span>
          </li>
          <li className="flex gap-4">
            <span className="label-meta shrink-0 pt-0.5">03</span>
            <span>Vi booker — og jeg leverer arbejdet.</span>
          </li>
        </ol>

        <p className="text-body mt-10 max-w-md">
          Bare vil snakke først?{" "}
          <Link
            href="/kontakt"
            className="link-quiet font-medium text-foreground underline underline-offset-4"
          >
            Kontakt mig
          </Link>
          .
        </p>
      </FadeIn>

      <FadeIn delay={0.06} className="md:col-span-6 md:col-start-7">
        <Suspense fallback={null}>
          <BookingForm />
        </Suspense>
      </FadeIn>
    </div>
  );
}
