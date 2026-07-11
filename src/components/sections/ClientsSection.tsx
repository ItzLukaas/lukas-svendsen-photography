import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clientLogos } from "@/data/clients";
import { sectionDivider } from "@/lib/styles";
import { ClientLogoSlider } from "./ClientLogoSlider";

export function ClientsSection() {
  return (
    <section
      className={`overflow-x-hidden ${sectionDivider} bg-[#0a0a0a] px-6 py-16 lg:px-8 lg:py-24`}
      aria-labelledby="clients-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
        <h2
          id="clients-heading"
          className="font-display max-w-2xl text-xl font-light leading-tight text-white sm:text-2xl md:text-3xl"
        >
          Betroet fotograf for førende brands
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-white/50 sm:text-sm">
          Jeg samarbejder med foreninger, kommuner, virksomheder og kulturaktører i hele Danmark.
          Fra lokale projekter i Grindsted og Billund til større opgaver i hele Danmark — med
          fokus på kvalitet, tydelig dialog og visuelt stærke resultater.
        </p>
        <Link
          href="/referencer"
          className="group mt-5 inline-flex min-h-9 items-center gap-2 text-[10px] tracking-[0.2em] text-white/50 uppercase transition-colors duration-500 ease-premium hover:text-white"
        >
          Se referencer og cases
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
          />
        </Link>

        <div className="mt-8 w-full">
          <ClientLogoSlider logos={clientLogos} />
        </div>
      </div>
    </section>
  );
}
