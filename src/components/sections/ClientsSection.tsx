import { clientLogos } from "@/data/clients";
import { sectionDivider } from "@/lib/styles";
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

        <div className="mt-14 w-full">
          <ClientLogoSlider logos={clientLogos} />
        </div>
      </div>
    </section>
  );
}
