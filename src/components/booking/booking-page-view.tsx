"use client";

import Link from "next/link";
import { Suspense } from "react";

import { BookingForm } from "@/components/booking/booking-form";
import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { localizedHref } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site";

export function BookingPageView() {
  const { locale, dict } = useLocale();
  const copy = dict.bookingPage;

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-20 md:px-8 md:pb-28 lg:px-12">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14 lg:gap-16">
        <FadeIn className="md:col-span-5 lg:col-span-4">
          <p className="label-meta">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.45rem,5.5vw,4.25rem)] leading-[0.92] tracking-[-0.03em]">
            {copy.title}
          </h1>
          <div className="text-body mt-5 max-w-md space-y-4">
            {copy.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 space-y-2 border-t border-foreground/10 pt-8 text-[0.875rem]">
            <p className="text-muted-ink">{copy.orEmail}</p>
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium link-quiet"
              >
                {dict.shared.sendEmail}
              </a>
            </p>
            <p className="pt-2 text-muted-ink">
              {copy.justQuestion}{" "}
              <Link
                href={localizedHref("/kontakt", locale)}
                className="font-medium text-foreground underline underline-offset-4"
              >
                {copy.contactLink}
              </Link>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.06} className="min-w-0 md:col-span-7 lg:col-span-8">
          <Suspense
            fallback={
              <div className="border border-foreground/10 px-5 py-16 text-center text-muted-ink md:px-8">
                {dict.shared.loadingForm}
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
