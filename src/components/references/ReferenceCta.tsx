import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary, sectionBody } from "@/lib/styles";

export function ReferenceCta() {
  return (
    <section className="border-t border-foreground/5 px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-light text-foreground md:text-3xl">
          Lyst til et lignende samarbejde?
        </h2>
        <p className={`mx-auto mt-5 max-w-md ${sectionBody}`}>
          Fortæl mig om dit næste projekt — jeg vender tilbage hurtigst muligt.
        </p>
        <Link href="/kontakt" className={`mt-10 ${btnPrimary}`}>
          Kontakt mig
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
