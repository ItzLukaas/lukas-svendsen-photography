import { Photo } from "@/components/photography/photo";
import {
  IconInstagram,
  IconLinkedin,
} from "@/components/layout/social-icons";
import { aboutPortrait } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

/**
 * Personal contact card — portrait + details for the contact page.
 */
export function ContactCard() {
  const { location } = siteConfig;
  const addressLine = `${location.street}, ${location.postalCode} ${location.city}`;

  return (
    <article className="border border-foreground/10 bg-paper">
      <Photo
        src={aboutPortrait.src}
        alt={aboutPortrait.alt}
        width={aboutPortrait.width}
        height={aboutPortrait.height}
        sizes="(min-width: 768px) 28vw, 90vw"
        className="aspect-[4/5] w-full"
        quality={88}
      />

      <div className="px-5 py-6 sm:px-6 sm:py-7">
        <h2 className="font-display text-[1.25rem] leading-[1.15] tracking-[-0.025em] text-ink md:text-[1.35rem]">
          Lukas Guldager Svendsen
        </h2>
        <p className="mt-1.5 text-[0.8125rem] tracking-[0.02em] text-muted-ink">
          Founder & Photographer
        </p>
        <p className="mt-1 text-[0.8125rem] text-muted-ink">16 år gammel</p>

        <ul className="mt-6 space-y-2.5 border-t border-foreground/8 pt-5 text-[0.875rem] leading-[1.55]">
          <li>
            <a
              href={`tel:${siteConfig.phone}`}
              className="font-medium text-ink transition-opacity duration-300 hover:opacity-60"
            >
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-ink transition-opacity duration-300 hover:opacity-60"
            >
              {siteConfig.email}
            </a>
          </li>
          <li>
            <address className="not-italic text-muted-ink">
              <span className="block">{addressLine}</span>
              <span className="block">{location.country}</span>
            </address>
          </li>
        </ul>

        <nav
          aria-label="Sociale medier"
          className="mt-5 flex items-center gap-1 border-t border-foreground/8 pt-4"
        >
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex size-9 items-center justify-center text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            <IconInstagram className="size-4" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex size-9 items-center justify-center text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            <IconLinkedin className="size-4" />
          </a>
        </nav>
      </div>
    </article>
  );
}
