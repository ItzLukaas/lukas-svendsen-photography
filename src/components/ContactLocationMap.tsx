import { siteConfig } from "@/data/photos";

export function ContactLocationMap() {
  return (
    <div className="mt-12">
      <a
        href={siteConfig.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden border border-border transition-colors duration-500 ease-premium hover:border-foreground/20"
        aria-label="Åbn lokation i Google Maps"
      >
        <div className="relative h-44 overflow-hidden sm:h-48">
          <iframe
            title="Satellitkort over Lukas Svendsen Photography"
            src={siteConfig.googleMapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] border-0"
          />
        </div>
      </a>
    </div>
  );
}
