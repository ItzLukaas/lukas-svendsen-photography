import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { InstagramIcon } from "@/components/icons/Instagram";
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
    <footer className="border-t border-white/8 bg-[#070707]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="font-display text-lg tracking-widest text-white uppercase">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Ung, 16-årig ambitiøs
              <br />
              fotograf og videoproducent.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs tracking-[0.25em] text-white/50 uppercase">Kontakt</p>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>{siteConfig.name}</li>
              <li>
                <ObfuscatedEmail
                  className="inline-flex items-center gap-2 transition-colors duration-500 ease-premium hover:text-white"
                  showIcon
                  icon={<Mail size={14} strokeWidth={1.5} className="text-white/35" />}
                />
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors duration-500 ease-premium hover:text-white"
                >
                  <Phone size={14} strokeWidth={1.5} className="text-white/35" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.5} className="text-white/35" />
                {siteConfig.location}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs tracking-[0.25em] text-white/50 uppercase">Navigation</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors duration-500 ease-premium hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs tracking-[0.25em] text-white/50 uppercase">Ydelser</p>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors duration-500 ease-premium hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/40 transition-all duration-500 ease-premium hover:scale-110 hover:text-white"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="E-mail"
                className="text-white/40 transition-all duration-500 ease-premium hover:scale-110 hover:text-white"
              >
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-12 text-center">
          <p className="font-display text-lg font-light whitespace-nowrap text-white sm:text-2xl md:text-3xl">
            Skal vi skabe noget sammen?
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Alle rettigheder forbeholdes.
          </p>
          <Link
            href="/privatlivspolitik"
            className="text-xs text-white/40 transition-colors duration-500 ease-premium hover:text-white/70"
          >
            Privatlivspolitik
          </Link>
        </div>
      </div>
    </footer>
  );
}
