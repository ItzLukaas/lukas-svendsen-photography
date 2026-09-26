"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import { aboutPortrait } from "@/lib/data/projects";
import { localizeImageAlt } from "@/lib/i18n/localize-content";
import { localizedHref } from "@/lib/i18n/paths";

export function AboutPageView() {
  const { locale, dict } = useLocale();
  const copy = dict.aboutPage;

  return (
    <div className="pt-[calc(var(--chrome-h)+2.5rem)]">
      <section className="mx-auto grid max-w-[1600px] items-start gap-10 px-5 pb-16 md:grid-cols-12 md:gap-14 md:px-8 md:pb-24 lg:px-12">
        <FadeIn className="md:col-span-5 md:sticky md:top-[calc(var(--chrome-h)+1.25rem)]">
          <Photo
            src={aboutPortrait.src}
            alt={localizeImageAlt(aboutPortrait.alt, locale)}
            width={aboutPortrait.width}
            height={aboutPortrait.height}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full"
            priority
            quality={90}
          />
        </FadeIn>

        <div className="md:col-span-6 md:col-start-7">
          <FadeIn>
            <nav
              aria-label={dict.shared.breadcrumb}
              className="text-[0.75rem] tracking-[0.02em] text-muted-ink"
            >
              <ol className="m-0 flex list-none flex-wrap items-baseline gap-x-0 gap-y-1 p-0">
                <li className="after:mx-3 after:opacity-25 after:content-['/']">
                  <Link
                    href={localizedHref("/", locale)}
                    className="transition-opacity duration-300 hover:opacity-55"
                  >
                    {dict.shared.home}
                  </Link>
                </li>
                <li className="text-ink/70" aria-current="page">
                  {copy.eyebrow}
                </li>
              </ol>
            </nav>

            <p className="label-meta mt-8">{copy.eyebrow}</p>
            <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
              {copy.title}
            </h1>
            <p className="mt-4 text-[0.9375rem] text-muted-ink">
              {copy.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-9 space-y-8 text-body">
              <div className="space-y-5">
                {copy.paragraphs.slice(0, 2).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="h-px w-12 bg-foreground/15" aria-hidden />

              <div className="space-y-5">
                {copy.paragraphs.slice(2).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={localizedHref("/booking", locale)}
                className="btn-solid"
              >
                {copy.ctaPrimary}
              </Link>
              <Link
                href={localizedHref("/arbejde", locale)}
                className="btn-ghost"
              >
                {copy.ctaSecondary}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
