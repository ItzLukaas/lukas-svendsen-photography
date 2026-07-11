import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "../Section";
import { ScrollReveal } from "../ScrollReveal";
import { AnimatedHeading } from "../AnimatedHeading";
import { btnPrimary, sectionBody, sectionLabel } from "@/lib/styles";

export function FinalCtaSection() {
  return (
    <Section narrow>
      <ScrollReveal className="text-center">
        <p className={sectionLabel}>Lad os tale sammen</p>
        <AnimatedHeading
          as="h2"
          className="font-display text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl"
        >
          Har du et projekt i tankerne?
        </AnimatedHeading>
        <p className={`mx-auto mt-7 max-w-lg ${sectionBody}`}>
          Uanset om du repræsenterer en klub, en virksomhed eller står med et privat projekt — jeg
          tager gerne en uforpligtende snak om mulighederne.
        </p>
        <Link href="/kontakt" className={`mt-12 ${btnPrimary}`}>
          Kontakt mig
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
          />
        </Link>
      </ScrollReveal>
    </Section>
  );
}
