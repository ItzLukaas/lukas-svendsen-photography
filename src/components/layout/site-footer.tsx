"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";
import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
} from "@/components/layout/social-icons";
import { localizedHref } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const areaLinks = [
  { href: "/fotograf-grindsted", label: "Grindsted" },
  { href: "/fotograf-billund", label: "Billund" },
  { href: "/fotograf-vejle", label: "Vejle" },
  { href: "/fotograf-esbjerg", label: "Esbjerg" },
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
        "inline-flex size-10 items-center justify-center text-paper/70",
        "transition-colors duration-300 ease-out",
        "hover:text-paper",
        "focus-visible:text-paper"
      )}
    >
      <Icon className="size-5" />
    </a>
  );
}

/**
 * Compact studio footer — contact, navigation, social, legal.
 */
export function SiteFooter() {
  const { locale, dict } = useLocale();
  const year = 2026;
  const { location } = siteConfig;

  const mainNav = [
    { href: localizedHref("/", locale), label: dict.nav.home },
    { href: localizedHref("/arbejde", locale), label: dict.nav.work },
    {
      href: localizedHref("/hvad-jeg-laver", locale),
      label: dict.nav.whatIDo,
    },
    { href: localizedHref("/om", locale), label: dict.nav.about },
    { href: localizedHref("/kontakt", locale), label: dict.nav.contact },
    { href: localizedHref("/booking", locale), label: dict.nav.bookMe },
  ] as const;

  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-8 md:py-12 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-paper/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.6875rem] font-medium tracking-[0.1em] text-paper/45 uppercase">
              {dict.footer.nextStep}
            </p>
            <p className="mt-2 font-display text-[clamp(1.35rem,3vw,1.85rem)] leading-[1.1] tracking-[-0.025em] text-paper">
              {dict.footer.ready}
            </p>
          </div>
          <Link
            href={localizedHref("/booking", locale)}
            className="btn-solid btn-solid-invert shrink-0"
          >
            {dict.footer.bookMe}
          </Link>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          <div>
            <p className="font-display text-[1.125rem] leading-tight tracking-[-0.02em] text-paper">
              {siteConfig.name}
            </p>
            <p className="mt-1.5 text-[0.875rem] text-paper/55">
              {dict.footer.role}
            </p>
            <address className="mt-3 not-italic text-[0.875rem] leading-[1.55] text-paper/55">
              {location.street}
              <br />
              {location.postalCode} {location.city}
              <br />
              {dict.footer.country}
            </address>
            <nav
              aria-label={dict.footer.areas}
              className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem]"
            >
              {areaLinks.map((item, index) => (
                <span key={item.href} className="inline-flex items-center gap-2">
                  {index > 0 ? (
                    <span className="text-paper/35" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  {locale === "da" ? (
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  ) : (
                    <FooterLink href={localizedHref(item.href, locale)}>
                      {item.label}
                    </FooterLink>
                  )}
                </span>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[0.6875rem] font-medium tracking-[0.08em] text-paper/45 uppercase">
              {dict.footer.navigation}
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
              {dict.footer.contact}
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.875rem] text-paper/70 transition-colors duration-300 hover:text-paper"
                >
                  {dict.shared.sendEmail}
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
            {dict.footer.follow}
          </p>
          <p className="mt-1.5 text-[0.875rem] text-paper/55">
            {dict.footer.followBody}
          </p>
          <nav
            aria-label="Social"
            className="mt-4 flex items-center gap-2"
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
              href={localizedHref("/privatliv", locale)}
              className="transition-colors hover:text-paper/70"
            >
              {dict.footer.privacy}
            </Link>
            <span aria-hidden>·</span>
            <Link
              href={`${localizedHref("/privatliv", locale)}#cookies`}
              className="transition-colors hover:text-paper/70"
            >
              {dict.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
