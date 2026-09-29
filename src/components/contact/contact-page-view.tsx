"use client";

import Link from "next/link";

import { ContactCard } from "@/components/contact/contact-card";
import { ContactForm } from "@/components/contact/contact-form";
import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { localizedHref } from "@/lib/i18n/paths";

/** Contact page intro + card + form, driven by the active locale dictionary. */
export function ContactPageView() {
  const { locale, dict } = useLocale();
  const copy = dict.contactPage;

  return (
    <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-20 md:grid-cols-12 md:gap-16 md:px-8 md:pb-28 lg:px-12">
      <div className="md:col-span-5">
        <FadeIn>
          <p className="label-meta">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
            {copy.title}
          </h1>
          <p className="text-body mt-6 max-w-md">{copy.body}</p>
          <p className="text-body mt-4 max-w-md">
            {copy.bookingPrompt}{" "}
            <Link
              href={localizedHref("/booking", locale)}
              className="link-quiet font-medium text-foreground underline underline-offset-4"
            >
              {copy.bookingCta}
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
  );
}
