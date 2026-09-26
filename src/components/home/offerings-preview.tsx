"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { offerings } from "@/lib/data/offerings";
import { localizedHref } from "@/lib/i18n/paths";

const offeringKeys = ["business", "content", "events", "private"] as const;

/**
 * Homepage offerings preview — clear hire paths without a services hub.
 */
export function OfferingsPreview() {
  const { locale, dict } = useLocale();
  const servicesHref = localizedHref("/hvad-jeg-laver", locale);

  return (
    <section
      id="hvad-jeg-laver"
      aria-labelledby="offerings-heading"
      className="border-t border-foreground/8"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section)] md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-meta">{dict.offerings.eyebrow}</p>
              <h2
                id="offerings-heading"
                className="heading-section mt-3 max-w-[18ch] font-display text-ink"
              >
                {dict.offerings.title}
              </h2>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.65] text-muted-ink md:text-[1rem]">
                {dict.offerings.body}
              </p>
            </div>
            <Link
              href={servicesHref}
              className="btn-ghost shrink-0 self-start md:self-auto"
            >
              {dict.offerings.viewAll}
            </Link>
          </div>
        </FadeIn>

        <ul className="mt-12 m-0 grid list-none grid-cols-1 gap-px bg-foreground/10 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((item, index) => {
            const key = offeringKeys[index] ?? "business";
            const copy = dict.offerings.items[key];
            return (
              <li key={item.id} className="bg-paper">
                <FadeIn
                  delay={Math.min(0.04 + index * 0.05, 0.2)}
                  className="h-full"
                >
                  <Link
                    href={
                      item.href?.includes("#")
                        ? `${servicesHref}${item.href.slice(item.href.indexOf("#"))}`
                        : servicesHref
                    }
                    className="group flex h-full flex-col px-5 py-7 transition-colors duration-300 hover:bg-mist/60 md:px-6 md:py-8"
                  >
                    <p className="label-meta text-muted-ink/80">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-display text-[1.2rem] leading-[1.15] tracking-[-0.025em] text-ink md:text-[1.3rem]">
                      {copy.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.875rem] leading-[1.65] text-muted-ink md:text-[0.9375rem]">
                      {copy.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.05em] text-ink transition-[gap] duration-300 group-hover:gap-3">
                      {dict.offerings.learnMore}
                      <span aria-hidden>→</span>
                    </span>
                  </Link>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
