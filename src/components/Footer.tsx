import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { InstagramIcon } from "@/components/icons/Instagram";
import { LinkedInIcon } from "@/components/icons/LinkedIn";
import { siteConfig } from "@/data/photos";
import { btnPrimary } from "@/lib/styles";

const navLinks = [
  { href: "/", label: "Forside" },
  { href: "/portfolio", label: "Portefølje" },
  { href: "/referencer", label: "Referencer" },
  { href: "/ydelser", label: "Ydelser" },
  { href: "/om-mig", label: "Om mig" },
  { href: "/kontakt", label: "Kontakt" },
];

const serviceLinks = [
  { href: "/ydelser/fotografering", label: "Fotografering", key: "fotografering" },
  { href: "/ydelser/videoproduktion", label: "Videoproduktion", key: "videoproduktion" },
  { href: "/ydelser/drone", label: "Droneflyvning", key: "droneflyvning" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-12">
          <div className="min-w-0 sm:col-span-2 xl:col-span-1">
            <p className="font-display text-lg tracking-widest text-foreground uppercase">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Ung, 16-årig ambitiøs
              <br />
              fotograf og videoproducent.
            </p>
            <p className="mt-8 text-xs tracking-[0.25em] text-muted uppercase">Sociale medier</p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center text-muted transition-all duration-500 ease-premium hover:scale-110 hover:text-foreground"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn — Lukas Guldager Svendsen"
                className="flex h-11 w-11 items-center justify-center text-muted transition-all duration-500 ease-premium hover:scale-110 hover:text-foreground"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="E-mail"
                className="flex h-11 w-11 items-center justify-center text-muted transition-all duration-500 ease-premium hover:scale-110 hover:text-foreground"
              >
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="min-w-0 sm:pr-4 lg:pr-6">
            <p className="text-xs tracking-[0.25em] text-muted uppercase">Kontakt</p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>{siteConfig.name}</li>
              <li>
                <ObfuscatedEmail
                  label="Send en mail"
                  className="inline-flex min-h-11 items-center gap-2 transition-colors duration-500 ease-premium hover:text-foreground"
                  showIcon
                  icon={<Mail size={14} strokeWidth={1.5} className="shrink-0 text-muted" />}
                />
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center gap-2 transition-colors duration-500 ease-premium hover:text-foreground"
                >
                  <Phone size={14} strokeWidth={1.5} className="shrink-0 text-muted" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted" />
                {siteConfig.location}
              </li>
            </ul>
          </div>

          <div className="min-w-0 sm:pr-4 lg:pr-6">
            <p className="text-xs tracking-[0.25em] text-muted uppercase">Navigation</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-500 ease-premium hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 sm:col-span-2 xl:col-span-1">
            <p className="text-xs tracking-[0.25em] text-muted uppercase">Ydelser</p>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-500 ease-premium hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-foreground/5 pt-12 text-center">
          <p className="font-display text-lg font-light text-foreground sm:text-2xl md:text-3xl">
            Fortæl mig om dit projekt
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Fortæl mig om dit projekt — jeg vender tilbage hurtigst muligt.
          </p>
          <Link href="/#foresporgsel" className={`mt-8 ${btnPrimary}`}>
            Kontakt mig
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-foreground/5 pt-8 sm:flex-row">
          <p className="text-xs text-muted-subtle">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Alle rettigheder forbeholdes.
          </p>
          <Link
            href="/privatlivspolitik"
            className="inline-flex min-h-11 items-center text-xs text-muted transition-colors duration-500 ease-premium hover:text-foreground/70"
          >
            Privatlivspolitik
          </Link>
        </div>
      </div>
    </footer>
  );
}
