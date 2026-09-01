import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { processSteps } from "@/lib/data/process-steps";

/**
 * Four-step process — numbered, editorial, no card chrome.
 */
export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-t border-foreground/8 bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section)] md:px-8 lg:px-12">
        <FadeIn>
          <p className="label-meta">Proces</p>
          <h2
            id="process-heading"
            className="mt-3 max-w-[18ch] font-display text-[clamp(1.9rem,4.4vw,3.15rem)] leading-[1.05] tracking-[-0.035em] text-ink"
          >
            Sådan foregår det
          </h2>
          <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-[1.65] text-muted-ink">
            Fra første snak til færdigt materiale. En enkel proces, uanset om
            opgaven er lille eller større.
          </p>
        </FadeIn>

        <ol
          role="list"
          className="mt-10 m-0 grid list-none grid-cols-1 gap-10 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:mt-14 lg:grid-cols-3 lg:gap-8"
        >
          {processSteps.map((item, index) => (
            <li key={item.id}>
              <FadeIn delay={Math.min(0.04 + index * 0.05, 0.2)}>
                <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-muted-ink">
                  {String(item.step).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-[1.125rem] leading-[1.2] tracking-[-0.022em] text-ink md:text-[1.2rem]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[36ch] text-[0.875rem] leading-[1.65] text-muted-ink md:text-[0.9375rem]">
                  {item.body}
                </p>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={0.14}>
          <div className="mt-10 sm:mt-12">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-0 text-[0.75rem] font-semibold tracking-[0.055em] text-ink transition-[gap] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-[0.55em]"
            >
              Book mig
              <span
                aria-hidden
                className="inline-block max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[1.1em] group-hover:translate-x-0 group-hover:opacity-100 -translate-x-[0.3em]"
              >
                →
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
