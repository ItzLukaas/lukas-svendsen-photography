import { Photo } from "@/components/photography/photo";
import { aboutPortrait } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

/**
 * Compact personal contact block — small portrait + essentials.
 */
export function ContactCard() {
  const { location } = siteConfig;

  return (
    <div className="flex items-start gap-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-foreground/12 sm:size-[4.5rem]">
        <Photo
          src={aboutPortrait.src}
          alt={aboutPortrait.alt}
          fill
          sizes="72px"
          className="absolute inset-0"
          objectPosition="50% 18%"
          quality={85}
        />
      </div>

      <div className="min-w-0 pt-0.5">
        <p className="font-display text-[1.05rem] leading-tight tracking-[-0.02em] text-ink">
          Lukas Guldager Svendsen
        </p>
        <p className="mt-1 text-[0.8125rem] leading-snug text-muted-ink">
          Fotograf · Grindsted
        </p>

        <div className="mt-3 space-y-1 text-[0.875rem] leading-[1.5]">
          <p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="link-quiet font-medium text-ink"
            >
              {siteConfig.phoneDisplay}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-quiet text-ink"
            >
              {siteConfig.email}
            </a>
          </p>
          <p className="text-[0.8125rem] text-muted-ink">
            {location.street}, {location.postalCode} {location.city}
          </p>
        </div>
      </div>
    </div>
  );
}
