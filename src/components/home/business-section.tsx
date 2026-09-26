"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { localizedHref } from "@/lib/i18n/paths";

/**
 * B2B-focused section — confidence without agency fluff.
 */
export function BusinessSection() {
  const { locale, dict } = useLocale();

  return (
    <section
      aria-labelledby="business-heading"
      className="border-t border-foreground/8 bg-mist/30"
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-[var(--space-section)] md:grid-cols-12 md:gap-12 md:px-8 lg:px-12">
        <FadeIn className="md:col-span-5">
          <p className="label-meta">{dict.business.eyebrow}</p>
          <h2
            id="business-heading"
            className="heading-section mt-3 max-w-[16ch] font-display text-ink"
          >
            {dict.business.title}
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-[1.7] text-muted-ink md:text-[1rem]">
            {dict.business.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={localizedHref("/booking", locale)}
              className="btn-solid"
            >
              {dict.business.ctaPrimary}
            </Link>
            <Link
              href={localizedHref("/hvad-jeg-laver", locale)}
              className="btn-ghost"
            >
              {dict.business.ctaSecondary}
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.06} className="md:col-span-6 md:col-start-7">
          <ul className="m-0 grid list-none grid-cols-1 gap-0 border-t border-foreground/10 p-0 sm:grid-cols-2 sm:gap-x-8">
            {dict.business.points.map((point) => (
              <li
                key={point}
                className="border-b border-foreground/10 py-4 text-[0.9375rem] leading-[1.5] text-ink"
              >
                {point}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
