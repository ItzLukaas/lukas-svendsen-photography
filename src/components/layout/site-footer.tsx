import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-paper">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-14 md:grid-cols-[1.6fr_1fr_1fr] md:gap-16 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <div className="max-w-md">
          <p className="font-display text-[1.25rem] tracking-[-0.02em] md:text-[1.4rem]">
            {siteConfig.name}
          </p>
          <p className="text-body mt-3.5">
            Fotograf, videograf og dronepilot fra Grindsted. Jeg fotograferer
            koncerter, festivaler, sport, events og virksomheder i Esbjerg,
            Vejle, Billund, Kolding, Herning og hele Jylland.
          </p>
        </div>

        <div>
          <p className="label-meta">Navigation</p>
          <ul className="mt-5 space-y-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] font-medium link-quiet"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-meta">Kontakt</p>
          <ul className="mt-5 space-y-3 text-[0.9375rem] font-medium">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="link-quiet">
                {siteConfig.email}
              </a>
            </li>
            {siteConfig.phoneDisplay ? (
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="link-quiet"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
            ) : null}
            <li className="pt-1 text-[0.8125rem] font-normal text-muted-ink">
              Grindsted · Jylland · Danmark
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-1.5 border-t border-foreground/10 px-5 py-4 text-[0.6875rem] font-medium tracking-[0.03em] text-muted-ink md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">
        <p>
          © {year} {siteConfig.name}
        </p>
        <p>{siteConfig.domain}</p>
      </div>
    </footer>
  );
}
