"use client";

import { useId, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  /** Show section chrome (eyebrow + heading) */
  withIntro?: boolean;
  className?: string;
};

const faqOrder = [
  "what",
  "pricing",
  "areas",
  "brief",
  "delivery",
  "booking",
] as const;

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-foreground/10">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-ink"
        >
          <span className="font-display text-[1.0625rem] leading-[1.25] tracking-[-0.02em] text-ink md:text-[1.125rem]">
            {question}
          </span>
          <span
            className={cn(
              "mt-1.5 inline-flex size-5 shrink-0 items-center justify-center text-muted-ink transition-transform duration-300",
              open && "rotate-45"
            )}
            aria-hidden
          >
            <span className="relative block size-3.5">
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
              <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
            </span>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className={cn(
          "max-w-2xl space-y-3 pb-5 text-[0.9375rem] leading-[1.7] text-muted-ink",
          !open && "hidden"
        )}
      >
        {answer
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
          .map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
      </div>
    </div>
  );
}

/**
 * FAQ accordion — shared on homepage and offerings page.
 * Copy comes from the active locale dictionary.
 */
export function FaqSection({ withIntro = true, className }: FaqSectionProps) {
  const { dict } = useLocale();
  const [openId, setOpenId] = useState<string | null>(faqOrder[0]);

  return (
    <section
      aria-labelledby={withIntro ? "faq-heading" : undefined}
      className={cn("border-t border-foreground/8", className)}
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section)] md:px-8 lg:px-12">
        {withIntro ? (
          <FadeIn>
            <p className="label-meta">{dict.faq.eyebrow}</p>
            <h2
              id="faq-heading"
              className="heading-section mt-3 max-w-[18ch] font-display text-ink"
            >
              {dict.faq.title}
            </h2>
          </FadeIn>
        ) : null}

        <div
          className={cn(
            "mx-auto max-w-3xl border-t border-foreground/10",
            withIntro ? "mt-10 md:mt-12" : "mt-0"
          )}
        >
          {faqOrder.map((id, index) => {
            const item = dict.faq.items[id];
            return (
              <FadeIn key={id} delay={Math.min(0.04 + index * 0.03, 0.18)}>
                <FaqItem
                  question={item.question}
                  answer={item.answer}
                  open={openId === id}
                  onToggle={() =>
                    setOpenId((current) => (current === id ? null : id))
                  }
                />
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
