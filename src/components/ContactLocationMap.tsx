import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/data/photos";

export function ContactLocationMap() {
  const { streetAddress, postalCode, addressLocality } = siteConfig.address;
  const line = `${streetAddress}, ${postalCode} ${addressLocality}`;

  return (
    <div className="mt-12">
      <a
        href={siteConfig.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden border border-white/10 bg-[#0c0c0c] transition-colors duration-500 ease-premium hover:border-white/20"
        aria-label={`Åbn ${line} i Google Maps`}
      >
        <div className="relative h-36 overflow-hidden sm:h-40">
          <iframe
            title={`Kort over ${line}`}
            src={siteConfig.googleMapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] border-0 opacity-55 grayscale contrast-125"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/15"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
            <div>
              <p className="flex items-center gap-2 text-[10px] tracking-[0.28em] text-white/45 uppercase">
                <MapPin size={12} strokeWidth={1.5} className="shrink-0" />
                Adresse
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85 transition-colors duration-500 ease-premium group-hover:text-white">
                {streetAddress}
              </p>
              <p className="text-sm text-white/55">
                {postalCode} {addressLocality}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] tracking-[0.2em] text-white/45 uppercase transition-colors duration-500 ease-premium group-hover:text-white">
              Google Maps
              <ArrowUpRight
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
