import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary, sectionBody } from "@/lib/styles";

export function ReferenceCta() {
  return (
    <section className="border-t border-white/5 px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-2xl font-light text-white md:text-3xl">
          Skal vi skabe noget sammen?
        </p>
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
