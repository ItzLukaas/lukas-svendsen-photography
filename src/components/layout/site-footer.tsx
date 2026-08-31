import Link from "next/link";

import { SignatureMark } from "@/components/layout/signature-mark";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
} from "@/components/layout/social-icons";
import { homeServices } from "@/lib/data/services";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Forside" },
  { href: "/arbejde", label: "Arbejde" },
  { href: "/om", label: "Om mig" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/booking", label: "Book mig" },
] as const;

/**
 * Dark footer — contact, services, nav, location. Quiet and clear.
 */
export function SiteFooter() {
  const year = 2026;
  const { location } = siteConfig;

  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pt-14 pb-12 md:px-8 md:pt-16 md:pb-14 lg:px-12 lg:pt-20">
        <div className="mb-12 flex flex-col gap-3 border-b border-paper/10 pb-10 md:mb-14 md:flex-row md:items-end md:justify-between md:pb-12">
          <div>
            <p className="font-display text-[1.25rem] tracking-[-0.025em] text-paper md:text-[1.4rem]">
              {siteConfig.name}
            </p>
            <p className="mt-2 max-w-[40ch] text-[0.875rem] leading-[1.65] text-paper/50">
              Foto, video, drone og content til projekter, der skal ses — i
              hele Danmark.
            </p>
          </div>
          <Link href="/booking" className="btn-solid mt-2 shrink-0 bg-paper text-ink md:mt-0">
            Book mig
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-paper/55 uppercase">
              Kontakt
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-[0.9375rem] font-medium text-paper/85 transition-colors duration-300 hover:text-paper"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.875rem] text-paper/55 transition-colors duration-300 hover:text-paper"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <nav
              aria-label="Sociale medier"
              className="mt-5 flex items-center gap-1"
            >
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex size-11 items-center justify-center text-paper/70 transition-colors duration-300 hover:text-paper focus-visible:text-paper"
              >
                <IconInstagram className="size-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex size-11 items-center justify-center text-paper/70 transition-colors duration-300 hover:text-paper focus-visible:text-paper"
              >
                <IconFacebook className="size-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-11 items-center justify-center text-paper/70 transition-colors duration-300 hover:text-paper focus-visible:text-paper"
              >
                <IconLinkedin className="size-4" />
              </a>
            </nav>
          </div>

          <div>
            <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-paper/55 uppercase">
              Services
            </p>
            <ul className="mt-5 space-y-2.5">
              {homeServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/booking?type=${encodeURIComponent(service.bookingType)}`}
                    className="text-[0.9375rem] text-paper/75 transition-colors duration-300 hover:text-paper focus-visible:text-paper"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.6875rem] font-medium tracking-[0.12em] text-paper/55 uppercase">
              Portfolio
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/arbejde?kategori=koncerter"
                  className="text-[0.9375rem] text-paper/75 transition-colors duration-300 hover:text-paper focus-visible:text-paper"
                >
                  Festivalfoto
                </Link>
              </li>
              <li>
                <Link
                  href="/arbejde?kategori=sport"
                  className="text-[0.9375rem] text-paper/75 transition-colors duration-300 hover:text-paper focus-visible:text-paper"
                >
                  Sportsfoto
                </Link>
              </li>
              <li>
                <Link
                  href="/arbejde?kategori=events"
                  className="text-[0.9375rem] text-paper/75 transition-colors duration-300 hover:text-paper focus-visible:text-paper"
                >
                  Eventfoto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-paper/55 uppercase">
              Navigation
            </p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-paper/75 transition-colors duration-300 hover:text-paper focus-visible:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-paper/55 uppercase">
              Lokation
            </p>
            <address className="mt-5 not-italic text-[0.9375rem] leading-[1.7] text-paper/75">
              <span className="block">{location.street}</span>
              <span className="block">
                {location.postalCode} {location.city}
              </span>
              <span className="mt-1 block text-paper/60">
                {location.country}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-14 flex justify-center pt-2 md:mt-16 lg:mt-20">
          <SignatureMark
            className="h-10 w-auto opacity-[0.32] md:h-11"
            title={`${siteConfig.name} — signatur`}
          />
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-5 text-[0.6875rem] font-medium tracking-[0.03em] text-paper/55 sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-12">
          <p>
            © {year} {siteConfig.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privatliv"
              className="transition-colors duration-300 hover:text-paper/70 focus-visible:text-paper/70"
            >
              Privatliv
            </Link>
            <span>{siteConfig.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
