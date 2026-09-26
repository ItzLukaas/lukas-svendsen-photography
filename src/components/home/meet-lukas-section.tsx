import Link from "next/link";
import { Mail, Phone, type LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { MuxIntroPlayer } from "@/components/video/mux-intro-player";
import { siteConfig } from "@/lib/site";

function ContactLine({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: LucideIcon;
  children: string;
}) {
  return (
    <a
      href={href}
      className="group/line inline-flex min-h-11 max-w-full min-w-0 items-center gap-3 text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
    >
      <Icon
        className="size-4 shrink-0 text-paper/70 transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/line:-translate-y-px group-hover/line:text-paper"
        strokeWidth={1.4}
        aria-hidden
      />
      <span className="min-w-0 break-words bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-bottom bg-no-repeat text-[0.9375rem] font-medium tracking-[-0.012em] transition-[background-size] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/line:bg-[length:100%_1px] md:text-[1.0625rem]">
        {children}
      </span>
    </a>
  );
}

/**
 * Meet Lukas — compact copy + video; contact as a clear, icon-led block.
 */
export function MeetLukasSection() {
  return (
    <section
      id="moed-lukas"
      aria-labelledby="meet-lukas-heading"
      className="meet-lukas-section relative overflow-hidden border-t border-paper/10 bg-ink text-paper"
    >
      <div className="meet-lukas-dots" aria-hidden />
      <div className="relative z-[1] mx-auto flex w-full min-w-0 max-w-[1600px] justify-center px-5 py-[var(--space-section-sm)] md:px-8 lg:px-12">
        <div className="meet-lukas-group w-full min-w-0">
          <FadeIn className="min-w-0 w-full">
            <p className="label-meta text-paper/55">Om mig</p>
            <h2
              id="meet-lukas-heading"
              className="mt-3 max-w-[12ch] font-display text-[clamp(2rem,4.2vw,3.05rem)] leading-[1.04] tracking-[-0.035em] text-paper"
            >
              Mød Lukas
            </h2>
            <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-[1.7] text-paper/72 md:text-[1.0625rem]">
              Jeg er 16 år og arbejder professionelt med foto, video og content
              for virksomheder, sportsklubber og events. Her fortæller jeg kort
              om, hvem jeg er, hvordan jeg arbejder, og hvad jeg kan hjælpe med.
            </p>

            <Link
              href="/booking"
              className="btn-solid mt-7 w-fit max-w-full bg-paper text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-paper"
            >
              Skal vi lave noget sammen?
            </Link>

            <ul className="mt-8 m-0 list-none space-y-1 border-t border-paper/12 pt-5 p-0">
              <li>
                <ContactLine href={`mailto:${siteConfig.email}`} icon={Mail}>
                  {siteConfig.email}
                </ContactLine>
              </li>
              <li>
                <ContactLine href={`tel:${siteConfig.phone}`} icon={Phone}>
                  {siteConfig.phoneDisplay}
                </ContactLine>
              </li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.06} className="min-w-0 w-full">
            <MuxIntroPlayer className="mx-auto w-full min-w-0 max-w-[min(20.5rem,100%)] sm:max-w-[22.5rem] md:max-w-[28rem] lg:max-w-[30rem] xl:max-w-[32rem]" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
