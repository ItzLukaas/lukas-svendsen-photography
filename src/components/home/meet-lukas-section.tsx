import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { MuxIntroPlayer } from "@/components/video/mux-intro-player";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function ContactAndCta({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-1.5 p-0">
        <li className="min-w-0">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex max-w-full items-center gap-1.5 text-[0.75rem] font-medium tracking-[0.02em] text-paper/55 transition-colors duration-300 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            <Mail
              className="size-3.5 shrink-0"
              strokeWidth={1.4}
              aria-hidden
            />
            <span className="truncate">{siteConfig.email}</span>
          </a>
        </li>
        <li className="min-w-0">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex max-w-full items-center gap-1.5 text-[0.75rem] font-medium tracking-[0.02em] text-paper/55 transition-colors duration-300 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            <Phone
              className="size-3.5 shrink-0"
              strokeWidth={1.4}
              aria-hidden
            />
            <span className="truncate">{siteConfig.phoneDisplay}</span>
          </a>
        </li>
      </ul>

      <Link
        href="/booking"
        className="btn-solid w-fit bg-paper text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-paper"
      >
        Få tilbud
      </Link>
    </div>
  );
}

/**
 * Meet Lukas — matches site typography/motion; video column untouched.
 */
export function MeetLukasSection() {
  return (
    <section
      id="moed-lukas"
      aria-labelledby="meet-lukas-heading"
      className="border-t border-paper/10 bg-ink text-paper"
    >
      <div className="mx-auto grid max-w-[1600px] gap-5 px-5 py-[var(--space-section-sm)] md:grid-cols-12 md:items-center md:gap-x-12 md:gap-y-5 md:px-8 lg:gap-x-[4.5rem] lg:px-12">
        <FadeIn className="flex flex-col gap-5 md:col-span-5">
          <div>
            <p className="label-meta text-paper/55">Om mig</p>
            <h2
              id="meet-lukas-heading"
              className="mt-3 max-w-[12ch] font-display text-[clamp(1.9rem,4vw,2.85rem)] leading-[1.05] tracking-[-0.035em] text-paper"
            >
              Mød Lukas
            </h2>
            <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-[1.7] text-paper/70 md:text-[1rem]">
              Jeg er 16 år og arbejder professionelt med foto, video og content
              for virksomheder, sportsklubber og events. Her fortæller jeg kort
              om, hvem jeg er, hvordan jeg arbejder, og hvad jeg kan hjælpe med.
            </p>
          </div>

          <ContactAndCta className="hidden md:flex" />
        </FadeIn>

        <FadeIn
          delay={0.05}
          y={10}
          className="min-w-0 md:col-span-6 md:col-start-7 md:flex md:justify-end md:self-center"
        >
          <MuxIntroPlayer className="w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px]" />
        </FadeIn>

        <FadeIn delay={0.06} className="md:hidden">
          <ContactAndCta />
        </FadeIn>
      </div>
    </section>
  );
}
