"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { localizedHref } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site";

export function PrivacyPageView() {
  const { locale, dict } = useLocale();
  const copy = dict.privacyPage;

  const paragraphs = copy.paragraphs.map((paragraph) =>
    paragraph
      .replaceAll("{domain}", siteConfig.domain)
      .replaceAll("{email}", siteConfig.email)
  );

  return (
    <div className="mx-auto max-w-[720px] px-5 pt-[calc(var(--chrome-h)+2.5rem)] pb-20 md:px-8 md:pb-28 lg:px-12">
      <FadeIn>
        <p className="label-meta">{copy.eyebrow}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
          {copy.title}
        </h1>
        <div className="mt-8 space-y-5 text-body">
          {paragraphs.map((paragraph, index) => {
            const isCookies = index === paragraphs.length - 1;
            const hasEmail = paragraph.includes(siteConfig.email);

            if (hasEmail) {
              const [before, after] = paragraph.split(siteConfig.email);
              return (
                <p key={index}>
                  {before}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="link-quiet font-medium text-foreground underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>
                  {after}
                </p>
              );
            }

            return (
              <p key={index} id={isCookies ? "cookies" : undefined}>
                {paragraph}
              </p>
            );
          })}
        </div>
        <p className="mt-10">
          <Link
            href={localizedHref("/kontakt", locale)}
            className="btn-ghost"
          >
            {copy.backToContact}
          </Link>
        </p>
      </FadeIn>
    </div>
  );
}
