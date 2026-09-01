import { FadeIn } from "@/components/motion/fade-in";
import { valueProps } from "@/lib/data/value-props";

/**
 * Editorial value features — ink palette only, refined cards, subtle hover.
 */
export function ValueSection() {
  return (
    <section
      aria-labelledby="value-heading"
      className="border-t border-foreground/8 bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section)] md:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-12 md:items-end md:gap-12 lg:gap-16">
          <FadeIn className="md:col-span-7">
            <p className="label-meta">Hvad jeg laver</p>
            <h2
              id="value-heading"
              className="mt-3 max-w-[16ch] font-display text-[clamp(1.9rem,4.4vw,3.15rem)] leading-[1.05] tracking-[-0.035em] text-ink"
            >
              Foto, video og content
            </h2>
          </FadeIn>
          <FadeIn delay={0.06} className="md:col-span-5">
            <p className="max-w-[44ch] text-[0.9375rem] leading-[1.7] text-muted-ink md:ml-auto md:text-[1.0625rem]">
              Jeg er fotograf og videoproducent og skaber visuelt content til
              forskellige behov. Med kunder som Dansk Håndbold, Fredericia HK og
              Varde Open Air.
            </p>
          </FadeIn>
        </div>

        <ul className="mt-10 m-0 grid list-none grid-cols-1 gap-3 p-0 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <li key={prop.id}>
                <FadeIn delay={Math.min(0.04 + index * 0.045, 0.2)}>
                  <article className="group flex h-full flex-col border border-foreground/10 bg-paper px-5 py-6 transition-[border-color,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/22 hover:bg-mist/55 sm:px-6 sm:py-7 md:px-7 md:py-8">
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-foreground/12 transition-[border-color,background-color] duration-400 group-hover:border-foreground/28 group-hover:bg-paper">
                        <Icon
                          aria-hidden
                          className="size-3.5 text-ink transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-px"
                          strokeWidth={1.4}
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-[1.0625rem] leading-[1.2] tracking-[-0.02em] text-ink md:text-[1.125rem]">
                          {prop.title}
                        </h3>
                        <p className="mt-3 max-w-[34ch] text-[0.875rem] leading-[1.65] text-muted-ink md:text-[0.9375rem]">
                          {prop.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
