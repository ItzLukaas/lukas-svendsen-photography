import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clientLogos } from "@/data/clients";
import { linkSubtle, sectionDivider } from "@/lib/styles";
import { ClientLogoSlider } from "./ClientLogoSlider";

export function ClientsSection() {
  return (
    <section
      className={`overflow-x-hidden ${sectionDivider} bg-[#0a0a0a] px-6 py-24 lg:px-8 lg:py-32`}
      aria-labelledby="clients-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
        <h2
          id="clients-heading"
          className="font-display max-w-2xl text-2xl font-light leading-tight text-white sm:text-3xl md:text-4xl"
        >
          Betroet af førende brands
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/50">
          Samarbejder med private og erhverv i hele Danmark.
        </p>
        <Link href="/referencer" className={`mt-6 ${linkSubtle}`}>
          Se referencer og cases
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
          />
        </Link>

        <div className="mt-10 w-full">
          <ClientLogoSlider logos={clientLogos} />
        </div>
      </div>
    </section>
  );
}
