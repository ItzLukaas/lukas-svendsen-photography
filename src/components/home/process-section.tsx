import { FadeIn } from "@/components/motion/fade-in";
import { processSteps } from "@/lib/data/process-steps";

/**
 * Four-step process — numbered, editorial, no card chrome.
 */
export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-y border-foreground/8 bg-transparent"
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
        </FadeIn>

        <ol className="mt-10 m-0 grid list-none grid-cols-1 gap-10 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:mt-14 lg:grid-cols-4 lg:gap-8">
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
      </div>
    </section>
  );
}
