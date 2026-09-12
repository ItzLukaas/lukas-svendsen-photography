import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { businessAudiencePoints } from "@/lib/data/offerings";

/**
 * B2B-focused section — confidence without agency fluff.
 */
export function BusinessSection() {
  return (
    <section
      aria-labelledby="business-heading"
      className="border-t border-foreground/8 bg-mist/30"
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-[var(--space-section)] md:grid-cols-12 md:gap-12 md:px-8 lg:px-12">
        <FadeIn className="md:col-span-5">
          <p className="label-meta">Til virksomheder</p>
          <h2
            id="business-heading"
            className="mt-3 max-w-[14ch] font-display text-[clamp(1.9rem,4vw,2.85rem)] leading-[1.05] tracking-[-0.035em] text-ink"
          >
            Foto og video, der kan bruges
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-[1.7] text-muted-ink md:text-[1rem]">
            Jeg hjælper virksomheder, organisationer og brands med foto, video
            og content, der kan bruges på tværs af jeres hjemmeside, sociale
            medier, kampagner og øvrige kommunikation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/booking" className="btn-solid bg-ink text-paper">
              Har du et projekt?
            </Link>
            <Link href="/hvad-jeg-laver" className="btn-ghost">
              Se hvad jeg laver
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.06} className="md:col-span-6 md:col-start-7">
          <ul className="m-0 grid list-none grid-cols-1 gap-0 border-t border-foreground/10 p-0 sm:grid-cols-2 sm:gap-x-8">
            {businessAudiencePoints.map((point) => (
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
