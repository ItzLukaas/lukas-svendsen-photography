import Link from "next/link";

import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
} from "@/components/layout/social-icons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/", label: "Forside" },
  { href: "/arbejde", label: "Arbejde" },
  { href: "/om", label: "Om mig" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

const socialLinks = [
  {
    href: siteConfig.social.instagram,
    label: "Instagram",
    Icon: BrandInstagram,
  },
  {
    href: siteConfig.social.facebook,
    label: "Facebook",
    Icon: BrandFacebook,
  },
  {
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    Icon: BrandLinkedin,
  },
] as const;

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[0.875rem] text-paper/70 transition-colors duration-300 hover:text-paper"
    >
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: typeof BrandInstagram;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex size-10 items-center justify-center text-paper/85",
        "transition-[transform,opacity] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:scale-105 hover:text-paper hover:opacity-100",
        "focus-visible:-translate-y-0.5 focus-visible:scale-105 focus-visible:text-paper"
      )}
    >
      <Icon className="size-6" />
    </a>
  );
}

/**
 * Compact studio footer — contact, navigation, social, legal.
 */
export function SiteFooter() {
  const year = 2026;
  const { location } = siteConfig;

  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-8 md:py-12 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          <div>
            <p className="font-display text-[1.125rem] leading-tight tracking-[-0.02em] text-paper">
              {siteConfig.name}
            </p>
            <p className="mt-1.5 text-[0.875rem] text-paper/55">
              Fotograf & videoproducent
            </p>
            <address className="mt-3 not-italic text-[0.875rem] leading-[1.55] text-paper/55">
              {location.street}
              <br />
              {location.postalCode} {location.city}
              <br />
              {location.country}
            </address>
          </div>

          <div>
            <p className="text-[0.6875rem] font-medium tracking-[0.08em] text-paper/45 uppercase">
              Navigation
            </p>
            <ul className="mt-3 space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <p className="text-[0.6875rem] font-medium tracking-[0.08em] text-paper/45 uppercase">
              Kontakt
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.875rem] text-paper/70 transition-colors duration-300 hover:text-paper"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-[0.875rem] text-paper/70 transition-colors duration-300 hover:text-paper"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-paper/10 pt-8">
          <p className="text-[0.6875rem] font-medium tracking-[0.08em] text-paper/45 uppercase">
            Følg min rejse
          </p>
          <p className="mt-1.5 text-[0.875rem] text-paper/55">
            Se hvad der sker bag kameraet.
          </p>
          <nav
            aria-label="Sociale medier"
            className="mt-4 flex items-center gap-3"
          >
            {socialLinks.map((item) => (
              <SocialLink key={item.label} {...item} />
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-paper/10 pt-6 text-[0.75rem] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href="/privatliv"
              className="transition-colors hover:text-paper/70"
            >
              Privatlivspolitik
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/privatliv#cookies"
              className="transition-colors hover:text-paper/70"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
