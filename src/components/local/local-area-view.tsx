import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import type { LocalArea } from "@/lib/data/local-areas";
import { getLocalAreaBySlug } from "@/lib/data/local-areas";

type LocalAreaViewProps = {
  area: LocalArea;
};

export function LocalAreaView({ area }: LocalAreaViewProps) {
  const nearby = area.nearbySlugs
    .map((slug) => getLocalAreaBySlug(slug))
    .filter((item): item is LocalArea => !!item);

  return (
    <div className="pt-[calc(var(--chrome-h)+2.5rem)]">
      <section className="mx-auto max-w-[1600px] px-5 pb-16 md:px-8 md:pb-24 lg:px-12">
        <FadeIn>
          <nav aria-label="Brødkrumme" className="text-[0.75rem] tracking-[0.02em] text-muted-ink">
            <ol className="m-0 flex list-none flex-wrap items-baseline gap-x-0 gap-y-1 p-0">
              <li className="after:mx-3 after:opacity-25 after:content-['/']">
                <Link href="/" className="transition-opacity duration-300 hover:opacity-55">
                  Forside
                </Link>
              </li>
              <li className="text-ink/70" aria-current="page">
                {area.headline}
              </li>
            </ol>
          </nav>

          <p className="label-meta mt-6">Fotograf og videoproducent</p>
          <h1 className="mt-3 max-w-[16ch] font-display text-[clamp(2.65rem,5.8vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
            {area.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.65] text-muted-ink">
            Foto, video, content og drone til virksomheder, organisationer og
            private i {area.city} og omegn.
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-9 max-w-2xl space-y-5 text-body">
            {area.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            {area.proof ? <p className="text-muted-ink">{area.proof}</p> : null}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-12 border-t border-foreground/10 pt-10">
            <h2 className="font-display text-[1.35rem] leading-[1.15] tracking-[-0.02em] md:text-[1.5rem]">
              {area.processHeading}
            </h2>
            <p className="mt-4 max-w-2xl text-body">{area.processBody}</p>
          </div>
        </FadeIn>

        {area.portfolioLinks && area.portfolioLinks.length > 0 ? (
          <FadeIn delay={0.12}>
            <div className="mt-12 border-t border-foreground/10 pt-10">
              <h2 className="font-display text-[1.35rem] leading-[1.15] tracking-[-0.02em] md:text-[1.5rem]">
                Eksempler på arbejde
              </h2>
              {area.portfolioNote ? (
                <p className="mt-4 max-w-2xl text-body text-muted-ink">
                  {area.portfolioNote}
                </p>
              ) : null}
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
                {area.portfolioLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ) : null}

        {nearby.length > 0 ? (
          <FadeIn delay={0.14}>
            <div className="mt-12 border-t border-foreground/10 pt-10">
              <h2 className="label-meta">Andre områder</h2>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
                {nearby.map((near) => (
                  <li key={near.slug}>
                    <Link
                      href={near.path}
                      className="font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
                    >
                      Fotograf i {near.city}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/arbejde"
                    className="font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
                  >
                    Se portfolio
                  </Link>
                </li>
              </ul>
            </div>
          </FadeIn>
        ) : null}

        <FadeIn delay={0.16}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/booking" className="btn-solid bg-ink text-paper">
              Book mig
            </Link>
            <Link href="/kontakt" className="btn-ghost">
              Kontakt mig
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
