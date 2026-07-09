import { clientLogos } from "@/data/clients";
import { sectionDivider, sectionLabel } from "@/lib/styles";
import { ClientLogoSlider } from "./ClientLogoSlider";

export function ClientsSection() {
  return (
    <section
      className={`overflow-x-hidden ${sectionDivider} bg-[#0a0a0a] px-6 py-20 lg:px-8 lg:py-24`}
      aria-labelledby="clients-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
        <p className={sectionLabel}>Se mine stolte samarbejdspartnere</p>
        <h2
          id="clients-heading"
          className="font-display mx-auto max-w-xl text-[1.65rem] font-light leading-tight text-white sm:max-w-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Betroet af stærke brands
        </h2>

        <div className="mt-16 w-full">
          <ClientLogoSlider logos={clientLogos} />
        </div>
      </div>
    </section>
  );
}
