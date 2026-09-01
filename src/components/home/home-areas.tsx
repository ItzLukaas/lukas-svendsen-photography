import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { primaryLocalAreas } from "@/lib/data/local-areas";

/**
 * Geographic SEO section with natural internal links to local landing pages.
 */
export function HomeAreas() {
  return (
    <section
      aria-labelledby="areas-heading"
      className="border-t border-foreground/8 bg-transparent"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section-sm)] md:px-8 lg:px-12">
        <FadeIn>
          <p className="label-meta">Områder</p>
          <h2
            id="areas-heading"
            className="mt-3 max-w-[22ch] font-display text-[clamp(1.55rem,2.8vw,2.1rem)] leading-[1.08] tracking-[-0.03em]"
          >
            Arbejder i Grindsted, Billund, Vejle, Esbjerg og resten af Danmark
          </h2>
          <p className="mt-4 max-w-[56ch] text-[0.9375rem] leading-[1.65] text-muted-ink">
            Jeg tager opgaver i hele Jylland og resten af Danmark. Uanset om du
            skal bruge foto, video, content eller drone, kan vi tage en snak om
            opgaven.
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem]">
            {primaryLocalAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={area.path}
                  className="font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
                >
                  Fotograf i {area.city}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#services"
                className="font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
              >
                Foto og video til virksomheder
              </Link>
            </li>
            <li>
              <Link
                href="/arbejde"
                className="font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
              >
                Se mit arbejde
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="font-medium text-foreground underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
              >
                Book foto og video
              </Link>
            </li>
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
